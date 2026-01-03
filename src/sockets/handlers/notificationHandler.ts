

import { Server } from "socket.io";
import logger from "../../utils/logger";

export interface INotificationPayload {
  title: string;
  message?: string;
  type:string
  createdAt: Date;
}


export class socketNotificationHandler {


  /**
   * 
   * booking notifiction  - Vendor
   */
  static bookingNotificationToVendor(io:Server, userId:string, payload:INotificationPayload) {
    logger.info('notification sended to vendor')
    io.to(userId).emit("notification-booking:new", payload);
  }

   /**
   * 
   * booking notifiction  - customer
   */
  static bookingNotificationToCustomer(io:Server,userId:string,payload:INotificationPayload){
    logger.info('notification sended to customer')
    console.log(userId)
    io.to(userId).emit('notification-booking:success',payload)
  }


}