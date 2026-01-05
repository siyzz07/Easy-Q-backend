"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
class VendorController {
    constructor(vendorService) {
        //---------------------------------------- add shop data (state ,city , location ,woring days ....)
        this.addShopData = async (req, res, next) => {
            try {
                const { userId, latitude, longitude, workingDays, ...data } = {
                    ...req.body,
                };
                const cordinates = {
                    lat: latitude,
                    lon: longitude,
                };
                await this._vendorShopService.addShopData(data, userId, cordinates, workingDays);
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ message: messagesEnum_1.MessageEnum.SHOP_DATA_ADDED_SUCCESS });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message == messagesEnum_1.MessageEnum.SHOP_DATA_ADDED_FAILED) {
                        res
                            .status(httpStatusCodeEnum_1.StatusCodeEnum.FORBIDDEN)
                            .json({ message: messagesEnum_1.MessageEnum.SHOP_DATA_ADDED_FAILED });
                    }
                    else {
                        res.status(httpStatusCodeEnum_1.StatusCodeEnum.FORBIDDEN).json({ message: error.message });
                    }
                }
                else {
                    console.log("shop data adding error");
                }
            }
        };
        //-----------------------------------------------------------------------get the shop data
        this.getShopData = async (req, res, next) => {
            try {
                const id = req.body.userId;
                const data = await this._vendorShopService.getShopData(id);
                res.status(httpStatusCodeEnum_1.StatusCodeEnum.OK).json({ data: data });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        };
        //----------------------------------------------------------------------- get the shop service type
        //----------------------------------------------------------------------- get the shop service type
        //----------------------------------------------------------------------- get the shop service type
        //----------------------------------------------------------------------- get the shop service type
        //----------------------------------------------------------------------- get the shop service type
        //----------------------------------------------------------------------- get the shop service type
        //----------------------------------------------------------------------- get the shop service type
        this.getShopServiceType = async (req, res, next) => {
            try {
                const result = await this._vendorShopService.getShopTypes();
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.SERVICE_FETCH_SUCCESS, data: result });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        };
        //----------------------------------------------------------------------- update vendor
        this.updateVendor = async (req, res, next) => {
            try {
                const { userId, workingDays, ...data } = { ...req.body };
                console.log(req.body);
                const result = await this._vendorShopService.updateVendor(userId, workingDays, data);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.VENDOR_DATA_UPDATION_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        //----------------------------------------------------------------------- dashboard
        this.vendorDashboard = async (req, res, next) => {
            try {
                const result = await this._vendorShopService.getDashboard(req.body.userId);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.SUCCEESS, data: result });
                }
            }
            catch (error) {
                throw error;
            }
        };
        //=========================================================
        this.geVendorsDatas = async (req, res, next) => {
            try {
                const data = await this._vendorShopService.getVendorsDatas();
                res.status(httpStatusCodeEnum_1.StatusCodeEnum.OK).json({
                    message: messagesEnum_1.MessageEnum.VENDOR__DATA_FETCH_SUCCESS,
                    data: data,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR)
                        .json({ message: messagesEnum_1.MessageEnum.SERVER_ERROR });
                }
                console.log(error);
            }
        };
        this.blockVendor = async (req, res, next) => {
            try {
                await this._vendorShopService.blockVendor(req.body.id);
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ messeage: messagesEnum_1.MessageEnum.VENDOR_DATA_UPDATION_SUCCESS });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        };
        this.getVendorsRequest = async (req, res, next) => {
            try {
                const result = await this._vendorShopService.getVendorsVerification();
                res.status(httpStatusCodeEnum_1.StatusCodeEnum.OK).json({
                    message: messagesEnum_1.MessageEnum.VENDOR__DATA_FETCH_SUCCESS,
                    data: result,
                });
            }
            catch (error) { }
        };
        this.rejectVendorRequest = async (req, res, next) => {
            try {
                const result = await this._vendorShopService.rejectVendorRequst(req.body.id);
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ message: messagesEnum_1.MessageEnum.VENDOR_DENIED });
            }
            catch (error) { }
        };
        this.acceptVendorRequest = async (req, res, next) => {
            try {
                const result = await this._vendorShopService.verifyVendorRequst(req.body.id);
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ message: messagesEnum_1.MessageEnum.VENDOR_VRIFIED });
            }
            catch (error) { }
        };
        //==================================================================
        this.getShopsData = async (req, res) => {
            try {
                const result = await this._vendorShopService.getVendorsData(req.query);
                res.status(httpStatusCodeEnum_1.StatusCodeEnum.OK).json({
                    success: true,
                    message: messagesEnum_1.MessageEnum.SHOP_DATA_FETCH_SUCCESS,
                    data: result.data,
                    pagination: result.pagination
                });
            }
            catch (error) {
                console.error("Error fetching shops:", error);
                if (error instanceof Error) {
                    res.status(httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        message: messagesEnum_1.MessageEnum.SHOP_DATA_ADDED_FAILED,
                        error: error.message,
                        data: [],
                    });
                }
                else {
                    res.status(httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        message: messagesEnum_1.MessageEnum.SERVER_ERROR,
                        data: [],
                    });
                }
            }
        };
        //--------------------------  add shopp images --------------------------
        this.addShopImages = async (req, res, next) => {
            try {
                const result = await this._vendorShopService.addShopImages(req.body);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.VENDOR_SHOP_IMAGE_ADDED_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        //--------------------------  remove shopp images --------------------------
        this.removeShopImage = async (req, res, next) => {
            try {
                const result = await this._vendorShopService.removeImage(req.body);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.VENDOR_SHOP_IMAGE_DELETED_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        this.shopDataEach = async (req, res) => {
            try {
                const id = req.params.id;
                const result = await this._vendorShopService.getEachVendorData(id);
                if (result) {
                    res.status(httpStatusCodeEnum_1.StatusCodeEnum.OK).json({
                        message: messagesEnum_1.MessageEnum.VENDOR__DATA_FETCH_SUCCESS,
                        data: result,
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message == messagesEnum_1.MessageEnum.VENDOR__DATA_FETCH_FAILED) {
                        res
                            .status(httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR)
                            .json({ message: error.message });
                    }
                    else {
                        res
                            .status(httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR)
                            .json({ message: error.message });
                    }
                }
            }
        };
        this._vendorShopService = vendorService;
    }
}
exports.default = VendorController;
