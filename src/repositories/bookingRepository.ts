
import { FilterQuery, PopulateOptions } from "mongoose";
import { IBookingRopsitoryInterface } from "../interface/booking-interface/booking-repository-interface";
import { BookingModel } from "../models/bookingModel";
import {
  IBooking,
  IBookingPopulated,
  IPaginationResponseMeta,
} from "../types/common-types";
import BaseRepository from "./baseRepository";
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

  //----------------------------------- get booking stats
  async getBookingStats(vendorId: string, year: number): Promise<any> {
    try {
      const stats = await this._BookingModal.aggregate([
        {
          $match: {
            shopId: new mongoose.Types.ObjectId(vendorId),
            createdAt: {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${year + 1}-01-01`),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id": 1 },
        },
      ]);
      return stats;
    } catch (error) {
      console.error("Error fetching booking stats:", error);
      throw new ErrorResponse(
        MessageEnum.SERVER_ERROR,
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }
  }

  //----------------------------------- get weekly booking stats
  async getWeeklyBookingStats(vendorId: string): Promise<any> {
    try {
      const startOfWeek = new Date();
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 7);

      const stats = await this._BookingModal.aggregate([
        {
          $match: {
            shopId: new mongoose.Types.ObjectId(vendorId),
            createdAt: {
              $gte: startOfWeek,
              $lt: endOfWeek,
            },
          },
        },
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id": 1 },
        },
      ]);
      return stats;
    } catch (error) {
      console.error("Error fetching weekly booking stats:", error);
      throw new ErrorResponse(
        MessageEnum.SERVER_ERROR,
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }
  }

  //----------------------------------- get admin booking stats
  async getAdminBookingStats(): Promise<any> {
    try {
      const stats = await this._BookingModal.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: { $toDouble: "$totalAmount" } },
            totalBookings: { $sum: 1 },
            completedBookings: {
              $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
            },
            cancelledBookings: {
              $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
            },
            pendingBookings: {
              $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
            },
          },
        },
      ]);
      return stats[0] || { totalRevenue: 0, totalBookings: 0, completedBookings: 0, cancelledBookings: 0, pendingBookings: 0 };
    } catch (error) {
      console.error("Error fetching admin booking stats:", error);
      throw new ErrorResponse(MessageEnum.SERVER_ERROR, StatusCodeEnum.INTERNAL_SERVER_ERROR);
    }
  }

  //----------------------------------- get admin monthly revenue stats
  async getAdminMonthlyRevenueStats(year: number): Promise<any> {
    try {
      const stats = await this._BookingModal.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${year + 1}-01-01`),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            revenue: { $sum: { $toDouble: "$totalAmount" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id": 1 } },
      ]);
      return stats;
    } catch (error) {
      console.error("Error fetching admin monthly revenue stats:", error);
      throw new ErrorResponse(MessageEnum.SERVER_ERROR, StatusCodeEnum.INTERNAL_SERVER_ERROR);
    }
  }

  //----------------------------------- get vendor revenue and customer count
  async getVendorRevenueAndCustomerCount(vendorId: string): Promise<any> {
    try {
      const stats = await this._BookingModal.aggregate([
        {
          $match: {
            shopId: new mongoose.Types.ObjectId(vendorId),
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: {
                $cond: [
                  { $eq: ["$status", "completed"] },
                  { $toDouble: "$totalAmount" },
                  0,
                ],
              },
            },
            uniqueCustomers: { $addToSet: "$customerId" },
            pendingBookings: {
              $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
            },
          },
        },
        {
          $project: {
            totalRevenue: 1,
            pendingBookings: 1,
            customerCount: { $size: "$uniqueCustomers" },
          },
        },
      ]);
      return stats[0] || { totalRevenue: 0, customerCount: 0, pendingBookings: 0 };
    } catch (error) {
      console.error("Error fetching vendor revenue stats:", error);
      throw new ErrorResponse(MessageEnum.SERVER_ERROR, StatusCodeEnum.INTERNAL_SERVER_ERROR);
    }
  }
}
