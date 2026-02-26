import { IMessage } from "../../types/common-types";
import { MessageResponseDTO } from "../../dto/message-dto/message-dto";

export interface IMessageService {
  saveMessage(data: Partial<IMessage>): Promise<MessageResponseDTO>;
  getMessages(chatRoomId: string): Promise<MessageResponseDTO[]>;
}
