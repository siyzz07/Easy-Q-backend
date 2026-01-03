"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTypesService = void 0;
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
const errorResponse_1 = require("../../utils/errorResponse");
class ServiceTypesService {
    constructor(serviceTypeRepo) {
        //--------------------------------------------------------- add new service type
        this.addServiceType = async (data) => {
            const { serviceName, description } = data;
            const result = await this._ServiceTypeRepository.addServiceType({
                serviceName,
                description,
                isActive: true,
            });
            if (result) {
                return true;
            }
            else {
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.SERVICE_ADD_FAILD, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
            }
        };
        //--------------------------------------------------------- get service types
        this.getServices = async () => {
            const result = await this._ServiceTypeRepository.getServices();
            return result;
        };
        //--------------------------------------------------------- update service types
        this.editServiceType = async (data) => {
            const _id = data._id;
            const payload = {
                serviceName: data.serviceName,
                description: data.description,
            };
            const result = await this._ServiceTypeRepository.editServiceType(_id, payload);
            if (result) {
                return true;
            }
            throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.SERVER_ERROR, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
        };
        this._ServiceTypeRepository = serviceTypeRepo;
    }
}
exports.ServiceTypesService = ServiceTypesService;
