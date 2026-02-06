import { Request, Response } from "express";
import { IMessageServiceInterface } from "../../interface/message-interface/message-service-interface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

export class MessageController {
  private _messageService: IMessageServiceInterface;

  constructor(messageService: IMessageServiceInterface) {
    this._messageService = messageService;
  }

  getMessages = async (req: Request, res: Response): Promise<void> => {
    const { chatRoomId } = req.params;
    const response = await this._messageService.getMessages(chatRoomId);

    res
      .status(StatusCodeEnum.OK)
      .json({ success: true, message: MessageEnum.MESSAGE_FETCH_SUCCESS, data: response });
  };
}
