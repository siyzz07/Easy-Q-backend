"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffController = void 0;
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
class StaffController {
    constructor(staffService) {
        //----------------------------------------------- add new Staff
        this.addStaff = async (req, res, next) => {
            try {
                const { userId, ...data } = { ...req.body };
                console.log("---------------------------0", req.body);
                const result = await this._StaffServices.addNewStaff(userId, data);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.STAFF_ADD_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        //----------------------------------------------- get all staff data
        this.getStaffsController = async (req, res, next) => {
            try {
                const result = await this._StaffServices.getStaffService(req.body.userId);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.STAFF_FETCH_SUCCESS, data: result });
                }
                else {
                    throw new Error(messagesEnum_1.MessageEnum.STAFF_FETCH_FAILED);
                }
            }
            catch (error) {
                next(error);
            }
        };
        //----------------------------------------------- edit the staff data 
        this.editStaff = async (req, res, next) => {
            try {
                const result = await this._StaffServices.editStaff(req.body);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.STAFF_UPDATE_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        //----------------------------------------------- edit blokc Staff dates
        this.staffBlockedDate = async (req, res, next) => {
            try {
                const result = await this._StaffServices.editStaffBlockDate(req.body);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.STAFF_UPDATE_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        this._StaffServices = staffService;
    }
}
exports.StaffController = StaffController;
