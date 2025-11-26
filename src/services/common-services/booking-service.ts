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

export class BookingService implements IBookingServiceInterface {
  private _BookingRepository: IBookingRopsitoryInterface;
  private _ServiceRepository: IServiceRepositoryInterface;
  private _StaffRepository: IStaffRepositoryInterface;

  constructor(
    bookingService: IBookingRopsitoryInterface,
    serviceRepository: IServiceRepositoryInterface,
    staffRepository: IStaffRepositoryInterface
  ) {
    this._BookingRepository = bookingService;
    this._ServiceRepository = serviceRepository;
    this._StaffRepository = staffRepository;
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
    const { staffId, timePreffer, date, serviceId,customerId,addressId,shopId } = data;

    // 1 data motham edukkuka ✅
    // 2 duraion edukkuka ✅
    // 3 bookig date indo nokuka

    // 4 illankin start time break start time end time clsose time enniva vekkuka
    // 5 sort cheyyuka
    // 6 edit preffered timel aduthulla time choose cheyyuka

    // 7 edt - after this prefferd time kanunnilla-
    // so find  the nerest time in that allocate the time

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

    const timePrefferIndex = slots.indexOf(timePreffer);
    if(timePrefferIndex == -1){
      logger.error('could not find the prefferd time in the slot')
      return false
    }

    let availableMinutes = this.diffMinutes(slots[timePrefferIndex-1],slots[timePrefferIndex])

     if(availableMinutes <  serviceDuration){
          logger.warn('time not available on the preffered time gap')
          return false
     }else{
          
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
}
