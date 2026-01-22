

import { Server } from "socket.io";
import logger from "../../utils/logger";
import { INotification } from "../../types/common-types";

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
  static bookingNotificationToVendor(io:Server, userId:string, payload:Partial<INotification>) {
    logger.info('notification sended to vendor')
    io.to(userId).emit("notification-booking:new", payload);
  }

   /**
   * 
   * booking notifiction  - customer
   */
  static bookingNotificationToCustomer(io:Server,userId:string,payload:Partial<INotification>){
    logger.info('notification sendedm to customer')
    console.log(userId)
    io.to(userId).emit('notification-booking:success',payload)
  }


}