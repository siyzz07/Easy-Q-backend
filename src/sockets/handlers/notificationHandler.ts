import { Server } from "socket.io";
import logger from "../../utils/logger";
import { INotification } from "../../types/common-types";
import { log } from "winston";

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
  static contractNotification(
    io: Server,
    userId: string,
    payload: Partial<INotification>,
  ) {
    logger.info("contract notification sended to customer");
    io.to(userId).emit("contract-notification", payload);
  }

  /**
   *
   * contract notifiction  - vendor
   */
  static contractNotificationTo(
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

    console.log('data0-0-0- :>> ', data);

    data.forEach((value:IVedioCallNotify)=>{
       console.log(`Sending video call notification to: ${value.userId}`);
       io.to(value.userId).emit('incomming-vedio-call',payload)
    })

  }


}
