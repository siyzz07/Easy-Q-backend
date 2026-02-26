import { IBaseRepository } from "../common-interface/base-resposiotry-interface";
import { IMessage } from "../../types/common-types";
import { IPopulatedMessage } from "../../dto/message-dto/message-dto";

export interface IMessageRepository extends IBaseRepository<IMessage> {
  createMessage(data: Partial<IMessage>): Promise<IPopulatedMessage>;
  getMessages(chatRoomId: string): Promise<IMessage[]>;
}
