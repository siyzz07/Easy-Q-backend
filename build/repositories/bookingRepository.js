"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const bookingModel_1 = require("../models/bookingModel");
const baseRepository_1 = __importDefault(require("./baseRepository"));
class BookingRepository extends baseRepository_1.default {
    constructor() {
        super(bookingModel_1.BookingModel);
        this._BookingModal = bookingModel_1.BookingModel;
    }
    //----------------------------------- add new booking
    async addNewBooking(data) {
        const result = await this.create(data);
        return result;
    }
    //----------------------------------- get booked data based on condition
    async getBookedDatasByCondition(data) {
        const result = await this.findManyByCondition(data);
        return result;
    }
    //----------------------------------- get each booking data by id
    async getEachBookingDataById(_id) {
        const result = await this.findById(_id);
        return result;
    }
    //----------------------------------- update booking
    async updateBooking(id, data) {
        const result = await this.update(id, data);
        return result;
    }
    //----------------------------------- get populated data
    async bookingDatas(data) {
        const result = await this._BookingModal.find(data).populate('customerId').populate('shopId').populate('serviceId').populate('customerAddressId').populate('staffId');
        return result;
    }
}
exports.BookingRepository = BookingRepository;
