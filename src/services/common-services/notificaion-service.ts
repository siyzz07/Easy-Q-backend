import mongoose from "mongoose";
import {
  BookingMessageContent,
  BookingMessageContentLong,
  BookingMessageTitle,
  MessageEnum,
} from "../../enums/messagesEnum";
import { INotificationRepositoryInterface } from "../../interface/notificaion-interface/notificaion-repository-interface";
import { INotificationServiceInterface } from "../../interface/notificaion-interface/notification-service-interface";
import { IBooking, INotification } from "../../types/common-types";
import { socketNotificationHandler } from "../../sockets/handlers/notificationHandler";
// import { ISocketManager, SocketManager } from "../../sockets/socketManager";
import { socketManagerServer } from "../../sockets/socketInstance";
import { ErrorResponse } from "../../utils/errorResponse";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";

export class NotificationService implements INotificationServiceInterface {
  private _NotificationRepository: INotificationRepositoryInterface;
  // private _SocketManager :ISocketManager

  constructor(notificationRepository: INotificationRepositoryInterface) {
    this._NotificationRepository = notificationRepository;
    //  this._SocketManager = socketManager;
    
  
  }



  /**
   * 
   *  get notifications
   * 
   */
getNotification = async (userid: string): Promise<INotification[]> => {
    if(!userid){
      throw new ErrorResponse(MessageEnum.SERVER_ERROR,StatusCodeEnum.INTERNAL_SERVER_ERROR)
    }

    
     return this._NotificationRepository.getUserNotification(userid)
}





  /**
   *
   * Booking notificatoin ----  VENDOR
   *
   */

  sendBookingNotificationToVendor = async ( data: IBooking): Promise<void> => {
    const NotificationPayload: Partial<INotification> = {
      recipient: new mongoose.Types.ObjectId(data.shopId),
      recipientType: "Vendor",
      category: "booking",
      type: "new_booking",
      title: BookingMessageTitle.NEW_BOOKING_VENDOR,
      content: BookingMessageContentLong.NEW_BOOKING_VENDOR,
      metaData: {
        booking: {
          id: data._id,
          date: data.bookingDate,
          time: data.bookingTimeStart,
        },
      },
    };

    const SocketPayload = {
      title: BookingMessageTitle.NEW_BOOKING_VENDOR,
      message: `${BookingMessageContent.NEW_BOOKING_VENDOR} - ${data.bookingDate} - ${data.bookingTimeStart}`,
      type:'booking',
      createdAt:new Date()
    };

    const result = await this._NotificationRepository.addNewNotification(NotificationPayload);

     socketNotificationHandler.bookingNotificationToVendor(socketManagerServer.getIo(),data.shopId.toString(),SocketPayload)



    
  };


   /**
   *
   * Booking notificatoin ----  CUSTOMER
   *
   */


   sendBookingNotificationToCustomer = async(data: IBooking): Promise<void> =>{
     
    
     const NotificationPayload: Partial<INotification> = {
      recipient: new mongoose.Types.ObjectId(data.customerId),
      recipientType: "Customer",
      category: "booking",
      type: "booking_completed",
      title: BookingMessageTitle.BOOKING_SUCCESS,
      content:BookingMessageContentLong.BOOKING_CONFIRMED,
      metaData: {
        booking: {
          id: data._id,
          date: data.bookingDate,
          time: data.bookingTimeStart,
        },
      },
    };

    const SocketPayload = {
      title: BookingMessageTitle.BOOKING_SUCCESS,
      message: `${BookingMessageContent.BOOKING_SUCCESS} - ${data.bookingDate} - ${data.bookingTimeStart}`,
      type:'booking',
      createdAt:new Date()
    };
    const result = await this._NotificationRepository.addNewNotification(
      NotificationPayload
    );
    await socketNotificationHandler.bookingNotificationToCustomer(socketManagerServer.getIo(),data.customerId.toString(),SocketPayload)
   }
}
 