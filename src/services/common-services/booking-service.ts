import { IBookingRopsitoryInterface } from "../../interface/booking-interface/booking-repository-interface";
import { IBookingServiceInterface } from "../../interface/booking-interface/booking-service-interface";
import { IServiceRepositoryInterface } from "../../interface/service-interface/service-repository-interface";
import { IStaffRepositoryInterface } from "../../interface/staff-interface/staff-repository-interface";
import { addMinutes, format, parse } from "date-fns";
import { ErrorResponse } from "../../utils/errorResponse";
import { MessageEnum } from "../../enums/messagesEnum";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";

import { BookingMapper } from "../../mappers/booking-mapper/booking-mapper";
import {
  BookingResponseDTO,
  checkTimeDto,
} from "../../dto/booking-dto/booking-dto";
import { CreateBookingDTO } from "../../dto/booking-dto/booking-dto";
import mongoose from "mongoose";
import { throwDeprecation } from "process";
import { IStaff } from "../../types/vendorType";
import logger from "../../utils/logger";
import { ICacheService } from "../../interface/cache-interface/cache-service-interface";

export class BookingService implements IBookingServiceInterface {
  private _BookingRepository: IBookingRopsitoryInterface;
  private _ServiceRepository: IServiceRepositoryInterface;
  private _StaffRepository: IStaffRepositoryInterface;
  private _Cache_service: ICacheService;

  constructor(
    bookingService: IBookingRopsitoryInterface,
    serviceRepository: IServiceRepositoryInterface,
    staffRepository: IStaffRepositoryInterface,
    cacheService: ICacheService
  ) {
    this._BookingRepository = bookingService;
    this._ServiceRepository = serviceRepository;
    this._StaffRepository = staffRepository;
    this._Cache_service = cacheService;
  }

  // ------------------------------- add new  booking ----------------------
  addNewbooking = async (
    data: CreateBookingDTO
  ): Promise<BookingResponseDTO | void> => {
    const { userId, ...payload } = data;

    const staffData = await this._StaffRepository.getStaffById(
      payload.staffId!.toString()
    );
    const serviceData = await this._ServiceRepository.getSelectedService(
      payload.serviceId!.toString()
    );

    if (!staffData || !serviceData) {
      throw new ErrorResponse(
        MessageEnum.SERVER_ERROR,
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }
    const serviceDuration = serviceData.duration;
    const bookingDateKey = new Date(payload.bookingDate).toLocaleDateString(
      "en-CA"
    );

    const bookingTimes: any = staffData.bookingTimes;
    let slots = bookingTimes.get(bookingDateKey) || [];

    let startTime;
    if (slots.length) {
      const lastSlot = slots[slots.length - 1];
      startTime = lastSlot;
    } else {
      startTime = staffData.openingTime;
    }

    const start = parse(startTime, "HH:mm", new Date());
    const end = addMinutes(start, Number(serviceDuration));
    const endTime = format(end, "HH:mm");

    slots.push(endTime);
    bookingTimes.set(bookingDateKey, slots);

    if (!staffData?._id) {
      throw new ErrorResponse(
        MessageEnum.SERVER_ERROR,
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }

    staffData.bookingTimes = bookingTimes;
    await this._StaffRepository.updateStaff(staffData._id.toString(), {
      bookingTimes,
    });

    const bookingData = {
      customerId: new mongoose.Types.ObjectId(payload.customerId),
      shopId: new mongoose.Types.ObjectId(payload.shopId),
      serviceId: new mongoose.Types.ObjectId(payload.serviceId),
      customerAddressId: new mongoose.Types.ObjectId(payload.customerAddressId),
      staffId: new mongoose.Types.ObjectId(payload.staffId),
      bookingDate: bookingDateKey,
      bookingTime: startTime,
      totalAmount: payload.totalAmount,
      paymentMethod: payload.paymentMethod,
      status: "pending",
      paymentStatus: "pending",
    };

    const result = await this._BookingRepository.addNewBooking(bookingData);

    if (result) {
      return BookingMapper.toDTO(result);
    } else {
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
    let staffData = await this._StaffRepository.getStaffById(staffId);
    const serviceData = await this._ServiceRepository.getSelectedService(
      serviceId
    );

    const serviceDuration = Number(serviceData.duration);

    let bookingTimes: any = staffData.bookingTimes;
    const bookingDateKey = new Date(date).toLocaleDateString("en-CA");
    let slots = bookingTimes.get(bookingDateKey) || [];



    let timePrefferInSlot = slots.includes(timePreffer);

    if (slots.length == 0 || !timePrefferInSlot) {
      slots = this.defaultSlotSet(staffData, slots);

      bookingTimes.set(bookingDateKey, slots);
      if (staffData._id) {
        let data = await this._StaffRepository.updateStaff(
          staffData._id.toString(),
          { bookingTimes }
        );
        if (data) {
          staffData = await this._StaffRepository.getStaffById(staffId);
          bookingTimes = staffData.bookingTimes;
          slots = bookingTimes.get(bookingDateKey);
        }
      }
    }

      const redisStaffkey = staffId+bookingDateKey


        let availableTime = await this.findAvailableTime(slots,serviceDuration,timePreffer,redisStaffkey)

    if (availableTime.availableMinuts< serviceDuration) {
      logger.warn("time not available on the preffered time gap");
      return false;
    } else {
     const customerTime =  availableTime.customerTime 
     let key = staffId + bookingDateKey;
     let exist = await this._Cache_service.get(key)
     let expireTime = this.getExpireSeconds(bookingDateKey);
      if(exist){

      }else{

      }
    }

    return true;
  };

  /**
   * Sort an array of HH:mm times in ascending order
   */
  private sortTimes(times: string[]): string[] {
    return times.sort((a, b) => a.localeCompare(b));
  }

  /**
   * add default bookings times like start time end time break time
   */

  private defaultSlotSet(staffData: IStaff, slots: string[]): string[] {
    let defaultSlot = [
      staffData.openingTime,
      ...staffData.breaks.flatMap((b) => [b.breakStartTime, b.breakEndTime]),
      staffData.closingTime,
    ];

    slots = [...slots, ...defaultSlot];
    slots = this.sortTimes([...new Set(slots)]);
    return slots;
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
   * booking cache expire time calculaion
   */
  private getExpireSeconds(dateString: string) {
    const [year, month, day] = dateString.split("-").map(Number);
    const bookingDate = new Date(year, month - 1, day);
    const nextDayMidnight = new Date(year, month - 1, day + 1, 0, 0, 0);
    const now = new Date();
    const seconds = Math.floor(
      (nextDayMidnight.getTime() - now.getTime()) / 1000
    );
    return seconds > 0 ? seconds : 1;
  }

 /**
   * find available times and chech is have booking time 
   */

 private async findAvailableTime (slot:string[],duration:number,prefferTime:string,rediskey:string){


        let cachedBookings =await this.removeExpiredBookings(rediskey)
        let cachedTimes = cachedBookings.map((value:{id:string ,time:string,expireAt:number})=> value.time)
          let bookings =[
            ...slot,
            ...cachedTimes
          ]
        let sorted = this.sortTimes(bookings)

        const timePrefferIndex = sorted.indexOf(prefferTime);

        let availableTimeGap =  await this.diffMinutes(sorted[timePrefferIndex-1],sorted[timePrefferIndex])

        return {availableMinuts:availableTimeGap,customerTime:sorted[timePrefferIndex-1]}



        // const timePrefferIndex = slots.indexOf(timePreffer);


 }

 /**
   * get the vailed times without taking the expired ones
   */

 private async removeExpiredBookings(redisKey: string) {
  let cached = await this._Cache_service.get< {id:string ,time:string,expireAt:number}[]>(redisKey);
  if (!cached) return [];
  const now = Math.floor(Date.now() / 1000);
  const valid = cached.filter((b: {id:string ,time:string,expireAt:number}) => b.expireAt > now);
  return valid;
}

  /**
   * add booking to the cache
   */
  private  setBookingToCache (key:string,expireTime:number){

  }
}
