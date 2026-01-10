import {
  IBooking,
  IBookingPopulated,
  ITimeCheck,
} from "../../types/common-types";
import {
  bookingDatasPopulatedDto,
  BookingResponseDTO,
  checkTimeDto,
} from "../../dto/booking-dto/booking-dto";

export const BookingMapper = {
  toDTO(booking: IBooking): BookingResponseDTO {
    return {
      id: booking._id!.toString(),
      bookingId: booking.bookingId.toString(),
      customerId: booking.customerId.toString(),
      shopId: booking.shopId.toString(),
      serviceId: booking.serviceId.toString(),
      customerAddressId: booking.customerAddressId.toString(),
      staffId: booking.staffId?.toString(),
      bookingTimeStart: booking.bookingTimeStart,
      bookingTimeEnd: booking.bookingTimeEnd,
      bookingDate: booking.bookingDate,
      status: booking.status,
      totalAmount: booking.totalAmount,
      paymentMethod: booking.paymentMethod,
      paymentStatus: booking.paymentStatus,
      createdAt: booking.createdAt?.toISOString() || "",
      updatedAt: booking.updatedAt?.toISOString() || "",
    };
  },
};

export const checkTimeReqMapper = {
  toDto(data: ITimeCheck): checkTimeDto {
    return {
      staffId: data.staffId,
      timePreffer: data.timePreffer,
      date: data.date,
      serviceId: data.serviceId,
      customerId: data.userId,
      shopId: data.shopId,
      addressId: data.addressId,
    };
  },
};

export const toBookingPopulatedMapper = {
  toDto(b: IBookingPopulated): bookingDatasPopulatedDto {
    return {
      id: b._id as string,
      bookingId: b.bookingId,

      date: b.bookingDate,
      startTime: b.bookingTimeStart,
      endTime: b.bookingTimeEnd,
      status: b.status,

      totalAmount: b.totalAmount,
      paymentMethod: b.paymentMethod,
      paymentStatus: b.paymentStatus,

      customer: {
        id: b.customerId._id!,
        name: b.customerId.name,
        email: b.customerId.email,
        phone: b.customerId.phone,
        isVerified: b.customerId.isVerified,
        isActive: b.customerId.isActive,
      },

      shop: {
        id: b.shopId._id as string,
        shopName: b.shopId.shopName,
        email: b.shopId.email,
        phone: b.shopId.phone,
        city: b.shopId.city,
        state: b.shopId.state,
        profileImage: b.shopId.ProfileImage,
        isVerified: b.shopId.isVerified,
        workingDays:b.shopId.workingDays as []
      },

      service: {
        id: b.serviceId._id as string,
        name: b.serviceId.serviceName,
        price: b.serviceId.price,
        duration: b.serviceId.duration,
        image: b.serviceId.image,
      },

      address: b.customerAddressId
        ? {
            address: b.customerAddressId.address,
            city: b.customerAddressId.city,
            state: b.customerAddressId.state,
            country: b.customerAddressId.country,
            phone: b.customerAddressId.phone,
            coordinates: {
              lat: b.customerAddressId.coordinates.lat,
              lng: b.customerAddressId.coordinates.lng,
            },
            isDefault: b.customerAddressId.isDefaule,
          }
        : null,

      staff: b.staffId
        ? {
            id: b.staffId._id!,
            name: b.staffId.staffName,
            openingTime: b.staffId.openingTime,
            closingTime: b.staffId.closingTime,
            isActive: b.staffId.isActive,
          }
        : null,

      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
    };
  },

  toDtoList(list: IBookingPopulated[]): bookingDatasPopulatedDto[] {
    return list.map(this.toDto);
  },
};
