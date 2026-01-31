import mongoose from "mongoose";
import { IChatRoomRepositoryInterface } from "../../interface/chatRoom-interface/chatRoom-respsitory-interface";
import { IChatRoomServiceInterface } from "../../interface/chatRoom-interface/chatRoom-Service-Interface";
import { IChatRoom } from "../../types/common-types";
import logger from "../../utils/logger";

export class ChatRoomService implements IChatRoomServiceInterface {
  private _ChatRoomRepository: IChatRoomRepositoryInterface;

  constructor(chatRoomRepository: IChatRoomRepositoryInterface) {
    this._ChatRoomRepository = chatRoomRepository;
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

      let result = await this._ChatRoomRepository.addMemberToChatRoom(
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
      logger.info('new vendor added in chat room')
      return true;
    } else {
      logger.error('error to add new vendor')
      return false;
    }
  }
}
