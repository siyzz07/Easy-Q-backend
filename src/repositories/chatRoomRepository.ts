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
    const filter = mongoose.isValidObjectId(contractId) 
      ? { contractId: new mongoose.Types.ObjectId(contractId) }
      : { contractId }; 
    const result = await this._ChatRoomModel.findOne(filter)
      .populate('members.userId')
      .exec();
    
    if (result) {
      return result;
    }
  }

   /**
   *
   *  get chat room data by id
   *
   */
   async getChatRoomById(id: string): Promise<any> {
    
    const result = await this._ChatRoomModel.findById(id).populate('members.userId')
    return result
  }

   /**
   *
   *  remove member from chat room
   *
   */
async removeMember(contractId: string, memberId: string): Promise<boolean> {

  const result = await this._ChatRoomModel.findOneAndUpdate(
    { contractId },
    { $pull: { members: { userId: memberId } } }
  );

  return !!result;
}
}
