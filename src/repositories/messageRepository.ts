import mongoose from "mongoose";
import { IMessageRepository } from "../interface/message-interface/message-repository-interface";
import MessageModel from "../models/messageModel";
import { IMessage } from "../types/common-types";
import BaseRepository from "./baseRepository";

export class MessageRepository
  extends BaseRepository<IMessage>
  implements IMessageRepository
{

  private _MessageModel = MessageModel
  constructor() {
    super(MessageModel);
  }

    async createMessage(data: Partial<IMessage>): Promise<any> {
      const result = await this.create(data as IMessage)
      const message = await this._MessageModel.findById(result._id).populate('sender')   
      return message 
    } 

  async getMessages(chatRoomId: string): Promise<IMessage[]> {
    const data = await this._MessageModel.find({ chatRoomId:new mongoose.Types.ObjectId(chatRoomId) }).populate('sender')
    return data
  }
}
