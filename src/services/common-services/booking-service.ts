import { IBookingRopsitoryInterface } from "../../interface/booking-interface/booking-repository-interface";
import { IBookingServiceInterface } from "../../interface/booking-interface/booking-service-interface";
import { IServiceRepositoryInterface } from "../../interface/service-interface/service-repository-interface";
import { IStaffRepositoryInterface } from "../../interface/staff-interface/staff-repository-interface";
import { addMinutes, format, parse } from "date-fns";
import { ErrorResponse } from "../../utils/errorResponse";
import { MessageEnum } from "../../enums/messagesEnum";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";

import { BookingMapper } from "../../mappers/booking-mapper/booking-mapper";
import { BookingResponseDTO } from "../../dto/booking-dto/booking-dto";
import { CreateBookingDTO } from "../../dto/booking-dto/booking-dto";
import mongoose from "mongoose";


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
  addNewbooking = async (data: CreateBookingDTO): Promise<BookingResponseDTO |void  > => {
    const { userId, ...payload } = data;

    const staffData = await this._StaffRepository.getStaffById(payload.staffId!.toString());
    const serviceData = await this._ServiceRepository.getSelectedService(payload.serviceId!.toString());

    if (!staffData || !serviceData) {
      throw new ErrorResponse(MessageEnum.SERVER_ERROR, StatusCodeEnum.INTERNAL_SERVER_ERROR);
    }

    const serviceDuration = serviceData.duration;
    const bookingDateKey = new Date(payload.bookingDate).toLocaleDateString("en-CA");

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
      throw new ErrorResponse(MessageEnum.SERVER_ERROR, StatusCodeEnum.INTERNAL_SERVER_ERROR);
    }

    staffData.bookingTimes = bookingTimes;
    await this._StaffRepository.updateStaff(staffData._id.toString(), { bookingTimes });

    const bookingData = {
      customerId: new mongoose.Types.ObjectId( payload.customerId),
      shopId: new mongoose.Types.ObjectId( payload.shopId),
      serviceId: new mongoose.Types.ObjectId( payload.serviceId),
      customerAddressId: new mongoose.Types.ObjectId(  payload.customerAddressId),
      staffId: new mongoose.Types.ObjectId( payload.staffId),
      bookingDate: bookingDateKey,
      bookingTime: startTime,
      totalAmount: payload.totalAmount,
      paymentMethod: payload.paymentMethod,
      status: "pending",
      paymentStatus: "pending"
    };

    const result = await this._BookingRepository.addNewBooking(bookingData);

   if(result){

     return BookingMapper.toDTO(result);
   }else{

   }
  };
}
