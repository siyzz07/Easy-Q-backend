import { Server } from "socket.io";
import logger from "../../utils/logger";
import { INotification } from "../../types/common-types";

export interface INotificationPayload {
  title: string;
  message?: string;
  type: string;
  createdAt: Date;
}



export interface IVedioCallNotify{
  userId:string;
  userType:string;
}

export class socketNotificationHandler {
  /**
   *
   * booking notifiction  - Vendor
   */
  static bookingNotificationToVendor(
    io: Server,
    userId: string,
    payload: Partial<INotification>,
  ) {
    logger.info("notification sended to vendor");
    io.to(userId).emit("notification-booking:new", payload);
  }

  /**
   *
   * booking notifiction  - customer
   */
  static bookingNotificationToCustomer(
    io: Server,
    userId: string,
    payload: Partial<INotification>,
  ) {
    logger.info("notification sended to customer");
    io.to(userId).emit("notification-booking:success", payload);
  }

  /**
   *
   * contract notifiction  - customer
   */
  static contractNotificationToCustomer(
    io: Server,
    userId: string,
    payload: Partial<INotification>,
  ) {
    logger.info("contract notification sended to customer");
    io.to(userId).emit("contract-notification", payload);
  }


   /**
   *
   * vedio call notify to the users
   */

  static vedioCallNotify (
    io:Server,
    data:IVedioCallNotify[],
    payload:{contractName:string,roomId:string}
  ){
    data.forEach((value:IVedioCallNotify)=>{
      io.to(value.userId).emit('incomming-vedio-call',payload)
    })

  }
}
