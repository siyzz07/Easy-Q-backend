"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketNotificationHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
class socketNotificationHandler {
    /**
     *
     * booking notifiction  - Vendor
     */
    static bookingNotificationToVendor(io, userId, payload) {
        logger_1.default.info('notification sended to vendor');
        io.to(userId).emit("notification-booking:new", payload);
    }
    /**
    *
    * booking notifiction  - customer
    */
    static bookingNotificationToCustomer(io, userId, payload) {
        logger_1.default.info('notification sended to customer');
        console.log(userId);
        io.to(userId).emit('notification-booking:success', payload);
    }
}
exports.socketNotificationHandler = socketNotificationHandler;
