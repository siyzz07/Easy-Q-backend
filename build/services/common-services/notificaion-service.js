"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messagesEnum_1 = require("../../enums/messagesEnum");
const notificationHandler_1 = require("../../sockets/handlers/notificationHandler");
// import { ISocketManager, SocketManager } from "../../sockets/socketManager";
const socketInstance_1 = require("../../sockets/socketInstance");
class NotificationService {
    // private _SocketManager :ISocketManager
    constructor(notificationRepository) {
        /**
         *
         * Booking notificatoin ----  VENDOR
         *
         */
        this.sendBookingNotificationToVendor = async (data) => {
            const NotificationPayload = {
                recipient: new mongoose_1.default.Types.ObjectId(data.shopId),
                recipientType: "Vendor",
                category: "booking",
                type: "new_booking",
                title: messagesEnum_1.BookingMessageTitle.NEW_BOOKING_VENDOR,
                content: messagesEnum_1.BookingMessageContentLong.NEW_BOOKING_VENDOR,
                metaData: {
                    booking: {
                        id: data._id,
                        date: data.bookingDate,
                        time: data.bookingTimeStart,
                    },
                },
            };
            const SocketPayload = {
                title: messagesEnum_1.BookingMessageTitle.NEW_BOOKING_VENDOR,
                message: `${messagesEnum_1.BookingMessageContent.NEW_BOOKING_VENDOR} - ${data.bookingDate} - ${data.bookingTimeStart}`,
                type: 'booking',
                createdAt: new Date()
            };
            const result = await this._NotificationRepository.addNewNotification(NotificationPayload);
            await notificationHandler_1.socketNotificationHandler.bookingNotificationToVendor(socketInstance_1.socketManagerServer.getIo(), data.shopId.toString(), SocketPayload);
        };
        /**
        *
        * Booking notificatoin ----  CUSTOMER
        *
        */
        this.sendBookingNotificationToCustomer = async (data) => {
            const NotificationPayload = {
                recipient: new mongoose_1.default.Types.ObjectId(data.customerId),
                recipientType: "Customer",
                category: "booking",
                type: "booking_completed",
                title: messagesEnum_1.BookingMessageTitle.BOOKING_SUCCESS,
                content: messagesEnum_1.BookingMessageContentLong.BOOKING_CONFIRMED,
                metaData: {
                    booking: {
                        id: data._id,
                        date: data.bookingDate,
                        time: data.bookingTimeStart,
                    },
                },
            };
            const SocketPayload = {
                title: messagesEnum_1.BookingMessageTitle.BOOKING_SUCCESS,
                message: `${messagesEnum_1.BookingMessageContent.BOOKING_SUCCESS} - ${data.bookingDate} - ${data.bookingTimeStart}`,
                type: 'booking',
                createdAt: new Date()
            };
            const result = await this._NotificationRepository.addNewNotification(NotificationPayload);
            await notificationHandler_1.socketNotificationHandler.bookingNotificationToCustomer(socketInstance_1.socketManagerServer.getIo(), data.customerId.toString(), SocketPayload);
        };
        this._NotificationRepository = notificationRepository;
        //  this._SocketManager = socketManager;
    }
}
exports.NotificationService = NotificationService;
