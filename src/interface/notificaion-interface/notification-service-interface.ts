import { IBooking } from "../../types/common-types";


export interface INotificationServiceInterface {
    sendBookingNotificationToVendor(data:IBooking):Promise<void>
    // sendBookingNotificationToCustomer(data:IBooking):Promise<void>
}