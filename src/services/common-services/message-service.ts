import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { IMessageRepository } from "../../interface/message-interface/message-repository-interface";
import { IMessageService } from "../../interface/message-interface/message-service-interface";
import { IMessage } from "../../types/common-types";
import { ErrorResponse } from "../../utils/errorResponse";
import logger from "../../utils/logger";
import { MessageResponseDTO } from "../../dto/message-dto/message-dto";

export class MessageService implements IMessageService {
  private _messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this._messageRepository = messageRepository;
  }

  /**
   * 
   *  save message in db 
   * 
   */
  async saveMessage(data: Partial<IMessage>): Promise<MessageResponseDTO> {
      const result = await this._messageRepository.createMessage(data);
  
      if(!result){
        logger.error("Error saving message in service");
        throw new ErrorResponse(MessageEnum.MESSAGE_CREATED_FILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
      }
      return  new MessageResponseDTO(result as unknown as import('../../dto/message-dto/message-dto').IPopulatedMessage)
  }

  async getMessages(chatRoomId: string): Promise<MessageResponseDTO[]> {
      const messages = await this._messageRepository.getMessages(chatRoomId);
      if(!messages){
        logger.error("Error fetching messages in service");
        throw new ErrorResponse(MessageEnum.MESSAGE_FETCH_FILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
      }
      return messages.map(msg => new MessageResponseDTO(msg as unknown as import('../../dto/message-dto/message-dto').IPopulatedMessage));
  }
}
