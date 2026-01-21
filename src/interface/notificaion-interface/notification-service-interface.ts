import { IBooking, INotification } from "../../types/common-types";


export interface INotificationServiceInterface {

    getNotification(userid:string):Promise<INotification[]>
    upateNotification (userId:string,updateType:string , id?:string):Promise<void>
    sendBookingNotificationToVendor(data:IBooking):Promise<void>
    sendBookingNotificationToCustomer(data:IBooking):Promise<void>
}