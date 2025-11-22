import { IBooking } from "../../types/common-types";



export interface IBookingRopsitoryInterface {
    addNewBooking(data: Partial<IBooking>): Promise<IBooking|void>;
}