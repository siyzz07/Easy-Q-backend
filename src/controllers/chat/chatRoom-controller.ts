import { Request, Response } from "express";
import { IChatRoomServiceInterface } from "../../interface/chatRoom-interface/chatRoom-Service-Interface";
import { MessageEnum } from "../../enums/messagesEnum";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";


export class ChatRoomController {
    private _ChatRoomService :IChatRoomServiceInterface

    constructor (chatRoomService :IChatRoomServiceInterface) {
        this._ChatRoomService = chatRoomService
    }


    /**
     * 
     * get chat room data
     * 
     */
    chatRoomData = async(req:Request,res:Response) :Promise<void> =>{

        const contractId = req.params.contractId
        const response = await this._ChatRoomService.getChatRoomData(contractId)
            
        res 
            .status(StatusCodeEnum.OK)
            .json({success:true , message:MessageEnum.CHAT_ROOM_FETCH_SUCCESS, data:response})

    }
}