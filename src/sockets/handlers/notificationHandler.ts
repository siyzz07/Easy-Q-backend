

import { Server } from "socket.io";

export interface INotificationPayload {
  title: string;
  message?: string;
  type:string
  createdAt: Date;
}


export class socketNotificationHandler {
  static bookingNotificationToVendor(io:Server, userId:string, payload:INotificationPayload) {
    console.log('notification reached');
    io.to(userId).emit("notification:new", payload);
  }
}