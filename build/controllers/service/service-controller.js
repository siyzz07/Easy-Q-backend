"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorServiceController = void 0;
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
class VendorServiceController {
    constructor(service) {
        // ------------------------------- add a new service of a vendor
        this.addNewService = async (req, res, next) => {
            try {
                const result = await this._Service.addNewService(req.body);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.VENDOR_SERVICE_ADD_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        // ------------------------------- get  services of the shop / DD
        this.getSerivces = async (req, res, next) => {
            try {
                const result = await this._Service.getAllService(req.body.userId);
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({
                    message: messagesEnum_1.MessageEnum.VENDOR_SERVICE_FETCH_SUCCESS,
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        };
        // ------------------------------- edit  services of a shop
        this.editService = async (req, res, next) => {
            try {
                const result = await this._Service.editService(req.body);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.VENDOR_SERVICE_EDIT_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        //------------------------- get shop services / DD
        this.getShopServices = async (req, res, next) => {
            try {
                const shopId = req.params.shopId;
                const result = await this._Service.getEachVendorServices(shopId);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.SERVICE_FETCH_SUCCESS, data: result });
                }
            }
            catch (error) {
                next(error);
            }
        };
        // ------------------------------- get selected response
        this.getSelectedService = async (req, res, next) => {
            try {
                const { id } = req.query;
                const reuslt = await this._Service.getSelectedSerivce(id);
                if (reuslt) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.SERVICE_FETCH_SUCCESS, data: reuslt });
                }
            }
            catch (error) {
                next(error);
            }
        };
        this._Service = service;
    }
}
exports.VendorServiceController = VendorServiceController;
