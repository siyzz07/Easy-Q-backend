import { IBooking } from "../../types/common-types";



export interface IBookingRopsitoryInterface {
    addNewBooking(data: Partial<IBooking>): Promise<IBooking|void>;
    getBookedDatasByCondition (data:object):Promise<IBooking[]>
    getEachBookingDataById (_id:string):Promise<IBooking|void>
    updateBooking (id:string , data:Partial<IBooking>):Promise<IBooking|void>
}