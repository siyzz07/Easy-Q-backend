"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationServiceInstance = exports.BookingControllerInstance = void 0;
const booking_controller_1 = require("../controllers/booking/booking-controller");
const booking_service_1 = require("../services/common-services/booking-service");
const notificaion_service_1 = require("../services/common-services/notificaion-service");
const repositories_1 = require("./repositories");
// ------------------ Notificaton di
const notificationServiceInstance = new notificaion_service_1.NotificationService(repositories_1.notificationRepository);
exports.notificationServiceInstance = notificationServiceInstance;
// ------------------ booking di
const bookingServiceInstance = new booking_service_1.BookingService(repositories_1.bookingRepository, repositories_1.serviceRepository, repositories_1.staffRepository, notificationServiceInstance);
const BookingControllerInstance = new booking_controller_1.BookingController(bookingServiceInstance);
exports.BookingControllerInstance = BookingControllerInstance;
