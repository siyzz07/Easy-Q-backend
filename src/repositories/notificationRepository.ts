import { INotificationRepositoryInterface } from "../interface/notificaion-interface/notificaion-repository-interface";
import notificationModel from "../models/notificationModel";
import { INotification } from "../types/common-types";
import BaseRepository from "./baseRepository";




export class NotificationRepository extends BaseRepository<any>  implements INotificationRepositoryInterface{

  private _NotificationModel = notificationModel

  constructor(){
    super(notificationModel)
  }

   async addNewNotification(data: Partial<INotification>): Promise<boolean> {
      const result = await this.create(data)
      return !!result

  }




}