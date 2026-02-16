
import { IChatRoomRepositoryInterface } from "../../interface/chatRoom-interface/chatRoom-respsitory-interface";
import { IChatRoomServiceInterface } from "../../interface/chatRoom-interface/chatRoom-Service-Interface";
import { IChatRoom } from "../../types/common-types";
import logger from "../../utils/logger";
import { ErrorResponse } from "../../utils/errorResponse";
import { MessageEnum } from "../../enums/messagesEnum";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import {
  IVedioCallNotify,
  socketNotificationHandler,
} from "../../sockets/handlers/notificationHandler";
import { socketManagerServer } from "../../sockets/socketInstance";
import { IContractServiceInterface } from "../../interface/contract-interface/contract-service-interface";
import { generateToken04 } from "../../utils/zegoServerAssistant";
import { leaveVedioCallNotify, getActiveCallUsers } from "../../sockets/handlers/chatHandlers";

export class ChatRoomService implements IChatRoomServiceInterface {
  private _ChatRoomRepository: IChatRoomRepositoryInterface;
  private _ContractService: IContractServiceInterface;

  constructor(
    chatRoomRepository: IChatRoomRepositoryInterface,
    contractService: IContractServiceInterface,
  ) {
    this._ChatRoomRepository = chatRoomRepository;
    this._ContractService = contractService;
  }

  /**
   *
   *  create chatr room at first time when customer create the contract
   *
   */
  createChatRoom = async (
    contractId: string,
    customerId: string,
  ): Promise<boolean | void> => {

    const roomData = await this._ChatRoomRepository.createChatRoom(contractId);

    if (roomData) {
      logger.info("chat room created");
      const result = await this._ChatRoomRepository.addMemberToChatRoom(
        contractId.toString(),
        customerId,
        "Customer",
        "admin",
      );

      if (result) {
        logger.info("Member addedd in chat room");
        return true;
      } else {
        logger.error("error to add member in contract room");
      }
    } else {
      logger.error("error to create chat room");
    }
  };

  /**
   *
   *  add new vendor into the contract room
   *
   */
  async addMemberToChatRoom(
    contractId: string,
    memberId: string,
    memberType: "Customer" | "Vendor",
    role: "admin" | "member",
  ): Promise<boolean> {
    const result = await this._ChatRoomRepository.addMemberToChatRoom(
      contractId,
      memberId,
      "Vendor",
      "member",
    );
    if (result) {
      logger.info("new vendor added in chat room");
      return true;
    } else {
      logger.error("error to add new vendor");
      return false;
    }
  }

  /**
   *
   *  get chat room data by contract id
   *
   */
  getChatRoomData = async (contractId: string): Promise<IChatRoom | void> => {
    if (!contractId) {
      logger.error("error to get chat Room data , contractId null");
      throw new ErrorResponse(
        MessageEnum.CHAT_ROOM_FETCH_FAILED,
        StatusCodeEnum.BAD_REQUEST,
      );
    }

    const response =
      await this._ChatRoomRepository.getChatRoomByContractId(contractId);

    if (response) {
      logger.info("chat room get successfuly");
      return response;
    } else {
      throw new ErrorResponse(
        MessageEnum.CHAT_ROOM_NOT_FOUND,
        StatusCodeEnum.INTERNAL_SERVER_ERROR,
      );
    }
  };

  /**
   *
   *  create  a new vedio call
   *
   */
  async startVedioCall(
    roomId: string,
    contractId: string,
    caller: string,
  ): Promise<string> {
    const chatRoomData =
      await this._ChatRoomRepository.getChatRoomByContractId(contractId);

    if (!chatRoomData) {
      throw new Error("Chat room not found");
    }

    const contractData = await this._ContractService.getContract(contractId);

    if (!contractData) {
      throw new Error("Contract not found");
    }

    const payload = {
      contractName: contractData.contractName,
      roomId: roomId,
    };

    const activeUsers = getActiveCallUsers(roomId);
    const callerIdStr = String(caller);
    
    console.log('--- startVedioCall: Detailed Notification Audit ---');
    console.log('Contract ID:', contractId);
    console.log('Room ID (ChatRoom):', roomId);
    console.log('Caller ID:', callerIdStr);
    console.log('Total Members Found in DB:', chatRoomData.members.length);
    
    // Log member types for debugging
    const memberSummary = chatRoomData.members.map(m => ({
        type: m.userType,
        id: String((m.userId as any)?._id || m.userId)
    }));
    console.log('Members Summary:', JSON.stringify(memberSummary));
    
    const stats = { vendor: 0, customer: 0 };
    chatRoomData.members.forEach(m => {
        if (m.userType === 'Vendor') stats.vendor++;
        else if (m.userType === 'Customer') stats.customer++;
    });
    console.log(`Member Counts -> Vendors: ${stats.vendor}, Customers: ${stats.customer}`);

    const notifyUsers: IVedioCallNotify[] = chatRoomData.members
      .filter((member) => {
        // Robust ID extraction for populated user objects
        const mUserId = (member.userId as any)?._id || member.userId;
        if (!mUserId) {
            console.log(`WARNING: Member has no userId! Type: ${member.userType}`);
            return false;
        }
        
        const memberId = String(mUserId);
        const isActive = activeUsers?.has(memberId);
        const isCaller = memberId === callerIdStr;
        
        console.log(`[AUDIT] Member: ${memberId} | Type: ${member.userType} | isCaller: ${isCaller} | isActive: ${isActive}`);

        if (isCaller) return false;
        
        // Skip users already in the Zego meeting
        if (isActive) {
            console.log(`[AUDIT] --> Skipping already active participant: ${memberId}`);
            return false;
        }
        
        console.log(`[AUDIT] --> ACCEPTED for notification: ${memberId}`);
        return true;
      })
      .map((value) => {
        const id = String((value.userId as any)?._id || value.userId);
        return {
            userId: id,
            userType: value.userType,
        };
      });

    console.log(`Total notifications to be sent: ${notifyUsers.length}`);
    console.log('Notification Target IDs:', notifyUsers.map(u => u.userId));

    await socketNotificationHandler.vedioCallNotify(
      socketManagerServer.getIo(),
      notifyUsers,
      payload,
    );

    return roomId;
  }

  /**
   *
   *  get zegocloud token
   *
   */
  zegoToken = async (roomId: string, userId: string): Promise<{ token: string; appId: number; userName: string }> => {

  let name = "";

  const roomData = await this._ChatRoomRepository.getChatRoomById(roomId);

  if (!roomData) {
    throw new ErrorResponse(
      MessageEnum.CHAT_ROOM_NOT_FOUND,
      StatusCodeEnum.INTERNAL_SERVER_ERROR
    );
  }

  const userMember = roomData.members.find(
    (value: any) => value.userId._id.toString() === userId
  );

  if (!userMember) {
    throw new Error("User not in this room");
  }

  if (userMember.userType === "Vendor") {
    name = userMember.userId.shopName;
  } else {
    name = userMember.userId.name;
  }

  const appId = Number(process.env.ZEGOCLOUD_APP_ID);
  const serverSecret = process.env.ZEGOCLOUD_SERVER_SECRET as string;
  const effectiveTime = 3600; 
 

  
  const token = generateToken04(
    appId,
    userId,
    serverSecret,
    effectiveTime,
    roomId
  );

  return { token, appId, userName: name };
};

 /**
   *
   *  remove form vedio room
   *
   */
  leaveVedioCall = async(roomId: string, userId: string): Promise<boolean | void> => {

    const roomData = await this._ChatRoomRepository.getChatRoomById(roomId)

    
    const notifyUsers: [{userId:string}] = roomData.members

      .filter((member:any) => member.userId._id.toString() !== userId)
      .map((value:any) => ({
        userId: value.userId._id.toString(),

      }));
      

      leaveVedioCallNotify(socketManagerServer.getIo(),{roomId,userId},notifyUsers)

  }

    /**
   *
   *  Remove from chat room
   *
   */
  removeMember = async (contractId: string, memberId: string): Promise<boolean> =>{

      const reuslt = await this._ChatRoomRepository.removeMember(contractId,memberId)
      return reuslt

  }
};
