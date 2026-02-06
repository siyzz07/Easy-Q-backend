import { IBooking, INotification } from "../../types/common-types";


export interface INotificationServiceInterface {

    getNotification(userid:string):Promise<INotification[]>
    upateNotification (userId:string,updateType:string , id?:string):Promise<void>
    sendBookingNotificationToVendor(vendorId:string ,category:'booking'|'contract'|'message',type: "booking_rescheduled" | "booking_cancelled" | "new_booking" ,title:string,content:string,bookingId:string,date:string,time:string):Promise<void>
    sendBookingNotificationToCustomer(customerId:string ,category:'booking'|'contract'|'message',type: "booking_rescheduled" | "booking_cancelled" | "booking_completed" ,title:string,content:string,bookingId:string,date:string,time:string ):Promise<void>
    sendContractNotificationToCustomer(customerId:string ,category:'booking'|'contract'|'message',type: "contract_applied" | "contract_approved" | "contract_rejected"|"contract_cancelled" ,title:string,content:string,contractId:string ):Promise<void>
    sendContractNotificationToVendor(vendorId:string ,category:'booking'|'contract'|'message',type: "contract_applied" | "contract_approved" | "contract_rejected"|"contract_cancelled" ,title:string,content:string,contractId:string ):Promise<void>
}



