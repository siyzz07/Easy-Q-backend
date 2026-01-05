"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBookingPopulatedMapper = exports.checkTimeReqMapper = exports.BookingMapper = void 0;
exports.BookingMapper = {
    toDTO(booking) {
        return {
            id: booking._id.toString(),
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
exports.checkTimeReqMapper = {
    toDto(data) {
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
exports.toBookingPopulatedMapper = {
    toDto(b) {
        return {
            id: b._id,
            bookingId: b.bookingId,
            date: b.bookingDate,
            startTime: b.bookingTimeStart,
            endTime: b.bookingTimeEnd,
            status: b.status,
            totalAmount: b.totalAmount,
            paymentMethod: b.paymentMethod,
            paymentStatus: b.paymentStatus,
            customer: {
                id: b.customerId._id,
                name: b.customerId.name,
                email: b.customerId.email,
                phone: b.customerId.phone,
                isVerified: b.customerId.isVerified,
                isActive: b.customerId.isActive,
            },
            shop: {
                id: b.shopId._id,
                shopName: b.shopId.shopName,
                email: b.shopId.email,
                phone: b.shopId.phone,
                city: b.shopId.city,
                state: b.shopId.state,
                profileImage: b.shopId.ProfileImage,
                isVerified: b.shopId.isVerified,
            },
            service: {
                id: b.serviceId._id,
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
                    id: b.staffId._id,
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
    toDtoList(list) {
        return list.map(this.toDto);
    },
};
