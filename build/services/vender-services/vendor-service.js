"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messagesEnum_1 = require("../../enums/messagesEnum");
const errorResponse_1 = require("../../utils/errorResponse");
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const logger_1 = __importDefault(require("../../utils/logger"));
const cloudinary_1 = require("../../utils/cloudinary");
class VendorService {
    constructor(vendorRepo, staffRepo, serviceTypes, serviceRepo) {
        //----------------------------------------- add shop extra data
        this.addShopData = async (data, vendorId, cordinates, workingDays) => {
            try {
                const days = workingDays.split(',');
                const updateData = {
                    ...data,
                    workingDays: days,
                    cordinates,
                    hasShop: true
                };
                const vendorData = await this._vendorRepo.vendorDatabyId(vendorId);
                if (vendorData) {
                    const response = await this._vendorRepo.findByIdAndUpdate(vendorId, updateData);
                    if (!response) {
                        throw new Error(messagesEnum_1.MessageEnum.SHOP_DATA_ADDED_FAILED);
                    }
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message == messagesEnum_1.MessageEnum.SHOP_DATA_ADDED_FAILED) {
                        throw error;
                    }
                    else {
                        console.log("server error for adding show data");
                    }
                }
                else {
                    console.log("server error for adding show data");
                }
            }
        };
        //----------------------------------------- add shop data
        this.getShopData = async (id) => {
            const data = await this._vendorRepo.vendorDatabyId(id);
            return data;
        };
        //----------------------------------------- add shop extra data
        this.getShopTypes = async () => {
            const data = await this._serviceTypesRepo.vendorTypeData();
            if (data) {
                return data;
            }
            else {
                return [];
            }
        };
        //----------------------------------------- vendor dashboard
        this.getDashboard = async (data) => {
            const shopId = data;
            const staffData = await this._staffRepo.getStaffData(shopId);
            const serviceData = await this._serviceRepo.getServiceData(shopId);
            const totalStaff = staffData.length;
            const availableStaff = staffData.reduce((acc, data) => {
                if (data.isActive) {
                    acc += 1;
                }
                return acc;
            }, 0);
            const totalUnavailableStaff = staffData.reduce((acc, data) => {
                if (!data.isActive) {
                    acc += 1;
                }
                return acc;
            }, 0);
            const totalService = serviceData.length;
            const totalAvailableService = serviceData.reduce((acc, data) => {
                if (data.isActive) {
                    acc += 1;
                }
                return acc;
            }, 0);
            const totalUnavailableService = serviceData.reduce((acc, data) => {
                if (!data.isActive) {
                    acc += 1;
                }
                return acc;
            }, 0);
            return { totalStaff, availableStaff, totalUnavailableStaff, totalService, totalAvailableService, totalUnavailableService };
        };
        //----------------------------------------- update vendor
        this.updateVendor = async (_id, workingDays, data) => {
            const days = workingDays.split(',');
            const updateData = {
                ...data,
                workingDays: days,
            };
            const result = await this._vendorRepo.findByIdAndUpdate(_id, updateData);
            if (result) {
                return true;
            }
            else {
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_DATA_UPDATION_FAILED, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
            }
        };
        //===============================================================
        this.verifyVendorRequst = async (_id) => {
            const result = await this._vendorRepo.verifyVendor(_id);
            return result;
        };
        this.rejectVendorRequst = async (_id) => {
            const result = await this._vendorRepo.rejectVendor(_id);
            return result;
        };
        this.getVendorsVerification = async () => {
            const result = await this.getVendorsDatas();
            if (result) {
                const data = result.filter((value) => value.isVerified == "pending");
                return data;
            }
            else {
                return [];
            }
        };
        this.getVendorsDatas = async () => {
            const result = await this._vendorRepo.getVendorData();
            return result;
        };
        this.blockVendor = async (customerId) => {
            const result = await this._vendorRepo.blockVendor(customerId);
            return result;
        };
        this.getEachVendorData = async (data) => {
            console.log(data);
            const result = await this._vendorRepo.getEachVendorData(data);
            if (result) {
                return result;
            }
            else {
                throw new Error(messagesEnum_1.MessageEnum.VENDOR__DATA_FETCH_FAILED);
            }
        };
        this.getVendorsData = async (data) => {
            const response = await this._vendorRepo.vendorsDataWithPagination(data);
            if (response) {
                logger_1.default.info('vendor data fetch successfully');
            }
            else {
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR__DATA_FETCH_FAILED, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
            }
            const activeShops = (response.data || []).filter((shop) => shop.hasShop == true);
            return { data: activeShops, pagination: response.pagination };
        };
        //---------------------------- add shop image
        this.addShopImages = async (datas) => {
            const { userId, data } = datas;
            const result = await this._vendorRepo.addImage(userId, data);
            if (result) {
                logger_1.default.info('shop image added success');
                return true;
            }
            else {
                logger_1.default.error('shop image adding failed');
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.SERVER_ERROR, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
            }
        };
        //---------------------------- remove shop image
        this.removeImage = async (data) => {
            const { publicId, image_id, userId } = data;
            const result = await (0, cloudinary_1.deleteCloudinaryImage)(publicId);
            if (result) {
                const response = await this._vendorRepo.deleteShopImage(userId, image_id);
                if (response) {
                    logger_1.default.info('image deleted successfull');
                    return true;
                }
                logger_1.default.error('error to remove shop image');
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_SHOP_IMAGE_DELETED_FAILED, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
            }
            else {
                logger_1.default.error('error to remove shop image');
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_SHOP_IMAGE_DELETED_FAILED, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
            }
        };
        this._vendorRepo = vendorRepo;
        this._staffRepo = staffRepo;
        this._serviceTypesRepo = serviceTypes;
        this._serviceRepo = serviceRepo;
    }
}
exports.default = VendorService;
