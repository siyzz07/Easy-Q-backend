"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const errorResponse_1 = require("../../utils/errorResponse");
const messagesEnum_1 = require("../../enums/messagesEnum");
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const booking_mapper_1 = require("../../mappers/booking-mapper/booking-mapper");
const mongoose_1 = require("mongoose");
const logger_1 = __importDefault(require("../../utils/logger"));
const nanoid_1 = require("nanoid");
class BookingService {
    // private _Cache_service: ICacheService;
    constructor(bookingService, serviceRepository, staffRepository, notificationService) {
        // ------------------------------- add new  booking ----------------------
        this.addNewbooking = async (data) => {
            const { userId, paymentMethod, bookingId, totalAmount } = data;
            const existBooking = await this._BookingRepository.getEachBookingDataById(bookingId);
            if (!existBooking) {
            }
            else {
                const query = {
                    paymentMethod,
                    paymentStatus: 'pending',
                    expireAt: null
                };
                const result = await this._BookingRepository.updateBooking(bookingId, query);
                if (result) {
                    void this._NotificationSerivce.sendBookingNotificationToVendor(result);
                    void this._NotificationSerivce.sendBookingNotificationToCustomer(result);
                    return booking_mapper_1.BookingMapper.toDTO(result);
                }
                else {
                }
            }
        };
        // ------------------------------- check the prifered time is available ----------------------
        this.checkTimeAvailable = async (data) => {
            const { staffId, timePreffer, date, serviceId, customerId, addressId, shopId, } = data;
            const staffData = await this._StaffRepository.getStaffById(staffId);
            const serviceData = await this._ServiceRepository.getSelectedService(serviceId);
            const serviceDuration = Number(serviceData.duration);
            const bookingDateKey = new Date(date).toLocaleDateString("en-CA");
            const bookedDatas = await this._BookingRepository.getBookedDatasByCondition({ staffId: staffId, bookingDate: bookingDateKey });
            const availableTime = await this.sortAndFindAvailableTime(bookedDatas, staffData, serviceDuration, timePreffer);
            if (!availableTime) {
                logger_1.default.warn("time not available on the preffered time gap");
                return false;
            }
            const TTL = this.calculateTTL(bookingDateKey, availableTime.startTime);
            const bookingData = {
                bookingId: `Bk-${(0, nanoid_1.nanoid)(10)}`,
                customerId: new mongoose_1.Types.ObjectId(customerId),
                shopId: new mongoose_1.Types.ObjectId(shopId),
                serviceId: new mongoose_1.Types.ObjectId(serviceId),
                customerAddressId: new mongoose_1.Types.ObjectId(addressId),
                staffId: new mongoose_1.Types.ObjectId(staffId),
                bookingDate: bookingDateKey,
                bookingTimeStart: availableTime.startTime,
                bookingTimeEnd: availableTime.endTime,
                totalAmount: serviceData.price,
                status: "pending",
                paymentStatus: "pending",
                expireAt: new Date(Date.now() + TTL * 60 * 1000)
            };
            console.log('one');
            const result = await this._BookingRepository.addNewBooking(bookingData);
            if (result) {
                console.log('two');
                return result._id;
            }
            return false;
        };
        /**
         *
         *
         * get customer boking data
         *
         */
        this.customerBooking = async (userId) => {
            const bookingData = await this._BookingRepository.bookingDatas({ customerId: userId });
            if (bookingData) {
                logger_1.default.info(messagesEnum_1.MessageEnum.BOOKING_DATA_FETCH_SUCCESS);
            }
            else {
                logger_1.default.error(messagesEnum_1.MessageEnum.BOOKING_DATA_FETCH_FAILED);
            }
            return bookingData;
        };
        /**
         *
         *  get selected booking data
         *
         */
        this.selectedBookingData = async (id) => {
            const bookingData = await this._BookingRepository.bookingDatas({ _id: id });
            if (bookingData) {
                return bookingData;
            }
            else {
                logger_1.default.error('invalied booking Id');
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.BOOKING_ID_INVALIED, httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST);
            }
        };
        this._BookingRepository = bookingService;
        this._ServiceRepository = serviceRepository;
        this._StaffRepository = staffRepository;
        this._NotificationSerivce = notificationService;
        // this._Cache_service = cacheService;
    }
    /**
     * Sort an array  times in ascending order
     */
    sortTimes(times) {
        return times.sort((a, b) => a.start.localeCompare(b.start));
    }
    /**
     * check there is time betwee the time preioud
     */
    diffMinutes(start, end) {
        const [sh, sm] = start.split(":").map(Number);
        const [eh, em] = end.split(":").map(Number);
        const startMinutes = sh * 60 + sm;
        const endMinutes = eh * 60 + em;
        return endMinutes - startMinutes;
    }
    /**
     * booking  expire time calculaion
     */
    calculateTTL(bookingDate, bookingTime) {
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
    async sortAndFindAvailableTime(bookedDatas, staffData, serviceDuration, prefferTime) {
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
        const availableTime = await this.findAvailabletime(staffBookingsSroted, serviceDuration, prefferTime);
        if (availableTime) {
            return availableTime;
        }
        else {
            return false;
        }
    }
    /**
     * add booking to the cache
     */
    async findAvailabletime(timeLine, serviceDuration, preferredTime) {
        const indexes = [];
        function add(index) {
            indexes.push(index);
            if (indexes.length > 2)
                indexes.shift();
        }
        timeLine.some((item, index) => {
            if (item.type === "checkpoint")
                add(index);
            return item.start === preferredTime;
        });
        if (indexes.length < 2)
            return false;
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
    findEndTime(time, minutes) {
        const date = new Date(`2000-01-01T${time}:00`);
        date.setMinutes(date.getMinutes() + minutes);
        return date.toTimeString().slice(0, 5);
    }
}
exports.BookingService = BookingService;
