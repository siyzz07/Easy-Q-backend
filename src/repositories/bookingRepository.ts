
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

        const result = await this.create(data)
        return result
    

    }

//----------------------------------- get booked data based on condition
 async getBookedDatasByCondition(data: object): Promise<IBooking[]> {

    const result = await this.findManyByCondition(data)
    return result

}
//----------------------------------- get each booking data by id
  async getEachBookingDataById(_id: string): Promise<IBooking | void> {
      const result = await this.findById(_id)
      return result
  }
//----------------------------------- update booking
  async updateBooking(id: string, data: Partial<IBooking>): Promise<IBooking|void> {
      const result = await this.update(id,data)
      return result
  }


  //----------------------------------- get populated data
  async bookingDatas (data:object ) :Promise<IBooking[]>{

        const result = await this._BookingModal.find(data).populate('customerId').populate('shopId').populate('serviceId').populate('customerAddressId').populate('staffId')
        return result

  }
}