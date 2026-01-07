import { IBooking, IBookingPopulated, IPaginationResponseMeta } from "../../types/common-types";



export interface IBookingRopsitoryInterface {
    addNewBooking(data: Partial<IBooking>): Promise<IBooking|void>;
    getBookedDatasByCondition (data:object):Promise<IBooking[]>
    getEachBookingDataById (_id:string):Promise<IBookingPopulated|void>
    updateBooking (id:string , data:Partial<IBooking>):Promise<IBooking|void>
    bookingDatas (data:string ,query:{page?:string,limit?:string,search?:string}) :Promise<{data:IBookingPopulated[],pagination:IPaginationResponseMeta}>
}