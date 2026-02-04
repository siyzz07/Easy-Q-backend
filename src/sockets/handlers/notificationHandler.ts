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
       console.log('vdio call notificaion');
       
      io.to(value.userId).emit('incomming-vedio-call',payload)
    })

  }

   // User joins call page
  // static joinCall(
  //   io: Server,
  //   socket: any,
  //   roomId: string,
  //   userId: string
  // ) {
  //   if (!activeCalls[roomId]) {
  //     activeCalls[roomId] = new Set();
  //   }

  //   activeCalls[roomId].add(userId);
  //   socket.join(roomId);

  //   console.log("User joined call:", roomId, userId);
  // }

  // // User leaves call page
  // static leaveCall(
  //   io: Server,
  //   roomId: string,
  //   userId: string
  // ) {
  //   if (!activeCalls[roomId]) return;

  //   activeCalls[roomId].delete(userId);

  //   console.log("User left call:", roomId, userId);

  //   // If nobody left → END CALL
  //   if (activeCalls[roomId].size === 0) {
  //     delete activeCalls[roomId];
  //     io.to(roomId).emit("call-ended");
  //     console.log("Call ended:", roomId);
  //   }
  // }

}
