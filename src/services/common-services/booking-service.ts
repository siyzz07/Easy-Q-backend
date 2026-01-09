import { IBookingRopsitoryInterface } from "../../interface/booking-interface/booking-repository-interface";
import { IBookingServiceInterface } from "../../interface/booking-interface/booking-service-interface";
import { IServiceRepositoryInterface } from "../../interface/service-interface/service-repository-interface";
import { IStaffRepositoryInterface } from "../../interface/staff-interface/staff-repository-interface";
import { addMinutes, format, parse } from "date-fns";
import { ErrorResponse } from "../../utils/errorResponse";
import { MessageEnum } from "../../enums/messagesEnum";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";

import { BookingMapper, toBookingPopulatedMapper } from "../../mappers/booking-mapper/booking-mapper";
import {
  BookingResponseDTO,
  bookingDatasPopulatedDto,
  checkTimeDto,
} from "../../dto/booking-dto/booking-dto";
import { CreateBookingDTO } from "../../dto/booking-dto/booking-dto";
import mongoose, { Schema, Types } from "mongoose";
import { throwDeprecation } from "process";
import { IStaff } from "../../types/vendorType";
import logger from "../../utils/logger";
import { ICacheService } from "../../interface/cache-interface/cache-service-interface";
import {
  IBooking,
  IBookingPopulated,
  IPaginationResponseMeta,
} from "../../types/common-types";
import { INotificationServiceInterface } from "../../interface/notificaion-interface/notification-service-interface";
import { nanoid } from "nanoid";
import { log } from "console";
import { Logger } from "winston";
import { IWalletRepositoryInterface } from "../../interface/wallet-interface/wallet-repository-interface";
import { ITransactionRepositoryInterface } from "../../interface/transaction-interface/transaction-repository-interface";
import { transactionRepository } from "../../di/repositoriesDi";
import {
  TransactionOwnerTypeEnu,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from "../../enums/transactionEnum";
import { IWalletServiceInterface } from "../../interface/wallet-interface/wallet-service-interface";
import { WalletService } from "./wallet-service";
import { RoleEnum } from "../../enums/role";

export class BookingService implements IBookingServiceInterface {
  private _BookingRepository: IBookingRopsitoryInterface;
  private _ServiceRepository: IServiceRepositoryInterface;
  private _StaffRepository: IStaffRepositoryInterface;
  private _NotificationService: INotificationServiceInterface;
  private _WalletService: IWalletServiceInterface;
  private _TransactionRepository: ITransactionRepositoryInterface;
  // private _Cache_service: ICacheService;

  constructor(
    bookingService: IBookingRopsitoryInterface,
    serviceRepository: IServiceRepositoryInterface,
    staffRepository: IStaffRepositoryInterface,
    notificationService: INotificationServiceInterface,
    walletSerivce:IWalletServiceInterface,
    transactionRepository: ITransactionRepositoryInterface
    // cacheService: ICacheService
  ) {
    this._BookingRepository = bookingService;
    this._ServiceRepository = serviceRepository;
    this._StaffRepository = staffRepository;
    this._NotificationService = notificationService;
    this._WalletService = walletSerivce;
    this._TransactionRepository = transactionRepository;
    // this._Cache_service = cacheService;
  }

  // ------------------------------- add new  booking ----------------------
  addNewbooking = async (
    data: CreateBookingDTO
  ): Promise<BookingResponseDTO | void> => {

    console.log('1');
    
    
    const { userId, paymentMethod, bookingId, totalAmount, status } = data;
    const existBooking = await this._BookingRepository.getEachBookingDataById(
      bookingId
    );
    
    console.log('2');
    
    if (!existBooking) {
      console.log('not found booking data');
      
      //  throw new ErrorResponse(MessageEnum.boo)
    } else {
      let amount = Number(existBooking.totalAmount)
      let query = {};
      
      console.log('3');
      if (status == "failed" && paymentMethod == "razorpay") {
        query = {
          paymentMethod,
          paymentStatus: status,
        };
        
      } else if (status == "paid" && paymentMethod == "razorpay") {
        
        query = {
          paymentMethod,
          paymentStatus: status,
          expireAt: null,
        };
        
        const customerTransaction = {
          bookingId: new mongoose.Types.ObjectId(existBooking._id),
          user: new mongoose.Types.ObjectId(userId),
          userType: TransactionOwnerTypeEnu.CUSTOMER,
          flow: "debit",
          transactionType: TransactionTypeEnum.RAZORPAY,
          status: TransactionStatusEnum.SUCCESS,
          amount:amount
        };
        
          const vendorTransaction = {
            bookingId: new mongoose.Types.ObjectId(existBooking._id),
            user: new mongoose.Types.ObjectId(existBooking.shopId._id as string),
            userType: TransactionOwnerTypeEnu.VENDOR,
            flow: "credit",
            transactionType: TransactionTypeEnum.RAZORPAY,
            status: TransactionStatusEnum.SUCCESS,
            amount:amount
          };

          
          await Promise.all([
            this._TransactionRepository.createTransaction(customerTransaction),
            this._TransactionRepository.createTransaction(vendorTransaction),
          ]);
        }
        
        if (paymentMethod == "wallet") {
          
          console.log('4');
          const customerWallet  = await this._WalletService.getWalletData(userId as string,RoleEnum.CUSTOMER)
          const vendorWallet  = await this._WalletService.getWalletData(existBooking.shopId._id as string ,RoleEnum.VENDOR)
          console.log('5');
          
          if(Number(customerWallet.balance) < Number(existBooking.totalAmount)){
            
            console.log('6');
            throw new ErrorResponse(MessageEnum.WALLET_INSUFFICIENT_BALANCE,StatusCodeEnum.BAD_REQUEST)
          }
           
          const customerTransaction = {
            bookingId: new mongoose.Types.ObjectId(existBooking._id),
            user: new mongoose.Types.ObjectId(userId),
            userType: TransactionOwnerTypeEnu.CUSTOMER,
            flow: "debit",
            transactionType: TransactionTypeEnum.WALLET,
            status: TransactionStatusEnum.SUCCESS,
            amount:amount
          };
          console.log('7');
          
          const vendorTransaction = {
            bookingId: new mongoose.Types.ObjectId(existBooking._id),
            user: new mongoose.Types.ObjectId(existBooking.shopId._id as string),
            userType: TransactionOwnerTypeEnu.VENDOR,
            flow: "credit",
            transactionType: TransactionTypeEnum.WALLET,
            status: TransactionStatusEnum.SUCCESS,
            amount:amount
          };
          
          console.log('8');
         
          
          await Promise.all([
            this._WalletService.updateWallet(userId as string,RoleEnum.CUSTOMER ,-amount),
            this._WalletService.updateWallet(existBooking.shopId._id as string as string,RoleEnum.VENDOR ,amount),
            this._TransactionRepository.createTransaction(customerTransaction),
            this._TransactionRepository.createTransaction(vendorTransaction),
          ]);
          
          console.log('9');
        query = {
          paymentMethod,
          paymentStatus: 'paind',
          expireAt: null,
        };
        
        
      }

      const result = await this._BookingRepository.updateBooking(
        bookingId,
        query
      );

      console.log(result);

      if (result) {
        void this._NotificationService.sendBookingNotificationToVendor(result);
        void this._NotificationService.sendBookingNotificationToCustomer(
          result
        );
        return BookingMapper.toDTO(result);
      } else {
      }
    }
  };

  // ------------------------------- check the prifered time is available ----------------------

  checkTimeAvailable = async (
    data: checkTimeDto
  ): Promise<boolean | string> => {
    const {
      staffId,
      timePreffer,
      date,
      serviceId,
      customerId,
      addressId,
      shopId,
    } = data;

    const staffData = await this._StaffRepository.getStaffById(staffId);
    if(!staffData){
      throw new ErrorResponse(MessageEnum.STAFF_NOT_FOUND,StatusCodeEnum.BAD_REQUEST)
    }
    const serviceData = await this._ServiceRepository.getSelectedService(
      serviceId
    );

    const serviceDuration = Number(serviceData?.duration as string);
    const bookingDateKey = new Date(date).toLocaleDateString("en-CA");

    const bookedDatas = await this._BookingRepository.getBookedDatasByCondition(
      { staffId: staffId, bookingDate: bookingDateKey }
    );

    const availableTime = await this.sortAndFindAvailableTime(
      bookedDatas,
      staffData ,
      serviceDuration,
      timePreffer
    );

    if (!availableTime) {
      logger.warn("time not available on the preffered time gap");
      return false;
    }

    const TTL = this.calculateTTL(bookingDateKey, availableTime.startTime);

    const bookingData = {
      bookingId: `Bk-${nanoid(10)}`,
      customerId: new Types.ObjectId(customerId),
      shopId: new Types.ObjectId(shopId),
      serviceId: new Types.ObjectId(serviceId),
      customerAddressId: new Types.ObjectId(addressId),
      staffId: new Types.ObjectId(staffId),
      bookingDate: bookingDateKey,
      bookingTimeStart: availableTime.startTime,
      bookingTimeEnd: availableTime.endTime,
      totalAmount: serviceData?.price,
      status: "pending",
      paymentStatus: "pending",
      expireAt: new Date(Date.now() + TTL * 60 * 1000),
    };

    console.log("one");
    const result = await this._BookingRepository.addNewBooking(bookingData);

    if (result) {
      console.log("two");
      return result._id as string;
    }
    return false;
  };

  /**
   *
   *
   * get customer boking data
   *
   */
  customerBooking = async (
    userId: string,
    query: { page?: string; limit?: string; search?: string }
  ): Promise<{
    data: bookingDatasPopulatedDto[];
    pagination: IPaginationResponseMeta;
  }> => {
    const bookingData = await this._BookingRepository.bookingDatas(
      userId,
      query
    );
    if (bookingData) {
      logger.info(MessageEnum.BOOKING_DATA_FETCH_SUCCESS);
    } else {
      logger.error(MessageEnum.BOOKING_DATA_FETCH_FAILED);
    }
    return {
      data: toBookingPopulatedMapper.toDtoList(bookingData.data),
      pagination: bookingData.pagination
    };
  };

  /**
   *
   *  get selected booking data
   *
   */

  selectedBookingData = async (id: string): Promise<bookingDatasPopulatedDto> => {
    const bookingData = await this._BookingRepository.getEachBookingDataById(
      id
    );

    if (bookingData) {
      return toBookingPopulatedMapper.toDto(bookingData);
    } else {
      logger.error("invalied booking Id");
      throw new ErrorResponse(
        MessageEnum.BOOKING_ID_INVALIED,
        StatusCodeEnum.BAD_REQUEST
      );
    }
  };

  cancelBooking = async (bookingId: string): Promise<IBooking | void> => {
    const result = await this._BookingRepository.updateBooking(bookingId, {
      status: "cancelled",
    });
    if (result) {
      return result;
    }
  };

  /***
   *
   * Helpers---
   *
   */

  /**
   * Sort an array  times in ascending order
   */
  private sortTimes(
    times: { start: string; end: string; type: string }[]
  ): { start: string; end: string; type: string }[] {
    return times.sort((a, b) => a.start.localeCompare(b.start));
  }

  /**
   * check there is time betwee the time preioud
   */
  private diffMinutes(start: string, end: string): number {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;

    return endMinutes - startMinutes;
  }

  /**
   * booking  expire time calculaion
   */
  private calculateTTL(bookingDate: string, bookingTime: string): number {
    const now = new Date();

    const [year, month, day] = bookingDate.split("-").map(Number);
    const [hours, minutes] = bookingTime.split(":").map(Number);
    const booking = new Date(year, month - 1, day, hours, minutes, 0, 0);
    const diffMs = booking.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes <= 0) {
      return 1;
    }
    return Math.min(diffMinutes, 20);
  }

  /**
   * sort times and find the available time
   */

  private async sortAndFindAvailableTime(
    bookedDatas: IBooking[],
    staffData: IStaff,
    serviceDuration: number,
    prefferTime: string
  ): Promise<{ startTime: string; endTime: string } | false> {
    const staffOpen = {
      start: staffData.openingTime,
      end: staffData.openingTime,
      type: "checkpoint",
    };

    const staffClose = {
      start: staffData.closingTime,
      end: staffData.closingTime,
      type: "checkpoint",
    };

    const breaks = staffData.breaks.map((b) => ({
      start: b.breakStartTime,
      end: b.breakEndTime,
      type: "checkpoint",
    }));

    const bookings = bookedDatas.map((b) => ({
      start: b.bookingTimeStart,
      end: b.bookingTimeEnd,
      type: "booking",
    }));

    const staffBookings = [staffOpen, ...breaks, ...bookings, staffClose];

    const staffBookingsSroted = await this.sortTimes(staffBookings);
    const availableTime = await this.findAvailabletime(
      staffBookingsSroted,
      serviceDuration,
      prefferTime
    );

    if (availableTime) {
      return availableTime;
    } else {
      return false;
    }
  }

  /**
   * add booking to the cache
   */
  private async findAvailabletime(
    timeLine: { start: string; end: string; type: string }[],
    serviceDuration: number,
    preferredTime: string
  ): Promise<{ startTime: string; endTime: string } | false> {
    const indexes: number[] = [];

    function add(index: number) {
      indexes.push(index);
      if (indexes.length > 2) indexes.shift();
    }

    timeLine.some((item, index) => {
      if (item.type === "checkpoint") add(index);
      return item.start === preferredTime;
    });

    if (indexes.length < 2) return false;

    const [startIdx, endIdx] = indexes;

    for (let i = startIdx; i < endIdx; i++) {
      const freeTime = this.diffMinutes(timeLine[i].end, timeLine[i + 1].start);

      if (freeTime >= serviceDuration) {
        const startTime = timeLine[i].end;
        const endTime = this.findEndTime(startTime, serviceDuration);
        return { startTime, endTime };
      }
    }

    return false;
  }

  /**
   * find service end time
   */

  private findEndTime(time: string, minutes: number) {
    const date = new Date(`2000-01-01T${time}:00`);
    date.setMinutes(date.getMinutes() + minutes);
    return date.toTimeString().slice(0, 5);
  }
}
