import mongoose from "mongoose";
import {
  BookingMessageContent,
  BookingMessageContentLong,
  BookingMessageTitle,
} from "../../enums/messagesEnum";
import { INotificationRepositoryInterface } from "../../interface/notificaion-interface/notificaion-repository-interface";
import { INotificationServiceInterface } from "../../interface/notificaion-interface/notification-service-interface";
import { IBooking, INotification } from "../../types/common-types";
import { socketNotificationHandler } from "../../sockets/handlers/notificationHandler";
import { ISocketManager, SocketManager } from "../../sockets/socketManager";
import { socketManagerServer } from "../../sockets/socketInstance";

export class NotificationService implements INotificationServiceInterface {
  private _NotificationRepository: INotificationRepositoryInterface;
  private _SocketManager :ISocketManager

  constructor(notificationRepository: INotificationRepositoryInterface,socketManager:ISocketManager) {
    this._NotificationRepository = notificationRepository;
     this._SocketManager = socketManager;
    
  
  }

  /**
   *
   * Booking notificatoin
   *
   */

  sendBookingNotificationToVendor = async ( data: IBooking): Promise<void> => {
    console.log(data);

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

    let result = await this._NotificationRepository.addNewNotification(
      NotificationPayload
    );

    await socketNotificationHandler.bookingNotificationToVendor(socketManagerServer.getIo(),data.shopId.toString(),SocketPayload)



    
  };

  //  sendBookingNotificationToCustomer(data: IBooking): Promise<void> {

  //  }
}
