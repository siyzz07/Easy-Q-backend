import { FilterQuery, PopulateOption, PopulateOptions } from "mongoose";
import { IBookingRopsitoryInterface } from "../interface/booking-interface/booking-repository-interface";
import { IBaseRepositoryInterface } from "../interface/common-interface/base-resposiotry-interface";
import { BookingModel } from "../models/bookingModel";
import {
  IBooking,
  IBookingPopulated,
  IPaginationResponseMeta,
} from "../types/common-types";
import BaseRepository from "./baseRepository";
import { log } from "console";
import { ErrorReply } from "redis";
import { ErrorResponse } from "../utils/errorResponse";
import { MessageEnum } from "../enums/messagesEnum";
import { StatusCodeEnum } from "../enums/httpStatusCodeEnum";
import mongoose from "mongoose";
import logger from "../utils/logger";

export class BookingRepository
  extends BaseRepository<IBooking>
  implements IBookingRopsitoryInterface
{
  private _BookingModal = BookingModel;

  constructor() {
    super(BookingModel);
  }

  //----------------------------------- add new booking
  async addNewBooking(data: Partial<IBooking>): Promise<IBooking | void> {
    const result = await this.create(data as IBooking);
    return result;
  }

  //----------------------------------- get booked data based on condition
  async getBookedDatasByCondition(data: object): Promise<IBooking[]> {
    const result = await this.findManyByCondition(data);
    return result;
  }
  //----------------------------------- get each booking data by id
  async getEachBookingDataById(_id: string): Promise<IBookingPopulated> {
    const result = await this._BookingModal
      .findById(_id,)
      .populate("customerId")
      .populate("shopId")
      .populate("serviceId")
      // .populate("customerAddressId")
      .populate("staffId")
      .lean<IBookingPopulated>();

      

      

    if (!result) {
      throw new ErrorResponse(
        MessageEnum.BOOKING_DATA_FETCH_FAILED,
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }
    return result as IBookingPopulated;
  }


  //----------------------------------- update booking
  async updateBooking(
    id: string,
    data: Partial<IBooking>
  ): Promise<IBooking | void> {

    const result = await this.update(id, data);
    if (result) {
      logger.info('booking updated successfully')
      return result;
    }
    logger.error('error to update booking data')
  }

  //----------------------------------- get populated data
  async bookingDatas(
    data: string,
    query: { page?: string; limit?: string; search?: string }
  ): Promise<{
    data: IBookingPopulated[];
    pagination: IPaginationResponseMeta;
  }> {
    const filter: FilterQuery<IBooking> = {
      customerId: new mongoose.Types.ObjectId(data),
    };

    if (query.search !== "all") {
      filter.status = query.search;
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

    const result = await this.filterWithPagination<IBookingPopulated>(
      options,
      filter,
      populate
    );

    return result as {
      data: IBookingPopulated[];
      pagination: IPaginationResponseMeta;
    };
  }

  //----------------------------------- get populated data
  async bookingDatasForVendor(
    data: string,
    query: { page?: string; limit?: string; search?: string,date:string }
  ): Promise<{
    data: IBookingPopulated[];
    pagination: IPaginationResponseMeta;
  }> {
    const filter: FilterQuery<IBooking> = {
      shopId: new mongoose.Types.ObjectId(data),
    };

    if (query.search !== "all" && query.search !== "request") {
      filter.status = query.search;
    }

 
    if (query.search === "requests") {
      filter.status = "cancelled";
      filter.paymentStatus = { $nin: ["refunded", "failed"] };
      filter.paymentMethod ={$ne : 'payAtShop'}
    }

    if(query.date.trim()){
        filter.bookingDate = query.date
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

    const result = await this.filterWithPagination<IBookingPopulated>(
      options,
      filter,
      populate
    );
    return result as {
      data: IBookingPopulated[];
      pagination: IPaginationResponseMeta;
    };
  }
}
