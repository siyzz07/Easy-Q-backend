"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorServiceService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messagesEnum_1 = require("../../enums/messagesEnum");
const errorResponse_1 = require("../../utils/errorResponse");
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const logger_1 = __importDefault(require("../../utils/logger"));
class VendorServiceService {
    constructor(serviceRepository) {
        //-----------------------------------------------------------------------add new service for the shop
        this.addNewService = async (data) => {
            const id = data.userId;
            const serviceData = {
                serviceName: data.serviceName,
                shopId: new mongoose_1.default.Types.ObjectId(id),
                duration: data.duration,
                description: data.description,
                price: data.price,
                image: data.image,
                isActive: true,
                availableStaff: data.availableStaff,
            };
            const result = await this._ServiceRpository.addService(serviceData);
            if (result) {
                return true;
            }
            else {
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_SERVICE_ADD_FAILD, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
            }
        };
        //-----------------------------------------------------------------------get services of the shop /DD
        this.getAllService = async (shopId) => {
            const result = await this._ServiceRpository.getService(shopId);
            return result;
        };
        //-----------------------------------------------------------------------edit services of the shop
        this.editService = async (data) => {
            const { _id, userId, ...payload } = { ...data };
            const result = await this._ServiceRpository.editService(_id, payload);
            if (result) {
                return true;
            }
        };
        //-----------------------------------------------------------------------get selected service
        this.getSelectedSerivce = async (_id) => {
            const result = await this._ServiceRpository.getSelectedService(_id);
            if (result) {
                return result;
            }
            else {
                logger_1.default.error('error to fetch the service');
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.SERVICE_FETCH_FAILED, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
            }
        };
        //==========================================================
        //-------------------------------------DD
        this.getEachVendorServices = async (data) => {
            const result = await this._ServiceRpository.getEachvendorServices(data);
            return result;
        };
        this._ServiceRpository = serviceRepository;
    }
}
exports.VendorServiceService = VendorServiceService;
