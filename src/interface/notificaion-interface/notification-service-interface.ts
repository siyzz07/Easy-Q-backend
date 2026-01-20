import { IBooking, INotification } from "../../types/common-types";


export interface INotificationServiceInterface {

    getNotification(userid:string):Promise<INotification[]>
    sendBookingNotificationToVendor(data:IBooking):Promise<void>
    sendBookingNotificationToCustomer(data:IBooking):Promise<void>
}