import { IMessage } from "../../types/common-types";

export interface IMessageService {
  saveMessage(data: Partial<IMessage>): Promise<IMessage>;
  getMessages(chatRoomId: string): Promise<any[]>;
}
