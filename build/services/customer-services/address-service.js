"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAddressService = void 0;
const messagesEnum_1 = require("../../enums/messagesEnum");
const errorResponse_1 = require("../../utils/errorResponse");
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const logger_1 = __importDefault(require("../../utils/logger"));
class CustomerAddressService {
    constructor(addressRepository) {
        /**
         *
         *
         */
        //--------------------------------------------------------------add customer address
        this.addAddress = async (data) => {
            const { userId, ...payload } = { ...data };
            if (userId) {
                const exist = await this._addressRepository.checkUserAddressExist(userId);
                if (exist) {
                    payload.address = payload.address.toLocaleLowerCase();
                    const addressExist = await this._addressRepository.checkAddressDuplicat(userId, payload.address);
                    if (addressExist) {
                        throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.ADDRESS_EXISTS, httpStatusCodeEnum_1.StatusCodeEnum.CONFLICT);
                    }
                    else {
                        await this._addressRepository.addAddress(userId, payload);
                    }
                    return;
                }
                else {
                    await this._addressRepository.addFirstAddress(userId, payload);
                    return;
                }
            }
        };
        /**
         *
         *
         */
        //--------------------------------------------------------------get customer address
        this.getAddress = async (customerId) => {
            const exist = await this._addressRepository.checkUserAddressExist(customerId);
            if (!exist) {
                return [];
            }
            else {
                const address = await this._addressRepository.getAllAddress(customerId);
                if (address) {
                    return address?.address;
                }
                else {
                    return [];
                }
            }
        };
        /**
         *
         *
         */
        //--------------------------------------------------------------get customer address
        this.deletCustomerAddress = async (custoemrId, id) => {
            const response = await this._addressRepository.deletCustomerAddress(custoemrId, id);
            if (response) {
                return messagesEnum_1.MessageEnum.ADDRESS_DELETED_SUCCESS;
            }
            else {
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.ADDRESS_DELETED_FAILED, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
            }
        };
        /**
         *
         *
         */
        //--------------------------------------------------------------edit customer address
        this.editCustomerAddress = async (data) => {
            let userId;
            if (data.userId) {
                userId = data.userId;
                const { _id, ...payload } = { ...data };
                payload.address = payload.address.toLocaleLowerCase();
                const existCheck = await this._addressRepository.checkAddressDuplicat(userId, payload.address, _id);
                if (existCheck) {
                    throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.ADDRESS_EXISTS, httpStatusCodeEnum_1.StatusCodeEnum.CONFLICT);
                }
                else {
                    if (_id) {
                        const result = await this._addressRepository.editCustomerAddress(userId, _id, payload);
                        if (result) {
                            return true;
                        }
                        else {
                            throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.ADDRESS_UPDATED_FAILED, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
                        }
                    }
                }
            }
        };
        //--------------------------------------------------------------get Each address
        this.getEachAddress = async (customerId, addressId) => {
            const result = await this._addressRepository.getAllAddress(customerId);
            if (!result) {
                logger_1.default.error("error to fetch selected address");
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.ADDRESS_NOT_FOUND, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
            }
            const address = result?.address?.find((addr) => addr._id?.toString() === addressId);
            if (!address) {
                logger_1.default.error("error to fetch selected address");
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.ADDRESS_NOT_FOUND, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
            }
            return address;
        };
        this._addressRepository = addressRepository;
    }
}
exports.CustomerAddressService = CustomerAddressService;
