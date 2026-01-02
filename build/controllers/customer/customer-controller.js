"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
const logger_1 = __importDefault(require("../../utils/logger"));
class CustomerController {
    constructor(customerservice) {
        //-------------------------------------get customer data
        this.getCustomerData = async (req, res, next) => {
            try {
                const id = req.body.userId;
                const response = await this._customerService.getCustomerData(id);
                if (response) {
                    res.status(httpStatusCodeEnum_1.StatusCodeEnum.OK).json({
                        message: messagesEnum_1.MessageEnum.CUSTOMER_DATA_FETCH_SUCCESS,
                        data: response,
                    });
                }
            }
            catch (error) {
                next(error);
            }
        };
        //------------------------------------- upadte profile
        this.editProfile = async (req, res, next) => {
            try {
                const data = req.body;
                const result = await this._customerService.editProfile(data);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.CUSTOMER_PROFILE_UPDATED });
                }
            }
            catch (error) {
                next(error);
                logger_1.default.error('"error to update customer profile"');
            }
        };
        //-------------------------------------chage password in profile
        this.changePassword = async (req, res, next) => {
            try {
                const result = await this._customerService.updatePasswordInProfile(req.body);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.PASSWROD_CAHNGE_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        //==================================================================
        //------------------------------------- get customer data
        this.getUserDatas = async (req, res, next) => {
            try {
                const data = await this._customerService.getCustomersDatas();
                res.status(httpStatusCodeEnum_1.StatusCodeEnum.OK).json({
                    message: messagesEnum_1.MessageEnum.CUSTOMER_ALL_DATA_FETCH_SUCCESS,
                    data: data,
                });
            }
            catch (error) {
                next(error);
            }
        };
        //------------------------------------- block customer
        this.blockCustomer = async (req, res, next) => {
            try {
                await this._customerService.blockCustomer(req.body.id);
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ messeage: messagesEnum_1.MessageEnum.CUSTOMER_DATA_UPDATION_SUCCESS });
            }
            catch (error) {
                next(error);
            }
        };
        this._customerService = customerservice;
    }
}
exports.CustomerController = CustomerController;
