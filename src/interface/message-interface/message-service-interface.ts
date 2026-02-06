import { IMessage } from "../../types/common-types";

export interface IMessageServiceInterface {
  saveMessage(data: Partial<IMessage>): Promise<IMessage>;
  getMessages(chatRoomId: string): Promise<any[]>;
}
