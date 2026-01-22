import mongoose from "mongoose";
import { INotificationRepositoryInterface } from "../interface/notificaion-interface/notificaion-repository-interface";
import notificationModel from "../models/notificationModel";
import { INotification } from "../types/common-types";
import BaseRepository from "./baseRepository";

export class NotificationRepository
  extends BaseRepository<INotification>
  implements INotificationRepositoryInterface
{
  private _NotificationModel = notificationModel;

  constructor() {
    super(notificationModel);
  }

  /**
   *
   * get notification of the user
   *
   */
  async getUserNotification(userId: string): Promise<INotification[]> {
    return await this.findManyByCondition({ recipient: userId });
  }

  /**
   *
   *  add new notification
   *
   */

  async addNewNotification(data: Partial<INotification>): Promise<boolean> {
    const result = await this.create(data as INotification);
    return !!result;
  }

  /**
   *
   * update notification
   *
   */
  async updateNotification(
    userid: string,
    notificaionId?: string
  ): Promise<boolean> {
    type PayloadType = {
      recipient: mongoose.Types.ObjectId;
      _id?: mongoose.Types.ObjectId;
    };

    let payload: PayloadType = {
      recipient: new mongoose.Types.ObjectId(userid),
    };

    if (notificaionId) {
      payload._id = new mongoose.Types.ObjectId(notificaionId);
    }

    const result = await this._NotificationModel.updateMany(payload, {
      $set: { isRead: true },
    });

    return result.modifiedCount > 0;
  }
}
