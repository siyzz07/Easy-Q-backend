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

    /**
     * 
     *   starat vedio call
     * 
     */
    startVedioCall = async (req:Request,res:Response) =>{
        const roomId = req.body.chatRoomId
        const contractId = req.body.contractId
        const caller = req.body.caller

        console.log('req.body :>> ', req.body);

        const response = await this._ChatRoomService.startVedioCall(roomId,contractId,caller)

        console.log('response :>> ', response);
        res
            .status(StatusCodeEnum.OK)
            .json({success:true , roomId:response})

    }
}