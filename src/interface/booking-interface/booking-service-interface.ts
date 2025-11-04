import { IBooking } from "../../types/common-types";


export interface IBookingServiceInterface{

    addNewbooking(data:IBooking):Promise<IBooking|void>

}