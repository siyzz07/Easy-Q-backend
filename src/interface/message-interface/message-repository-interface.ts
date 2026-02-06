import { IBaseRepositoryInterface } from "../common-interface/base-resposiotry-interface";
import { IMessage } from "../../types/common-types";

export interface IMessageRepository extends IBaseRepositoryInterface<IMessage> {
  createMessage(data: Partial<IMessage>): Promise<any>;
  getMessages(chatRoomId: string): Promise<IMessage[]>;
}
