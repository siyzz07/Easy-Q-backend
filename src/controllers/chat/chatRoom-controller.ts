import { Request, Response } from "express";
import { IChatRoomService } from "../../interface/chatRoom-interface/chatRoom-Service-Interface";
import { MessageEnum } from "../../enums/messagesEnum";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";


export class ChatRoomController {
    private _ChatRoomService :IChatRoomService

    constructor (chatRoomService :IChatRoomService) {
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


        const response = await this._ChatRoomService.startVedioCall(roomId,contractId,caller)
        res
            .status(StatusCodeEnum.OK)
            .json({success:true , roomId:response})

    }
    /**
     * 
     *    vedio call token
     * 
     */
    getZegocloudToken = async (req:Request,res:Response) :Promise<void> =>{
                      
        console.log('reachen din to creaet token');
        
        const userId = req.query.userId
        const roomId = req.query.roomId

        const result = await this._ChatRoomService.zegoToken(roomId as string,userId as string)
      console.log('result :>> ', result);
        res
            .status(StatusCodeEnum.OK)
            .json({success:true ,data:result})

    }

      /**
     * 
     *    leave from vedio call
     * 
     */
    leaveVedioCall = async (req:Request,res:Response):Promise<void> =>{

         await this._ChatRoomService.leaveVedioCall(req.body.roomId , req.body.leaveUser)
        res
            .status(StatusCodeEnum.OK)
            .json({succcess:true})
    }
}