
import { FilterQuery, PopulateOptions } from "mongoose";
import { IBookingRopsitory } from "../interface/booking-interface/booking-repository-interface";
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
import { AdminBookingStats, MonthlyData, PeakHour, PlatformStatusBreakdown, TopService, TopVendor } from "../types/adminType";
import { IMonthlyStats, IWeeklyStats, IVendorRevenueStats, IDetailedVendorAnalytics } from "../types/statsTypes";
export class BookingRepository
  extends BaseRepository<IBooking>
  implements IBookingRopsitory
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
  async getBookingStats(vendorId: string, year: number): Promise<IMonthlyStats[]> {
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
  async getWeeklyBookingStats(vendorId: string): Promise<IWeeklyStats[]> {
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
            revenue: { $sum: { $toDouble: "$totalAmount" } },
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
  async getAdminBookingStats(): Promise<AdminBookingStats> {
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
  async getAdminMonthlyRevenueStats(year: number): Promise<MonthlyData[]> {
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

  //----------------------------------- get admin platform status breakdown
  async getAdminPlatformStatusBreakdown(): Promise<PlatformStatusBreakdown[]> {
    try {
      const stats = await this._BookingModal.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $project: { status: "$_id", count: 1, _id: 0 } }
      ]);
      return stats;
    } catch (error) {
      console.error("Error fetching platform status breakdown:", error);
      throw new ErrorResponse(MessageEnum.SERVER_ERROR, StatusCodeEnum.INTERNAL_SERVER_ERROR);
    }
  }

  //----------------------------------- get admin top vendors
  async getAdminTopVendors(limit: number): Promise<TopVendor[]> {
    try {
      const stats = await this._BookingModal.aggregate([
        { $match: { status: "completed" } },
        {
          $group: {
            _id: "$shopId",
            revenue: { $sum: { $toDouble: "$totalAmount" } },
            bookings: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "vendors",
            localField: "_id",
            foreignField: "_id",
            as: "vendorDetails",
          },
        },
        { $unwind: "$vendorDetails" },
        {
          $project: {
            _id: 1,
            revenue: 1,
            bookings: 1,
            shopName: "$vendorDetails.shopName",
            email: "$vendorDetails.email",
          },
        },
        { $sort: { revenue: -1 } },
        { $limit: limit },
      ]);
      return stats;
    } catch (error) {
      console.error("Error fetching top vendors:", error);
      throw new ErrorResponse(MessageEnum.SERVER_ERROR, StatusCodeEnum.INTERNAL_SERVER_ERROR);
    }
  }

  //----------------------------------- get admin top services platform wide
  async getAdminTopServices(limit: number): Promise<TopService[]> {
    try {
      const stats = await this._BookingModal.aggregate([
        { $match: { status: "completed" } },
        {
          $group: {
            _id: "$serviceId",
            count: { $sum: 1 },
            revenue: { $sum: { $toDouble: "$totalAmount" } }
          }
        },
        {
          $lookup: {
            from: "services",
            localField: "_id",
            foreignField: "_id",
            as: "serviceDetails"
          }
        },
        { $unwind: "$serviceDetails" },
        {
          $project: {
            _id: 1,
            name: "$serviceDetails.serviceName",
            count: 1,
            revenue: 1
          }
        },
        { $sort: { count: -1 } },
        { $limit: limit }
      ]);
      return stats;
    } catch (error) {
      console.error("Error fetching admin top services:", error);
      throw new ErrorResponse(MessageEnum.SERVER_ERROR, StatusCodeEnum.INTERNAL_SERVER_ERROR);
    }
  }

  //----------------------------------- get admin platform peak hours
  async getAdminPeakHours(): Promise<PeakHour[]> {
    try {
      const stats = await this._BookingModal.aggregate([
        { 
          $group: { 
            _id: { $hour: "$createdAt" }, 
            count: { $sum: 1 } 
          } 
        },
        { $project: { hour: "$_id", count: 1, _id: 0 } },
        { $sort: { hour: 1 } }
      ]);
      return stats;
    } catch (error) {
      console.error("Error fetching platform peak hours:", error);
      throw new ErrorResponse(MessageEnum.SERVER_ERROR, StatusCodeEnum.INTERNAL_SERVER_ERROR);
    }
  }

  //----------------------------------- get vendor revenue and customer count
  async getVendorRevenueAndCustomerCount(vendorId: string): Promise<IVendorRevenueStats> {
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
  //----------------------------------- get detailed vendor analytics
  async getDetailedVendorAnalytics(vendorId: string): Promise<IDetailedVendorAnalytics> {
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
            totalBookings: { $sum: 1 },
            completedBookings: {
              $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
            },
            cancelledBookings: {
              $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
            },
            totalRevenue: {
              $sum: {
                $cond: [
                  { $eq: ["$status", "completed"] },
                  { $toDouble: "$totalAmount" },
                  0,
                ],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalBookings: 1,
            completedBookings: 1,
            cancelledBookings: 1,
            totalRevenue: 1,
            averageBookingValue: {
              $cond: [
                { $gt: ["$completedBookings", 0] },
                { $divide: ["$totalRevenue", "$completedBookings"] },
                0,
              ],
            },
            completionRate: {
              $cond: [
                { $gt: ["$totalBookings", 0] },
                {
                  $multiply: [
                    { $divide: ["$completedBookings", "$totalBookings"] },
                    100,
                  ],
                },
                0,
              ],
            },
          },
        },
      ]);

      const topServices = await this._BookingModal.aggregate([
        {
          $match: {
            shopId: new mongoose.Types.ObjectId(vendorId),
            status: "completed",
          },
        },
        {
          $group: {
            _id: "$serviceId",
            count: { $sum: 1 },
            revenue: { $sum: { $toDouble: "$totalAmount" } },
          },
        },
        {
          $lookup: {
            from: "services", // Adjust collection name if necessary
            localField: "_id",
            foreignField: "_id",
            as: "serviceDetails",
          },
        },
        { $unwind: "$serviceDetails" },
        {
          $project: {
            _id: 1,
            count: 1,
            revenue: 1,
            name: "$serviceDetails.serviceName",
          },
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]);

      const recentBookings = await this._BookingModal
        .find({ shopId: new mongoose.Types.ObjectId(vendorId) })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("customerId", "name email")
        .populate("serviceId", "serviceName")
        .lean();

      const staffPerformance = await this._BookingModal.aggregate([
        {
          $match: {
            shopId: new mongoose.Types.ObjectId(vendorId),
            status: "completed",
            staffId: { $exists: true, $ne: null }
          },
        },
        {
          $group: {
            _id: "$staffId",
            count: { $sum: 1 },
            revenue: { $sum: { $toDouble: "$totalAmount" } },
          },
        },
        {
          $lookup: {
            from: "staffs",
            localField: "_id",
            foreignField: "_id",
            as: "staffDetails",
          },
        },
        { $unwind: { path: "$staffDetails", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            count: 1,
            revenue: 1,
            name: "$staffDetails.staffName",
          },
        },
        { $sort: { count: -1 } },
      ]);

      const statusBreakdown = await this._BookingModal.aggregate([
        { $match: { shopId: new mongoose.Types.ObjectId(vendorId) } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $project: { status: "$_id", count: 1, _id: 0 } }
      ]);

      const peakHours = await this._BookingModal.aggregate([
        { $match: { shopId: new mongoose.Types.ObjectId(vendorId) } },
        { 
          $group: { 
            _id: { $hour: "$createdAt" }, 
            count: { $sum: 1 } 
          } 
        },
        { $project: { hour: "$_id", count: 1, _id: 0 } },
        { $sort: { hour: 1 } }
      ]);

      return {
        ...(stats[0] || {
          totalBookings: 0,
          completedBookings: 0,
          cancelledBookings: 0,
          totalRevenue: 0,
          averageBookingValue: 0,
          completionRate: 0,
        }),
        topServices,
        recentBookings,
        staffPerformance,
        statusBreakdown,
        peakHours,
      };
    } catch (error) {
      console.error("Error fetching detailed vendor analytics:", error);
      throw new ErrorResponse(
        MessageEnum.SERVER_ERROR,
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }
  }
}
