import mongoose from "mongoose";
import { IChatRoomRepositoryInterface } from "../interface/chatRoom-interface/chatRoom-respsitory-interface";
import chatRoom from "../models/chatRoom";
import { IChatRoom } from "../types/common-types";
import BaseRepository from "./baseRepository";

export class ChatRoomRepository
  extends BaseRepository<IChatRoom>
  implements IChatRoomRepositoryInterface
{
  private _ChatRoomModel = chatRoom;

  constructor() {
    super(chatRoom);
  }
  /**
   *
   *  create new chat room
   *
   */

  async createChatRoom(contractId: string): Promise<IChatRoom> {
    const data = {
      contractId: new mongoose.Types.ObjectId(contractId),
      members: [],
      isActive: Boolean(true),
    };

    return await this.create(data);
  }

  /**
   *
   *  add new member to the chat room
   *
   */
  async addMemberToChatRoom(
    contractId: string,
    memberId: string,
    memberType: "Customer" | "Vendor",
    role: "admin" | "member",
  ): Promise<boolean> {
    const memberData = {
      userId: memberId,
      userType: memberType,
      role,
    };

    const result = await this._ChatRoomModel.findOneAndUpdate(
      { contractId },
      {
        $addToSet: {
          members: memberData,
        },
      },
      { new: true },
    );

    return !!result;
  }

  /**
   *
   *  get chat room data by contract id
   *
   */
   async getChatRoomByContractId(contractId: string): Promise<IChatRoom | void> {
    
    let result =  await this.findOneByCondiition({contractId:contractId})
    if(result){
      return result
    }

  }
}
