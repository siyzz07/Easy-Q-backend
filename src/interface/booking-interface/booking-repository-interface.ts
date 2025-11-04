import { IBooking } from "../../types/common-types";



export interface IBookingRopsitoryInterface{

    addNewBooking(data:IBooking):Promise<IBooking|void>

}