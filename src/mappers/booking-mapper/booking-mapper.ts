import { IBooking } from '../../types/common-types'
import { BookingResponseDTO } from "../../dto/booking-dto/booking-dto";

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
