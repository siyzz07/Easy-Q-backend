"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const messagesEnum_1 = require("../../enums/messagesEnum");
const hash_1 = require("../../utils/hash");
const errorResponse_1 = require("../../utils/errorResponse");
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const logger_1 = __importDefault(require("../../utils/logger"));
class CustomerService {
    constructor(customerRepo) {
        //----------------------------------------get customer data
        this.getCustomerData = async (id) => {
            const response = await this._customerRepository.customerDataById(id);
            if (response) {
                return response;
            }
            else {
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.CUSTOMER_DATA_FETCH_FAILED, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
            }
        };
        //----------------------------------------edit profile
        this.editProfile = async (data) => {
            const result = await this._customerRepository.editProfile(data);
            if (result) {
                return true;
            }
            else {
                logger_1.default.error('failed to edit customer profile ');
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.SERVER_ERROR, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
            }
        };
        //----------------------------------------reset password in profile
        this.updatePasswordInProfile = async (data) => {
            const { userId, password, currentPassword } = data;
            const customer = await this._customerRepository.customerDataById(userId);
            if (!customer) {
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.CUSTOMER_NOT_FOUND, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
            }
            const customerPassword = customer.password;
            const checkCorrectPassword = await (0, hash_1.comparePassword)(currentPassword, customerPassword);
            if (!checkCorrectPassword) {
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.INVALID_PASSWORD, httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST);
            }
            const hashedPassword = await (0, hash_1.hashPassword)(password);
            await this._customerRepository.resetPassword(customer.email, hashedPassword);
            return true;
        };
        //=======================================================================
        //---------------------------------------- get all cutomer data
        this.getCustomersDatas = async () => {
            const result = await this._customerRepository.getCusomersData();
            return result;
        };
        //---------------------------------------- block customer by admin
        this.blockCustomer = async (customerId) => {
            const result = await this._customerRepository.blockCustomer(customerId);
            return result;
        };
        this._customerRepository = customerRepo;
    }
}
exports.CustomerService = CustomerService;
