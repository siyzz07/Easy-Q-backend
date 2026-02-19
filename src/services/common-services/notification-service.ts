import mongoose from "mongoose";
import {
  MessageEnum,
} from "../../enums/messagesEnum";
import { INotificationRepository } from "../../interface/notificaion-interface/notificaion-repository-interface";
import { INotificationService } from "../../interface/notificaion-interface/notification-service-interface";
import { INotification } from "../../types/common-types";
import { socketNotificationHandler } from "../../sockets/handlers/notificationHandler";
import { socketManagerServer } from "../../sockets/socketInstance";
import { ErrorResponse } from "../../utils/errorResponse";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";

export class NotificationService implements INotificationService {
  private _NotificationRepository: INotificationRepository;

  constructor(notificationRepository: INotificationRepository) {
    this._NotificationRepository = notificationRepository;
  }

  /**
   *
   *  get notifications
   *
   */
  getNotification = async (userid: string): Promise<INotification[]> => {
    if (!userid) {
      throw new ErrorResponse(
        MessageEnum.SERVER_ERROR,
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }

    return this._NotificationRepository.getUserNotification(userid);
  };

  /**
   *
   *  update notifications
   *
   */

  upateNotification = async (userId: string, updateType: string, id?: string): Promise<void>  =>{

      if(updateType == 'one'){
         await this._NotificationRepository.updateNotification(userId,id)
      }else{
        await this._NotificationRepository.updateNotification(userId)
      }
  }

  /**
   *
   * Booking notificatoin ----  VENDOR
   *
   */


//------------------ new booking notification
  sendBookingNotificationToVendor = async (vendorId:string ,category:'booking'|'contract'|'message',type: "booking_rescheduled" | "booking_cancelled" | "new_booking" ,title:string,content:string,bookingId:string,date:string,time:string): Promise<void> => {
  
    const NotificationPayload: Partial<INotification> = {
      recipient: new mongoose.Types.ObjectId(vendorId),
      recipientType: "Vendor",
      category,
      type,
      title,
      content,
      createdAt:new Date(),
      metaData: {
        booking: {
          id: bookingId,
          date: date,
          time: time,
        },
      },
    };

     await this._NotificationRepository.addNewNotification(
      NotificationPayload
    );

    socketNotificationHandler.bookingNotificationToVendor(
      socketManagerServer.getIo(),
      vendorId.toString(),
      NotificationPayload
    );
  };

  /**
   *
   * Booking notificatoin ----  CUSTOMER
   *
   */
  // ----------------- booking confirm notification 
  sendBookingNotificationToCustomer = async (customerId:string ,category:'booking'|'contract'|'message',type: "booking_rescheduled" | "booking_cancelled" | "booking_completed" ,title:string,content:string,bookingId:string,date:string,time:string ): Promise<void> => {
   
    const NotificationPayload: Partial<INotification> = {
      recipient: new mongoose.Types.ObjectId(customerId),
      recipientType: 'Customer',
      category,
      type: type,
      title:title,
      // content:`${ BookingMessageContentLong.BOOKING_CONFIRMED}-${data.bookingDate} - ${data.bookingTimeStart}`,
      content:content,
      createdAt:new Date(),
      metaData: {
        booking: {
          id: bookingId,
          date: date,
          time: time,
        },
      },
    };

     await this._NotificationRepository.addNewNotification(
      NotificationPayload
    );
    await socketNotificationHandler.bookingNotificationToCustomer(
      socketManagerServer.getIo(),
      customerId.toString(),
      NotificationPayload
    );
  };


/**
 * 
 * 
 *  contract notification --- to CUSTOMER
 * 
 */
//--------------------- send contract notification to customer
sendContractNotificationToCustomer = async (customerId: string, category: "booking" | "contract" | "message", type: "contract_applied" | "contract_approved" | "contract_rejected" | "contract_cancelled", title: string, content: string,contractId:string): Promise<void> =>{
  
   
    const NotificationPayload: Partial<INotification> = {
      recipient: new mongoose.Types.ObjectId(customerId),
      recipientType: 'Customer',
      category,
      type: type,
      title:title,
      content:content,
      createdAt:new Date(),
      metaData: {
        contract: {
          id: contractId,
        },
      },
    };

    await this._NotificationRepository.addNewNotification(
      NotificationPayload
    );
    await socketNotificationHandler.contractNotification(
      socketManagerServer.getIo(),
      customerId.toString(),
      NotificationPayload
    );
}

//--------------------- send contract notification to vendor
sendContractNotificationToVendor = async(vendorId: string, category: "booking" | "contract" | "message", type: "contract_applied" | "contract_approved" | "contract_rejected" | "contract_cancelled", title: string, content: string, contractId: string): Promise<void> =>{
   const NotificationPayload: Partial<INotification> = {
      recipient: new mongoose.Types.ObjectId(vendorId),
      recipientType: 'Vendor',
      category,
      type: type,
      title:title,
      content:content,
      createdAt:new Date(),
      metaData: {
        contract: {
          id: contractId,
        },
      },
    };

    await this._NotificationRepository.addNewNotification(
      NotificationPayload
    );

     await socketNotificationHandler.contractNotification(
      socketManagerServer.getIo(),
      vendorId.toString(),
      NotificationPayload
    );
}




}
