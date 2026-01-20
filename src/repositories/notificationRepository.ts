import { INotificationRepositoryInterface } from "../interface/notificaion-interface/notificaion-repository-interface";
import notificationModel from "../models/notificationModel";
import { INotification } from "../types/common-types";
import BaseRepository from "./baseRepository";




export class NotificationRepository extends BaseRepository<INotification>  implements INotificationRepositoryInterface{

  private _NotificationModel = notificationModel

  constructor(){
    super(notificationModel)
  }

  /**
   * 
   * get notification of the user
   * 
   */
   async getUserNotification(userId: string): Promise<INotification[]> {
       return  await this.findManyByCondition({recipient:userId})

  }


   async addNewNotification(data: Partial<INotification>): Promise<boolean> {
      const result = await this.create(data as INotification)
      return !!result

  }




}