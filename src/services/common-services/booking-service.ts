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
import mongoose, { Schema, Types } from "mongoose";
import { throwDeprecation } from "process";
import { IStaff } from "../../types/vendorType";
import logger from "../../utils/logger";
import { ICacheService } from "../../interface/cache-interface/cache-service-interface";
import { IBooking } from "../../types/common-types";
import { INotificationServiceInterface } from "../../interface/notificaion-interface/notification-service-interface";

export class BookingService implements IBookingServiceInterface {
  private _BookingRepository: IBookingRopsitoryInterface;
  private _ServiceRepository: IServiceRepositoryInterface;
  private _StaffRepository: IStaffRepositoryInterface;
  private _NotificationSerivce:INotificationServiceInterface
  // private _Cache_service: ICacheService;

  constructor(
    bookingService: IBookingRopsitoryInterface,
    serviceRepository: IServiceRepositoryInterface,
    staffRepository: IStaffRepositoryInterface,
    notificationService :INotificationServiceInterface,
    // cacheService: ICacheService
    
  ) {
    this._BookingRepository = bookingService;
    this._ServiceRepository = serviceRepository;
    this._StaffRepository = staffRepository;
    this._NotificationSerivce = notificationService
    // this._Cache_service = cacheService;
  }

  // ------------------------------- add new  booking ----------------------
  addNewbooking = async (
    data: CreateBookingDTO
  ): Promise<BookingResponseDTO | void> => {
    const { userId,paymentMethod,bookingId,totalAmount } = data;

      const existBooking = await this._BookingRepository.getEachBookingDataById(bookingId)

      if(!existBooking){

        }else{

          const query={
            paymentMethod,
            paymentStatus:'pending',
            expireAt:null
          }

          let result = await this._BookingRepository.updateBooking(bookingId,query)

          if(result){
            this._NotificationSerivce.sendBookingNotificationToVendor(result)
            return BookingMapper.toDTO(result)
          }else{
            
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

    let staffData = await this._StaffRepository.getStaffById(staffId);
    const serviceData = await this._ServiceRepository.getSelectedService(
      serviceId
    );


    const serviceDuration = Number(serviceData.duration);
    const bookingDateKey = new Date(date).toLocaleDateString("en-CA");

    const bookedDatas = await this._BookingRepository.getBookedDatasByCondition(
      { staffId: staffId, bookingDate: bookingDateKey }
    );


    let availableTime = await this.sortAndFindAvailableTime(
      bookedDatas,
      staffData,
      serviceDuration,
      timePreffer
    );

    if(!availableTime){
      logger.warn("time not available on the preffered time gap");
      return false;
    }

    const TTL = this.calculateTTL(bookingDateKey,availableTime.startTime)


        const bookingData = {
      customerId: new Types.ObjectId(customerId),
      shopId: new Types.ObjectId(shopId),
      serviceId: new Types.ObjectId(serviceId),
      customerAddressId: new Types.ObjectId(addressId),
      staffId: new Types.ObjectId(staffId),
      bookingDate: bookingDateKey,
      bookingTimeStart: availableTime.startTime,
      bookingTimeEnd: availableTime.endTime,
      totalAmount: serviceData.price,
      status: "pending",
      paymentStatus: "pending",
      expireAt: new Date(Date.now() + TTL * 60 * 1000)
    };


    console.log('one')
    const result = await this._BookingRepository.addNewBooking(bookingData);
    
    
    if(result){
       console.log('two')
      return result._id as string
     }
     return false

    

  };

  /**
   * Sort an array of HH:mm times in ascending order
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
  ):Promise<{ startTime: string; endTime: string } | false>  {
    let staffOpen = {
      start: staffData.openingTime,
      end: staffData.openingTime,
      type: "checkpoint",
    };

    let staffClose = {
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
    const availableTime =  await this.findAvailabletime(
      staffBookingsSroted,
      serviceDuration,
      prefferTime
    );

    if(availableTime){
        return availableTime
    }else{
      return false
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

  let indexes: number[] = [];

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

  private findEndTime(time:string, minutes:number) {
  const date = new Date(`2000-01-01T${time}:00`);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toTimeString().slice(0, 5); 
}
}


