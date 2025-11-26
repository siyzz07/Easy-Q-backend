import { IBooking, ITimeCheck } from '../../types/common-types'
import { BookingResponseDTO, checkTimeDto } from "../../dto/booking-dto/booking-dto";

export const BookingMapper = {
   toDTO(booking: IBooking): BookingResponseDTO {
    return {
      id: booking._id!.toString(),
      customerId: booking.customerId.toString(),
      shopId: booking.shopId.toString(),
      serviceId: booking.serviceId.toString(),
      customerAddressId: booking.customerAddressId.toString(),
      staffId: booking.staffId?.toString(),
      bookingTime: booking.bookingTime,
      bookingDate: booking.bookingDate,
      status: booking.status,
      totalAmount: booking.totalAmount,
      paymentMethod: booking.paymentMethod,
      paymentStatus: booking.paymentStatus,
      createdAt: booking.createdAt?.toISOString() || "",
      updatedAt: booking.updatedAt?.toISOString() || "",
    };
  }
};

export const checkTimeReqMapper = {
  toDto(data: ITimeCheck): checkTimeDto {
    return {
      staffId: data.staffId,
      timePreffer: data.timePreffer,
      date: data.date,
      serviceId:data.serviceId,
      customerId:data.userId,
      shopId:data.shopId,
      addressId:data.addressId
    };
  }
};
