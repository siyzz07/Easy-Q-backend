import mongoose from "mongoose";
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

    console.log('contractId :>> ', contractId);
    console.log('customerId :>> ', customerId);
    const roomData = await this._ChatRoomRepository.createChatRoom(contractId);
  console.log('1');
  
  if (roomData) {
    logger.info("chat room created");
    
    console.log('2');
    let result = await this._ChatRoomRepository.addMemberToChatRoom(
      contractId.toString(),
      customerId,
      "Customer",
      "admin",
    );
    console.log('3');
    
    if (result) {
      logger.info("Member addedd in chat room");
      return true;
    } else {
      logger.error("error to add member in contract room");
    }
    console.log('4');
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

    const notifyUsers: IVedioCallNotify[] = chatRoomData.members.filter(
      (member) => member.userId.toString() !== caller,
    ).map((value) =>({
      userId:value.userId.toString(),
      userType :value.userType
    }))

    await socketNotificationHandler.vedioCallNotify(
      socketManagerServer.getIo(),
      notifyUsers,
      payload,
    );

    console.log('roomId :>> ', roomId);

    return roomId;
  }
}
