"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
const booking_mapper_1 = require("../../mappers/booking-mapper/booking-mapper");
class BookingController {
    constructor(bookingService) {
        /**
         *
         * add new booking
         *
         */
        this.addNewBooking = async (req, res, next) => {
            try {
                const result = await this._BookingService.addNewbooking(req.body);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.CREATED)
                        .json({ message: messagesEnum_1.MessageEnum.BOOKING_CREATED_SUCCESS, data: result });
                }
            }
            catch (error) {
                next(error);
            }
        };
        /**
         *
         *  check the time is available or not
         *
         */
        this.bookAvailableTime = async (req, res, next) => {
            try {
                const result = await this._BookingService.checkTimeAvailable(booking_mapper_1.checkTimeReqMapper.toDto(req.body));
                console.log(result);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ success: true, message: messagesEnum_1.MessageEnum.BOOKING_CREATED_SUCCESS, bookingId: result });
                }
                else {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ success: false, message: messagesEnum_1.MessageEnum.BOOKING_PREFFER_TIME_SLOT_NOT_AVAILABLE });
                }
            }
            catch (error) {
                next(error);
            }
        };
        /**
         *
         *  get bookings of the customer
         *
         */
        this.getCustomerBookings = async (req, res, next) => {
            try {
                const result = await this._BookingService.customerBooking(req.body.userId);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ success: true, message: messagesEnum_1.MessageEnum.BOOKING_DATA_FETCH_SUCCESS, data: result });
                }
            }
            catch (error) {
                next();
            }
        };
        /**
         *
         *  get selected booking data
         *
         */
        this.getSelectedBookingData = async (req, res, next) => {
            const id = req.params.id;
            const result = await this._BookingService.selectedBookingData(id);
            if (result) {
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ success: true, message: messagesEnum_1.MessageEnum.BOOKING_DATA_FETCH_FAILED, data: result });
            }
        };
        this._BookingService = bookingService;
    }
}
exports.BookingController = BookingController;
