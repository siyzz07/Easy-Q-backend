"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAddressContorller = void 0;
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
class CustomerAddressContorller {
    constructor(addressServicd) {
        //---------------------------------------------------------------------get all address
        this.getAddress = async (req, res, next) => {
            try {
                const custoemrId = req.body.userId;
                const response = await this._addressService.getAddress(custoemrId);
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ message: messagesEnum_1.MessageEnum.ADDRESS_FETCH_SUCCESS, data: response });
            }
            catch (error) {
                next(error);
            }
        };
        //---------------------------------------------------------------------add address
        this.addNewAddresss = async (req, res, next) => {
            try {
                await this._addressService.addAddress(req.body);
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ message: messagesEnum_1.MessageEnum.ADDRESS_ADDED_SUCCESS });
            }
            catch (error) {
                next(error);
            }
        };
        //---------------------------------------------------------------------delete address
        this.deleteAddress = async (req, res, next) => {
            try {
                const response = await this._addressService.deletCustomerAddress(req.body.userId, req.body.addressId);
                if (response) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.ADDRESS_DELETED_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        //---------------------------------------------------------------------edit  address
        this.editAddress = async (req, res, next) => {
            try {
                const result = await this._addressService.editCustomerAddress(req.body);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.ADDRESS_EDIT_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        //--------------------------------------------------------------------- get each data
        this.eachAddressData = async (req, res, next) => {
            try {
                const { _id } = req.query;
                const result = await this._addressService.getEachAddress(req.body.userId, _id);
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ message: messagesEnum_1.MessageEnum.ADDRESS_FETCH_SUCCESS, data: result });
            }
            catch (error) {
                next(error);
            }
        };
        this._addressService = addressServicd;
    }
}
exports.CustomerAddressContorller = CustomerAddressContorller;
