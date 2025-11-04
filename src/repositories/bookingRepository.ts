
import { IBookingRopsitoryInterface } from "../interface/booking-interface/booking-repository-interface";
import { IBaseRepositoryInterface } from "../interface/common-interface/base-resposiotry-interface";
import { BookingModel } from "../models/bookingModel";
import { IBooking } from "../types/common-types";
import BaseRepository from "./baseRepository";



export class BookingRepository extends BaseRepository<any> implements IBookingRopsitoryInterface{

    private _BookingModal = BookingModel

    constructor(){
        super(BookingModel)
    }


//----------------------------------- add new booking
   async addNewBooking(data: IBooking): Promise<IBooking|void> {

        let result = await this.create(data)
        return result
    

    }

}