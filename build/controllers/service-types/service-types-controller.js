"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTypeController = void 0;
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
class ServiceTypeController {
    constructor(serviceTypes) {
        //--------------------------------------------------------------------------add new service type controller
        this.addServiceType = async (req, res, next) => {
            try {
                const result = await this._ServiceTypeService.addServiceType(req.body);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.SERVICE_ADD_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        //-------------------------------------------------------------------------- get services
        this.getServiceTypes = async (req, res) => {
            try {
                const result = await this._ServiceTypeService.getServices();
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ message: messagesEnum_1.MessageEnum.SERVICE_FETCH_SUCCESS, data: result });
            }
            catch (error) {
                if (error instanceof Error) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR)
                        .json({ message: messagesEnum_1.MessageEnum.SERVER_ERROR });
                }
            }
        };
        //--------------------------------------------------------------------------edit services
        this.editServiceType = async (req, res) => {
            try {
                console.log(req.body);
                const result = await this._ServiceTypeService.editServiceType(req.body);
                console.log('ppp', result);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.SERVICE_EDIT_SUCCESS });
                }
            }
            catch (error) {
            }
        };
        this._ServiceTypeService = serviceTypes;
    }
}
exports.ServiceTypeController = ServiceTypeController;
