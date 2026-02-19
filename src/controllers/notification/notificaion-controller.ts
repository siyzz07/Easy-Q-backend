import { Request, Response } from "express";
import { INotificationService } from "../../interface/notificaion-interface/notification-service-interface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";

export class NotificaionController {
  private _NotificationService: INotificationService;

  constructor(notificationService: INotificationService) {
    this._NotificationService = notificationService;
  }
/**
 * 
 *  get notificaion 
 * 
 */
  getNotification = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const result = await this._NotificationService.getNotification(userId);
    if (result) {
      res.status(StatusCodeEnum.OK).json({ success: true, data: result });
    }
  };

/**
 * 
 *  update  notificaion 
 * 
 */
  updateNotification = async (req:Request,res:Response) =>{

         const userId = req.body.userId
         const updateType = req.body.updateType
         const notificationId = req.body.id

         await this._NotificationService.upateNotification(userId,updateType,notificationId)
         res
          .status(StatusCodeEnum.OK)
          .json({message:true})

  }

}
