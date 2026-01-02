"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
const errorResponse_1 = require("../../utils/errorResponse");
const logger_1 = __importDefault(require("../../utils/logger"));
class StaffService {
    constructor(staffReopository) {
        // ---------------------------------- add new Staff
        this.addNewStaff = async (userId, data) => {
            const { staffName, openingTime, closingTime, breaks } = { ...data };
            const shopData = {
                shopId: userId,
                staffName,
                openingTime,
                closingTime,
                breaks,
                isActive: true,
                blockedDates: [],
            };
            const staffExist = await this._StaffRepository.getSingleStaff(userId, staffName);
            if (staffExist) {
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.STAFF_ALREADY_EXISTS, httpStatusCodeEnum_1.StatusCodeEnum.CONFLICT);
            }
            const result = await this._StaffRepository.addStaff(shopData);
            if (result) {
                return true;
            }
            else {
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.STAFF_ADD_FAILED, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
            }
        };
        // ---------------------------------- get staffs
        this.getStaffService = async (shopId) => {
            const data = await this._StaffRepository.getStaff(shopId);
            if (data) {
                return data;
            }
            else {
                return [];
            }
        };
        //  ---------------------------------- edit Staff
        this.editStaff = async (data) => {
            const { userId, _id, staffName, ...payload } = { ...data };
            console.log(payload);
            const exist = await this._StaffRepository.duplicateStaffFind(userId, staffName, _id);
            if (exist.length) {
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.STAFF_ALREADY_EXISTS, httpStatusCodeEnum_1.StatusCodeEnum.CONFLICT);
            }
            else {
                const values = {
                    ...payload,
                    staffName,
                };
                const result = await this._StaffRepository.editStaff(userId, _id, values);
                if (result) {
                    return result;
                }
                else {
                    return false;
                }
            }
        };
        //  ---------------------------------- edit staff bookin blok dates
        this.editStaffBlockDate = async (data) => {
            const { _id, blockedDates, userId } = data;
            const result = await this._StaffRepository.editStaff(userId, _id, { blockedDates });
            if (result) {
                return true;
            }
            else {
                logger_1.default.error('error to edit the staff booking blokc dates');
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.STAFF_UPDATE_FAILED, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
            }
        };
        this._StaffRepository = staffReopository;
    }
}
exports.StaffService = StaffService;
