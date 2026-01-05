"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authTokenVerify_1 = require("../middlewares/authTokenVerify");
const customerBlockAuth_1 = require("../middlewares/customerBlockAuth");
const commonDi_1 = require("../di/commonDi");
const bookingRoute = express_1.default.Router();
bookingRoute.post('/add-booking', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendorOrCustomer, customerBlockAuth_1.customerBlockAuth, commonDi_1.BookingControllerInstance.addNewBooking);
bookingRoute.post('/check-time', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendorOrCustomer, customerBlockAuth_1.customerBlockAuth, commonDi_1.BookingControllerInstance.bookAvailableTime);
bookingRoute.get('/customer', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendorOrCustomer, customerBlockAuth_1.customerBlockAuth, commonDi_1.BookingControllerInstance.getCustomerBookings);
bookingRoute.get('/:id', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendorOrCustomer, customerBlockAuth_1.customerBlockAuth, commonDi_1.BookingControllerInstance.getSelectedBookingData);
exports.default = bookingRoute;
