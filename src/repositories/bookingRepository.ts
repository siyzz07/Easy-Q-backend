
import { FilterQuery, PopulateOption, PopulateOptions } from "mongoose";
import { IBookingRopsitoryInterface } from "../interface/booking-interface/booking-repository-interface";
import { IBaseRepositoryInterface } from "../interface/common-interface/base-resposiotry-interface";
import { BookingModel } from "../models/bookingModel";
import { IBooking, IBookingPopulated, IPaginationResponseMeta } from "../types/common-types";
import BaseRepository from "./baseRepository";
import { log } from "console";
import { ErrorReply } from "redis";
import { ErrorResponse } from "../utils/errorResponse";
import { MessageEnum } from "../enums/messagesEnum";
import { StatusCodeEnum } from "../enums/httpStatusCodeEnum";



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
  async getEachBookingDataById(_id: string): Promise<IBookingPopulated> {
      const result = await this._BookingModal.findById(_id).populate('customerId').populate('shopId').populate('serviceId').populate('customerAddressId').populate('staffId').lean<IBookingPopulated>();
      if(!result){
        throw new ErrorResponse(MessageEnum.BOOKING_DATA_FETCH_FAILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
      }
      return result
  }
//----------------------------------- update booking
  async updateBooking(id: string, data: Partial<IBooking>): Promise<IBooking|void> {
      const result = await this.update(id,data)
      return result
  }



  //----------------------------------- get populated data
  async bookingDatas (data:string, query:{page?:string,limit?:string,search?:string}) :Promise<{data:IBookingPopulated[] ,pagination:IPaginationResponseMeta}>{

        let  filter:FilterQuery<IBooking>={
            customerId:data
        }
           
        if(query.search!=='all'){
            filter.status=query.search
        }

        const options = {
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 7,
            sort: { createdAt: -1 as const },
        };
        
        const populate: PopulateOptions[] = [
                    { path: "customerId" },
                    { path: "shopId" },
                    { path: "serviceId" },
                    { path: "customerAddressId" },
                    { path: "staffId" },
                ];

      
       let result = await  this.filterWithPagination(options,filter,populate)
       return result
       
      

  }
}