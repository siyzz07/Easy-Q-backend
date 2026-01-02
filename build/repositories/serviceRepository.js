"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRepository = void 0;
const ServiceModel_1 = __importDefault(require("../models/ServiceModel"));
const baseRepository_1 = __importDefault(require("./baseRepository"));
class ServiceRepository extends baseRepository_1.default {
    constructor() {
        super(ServiceModel_1.default);
        this._ServiceModel = ServiceModel_1.default;
    }
    //-------------------------------------------------------- add new Serivce
    async addService(data) {
        const result = await this.create(data);
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    //-------------------------------------------------------- get all Serivce
    async getService(shopId) {
        const result = await this.findManyByCondition({ shopId: shopId });
        return result;
    }
    //-------------------------------------------------------- edit service
    async editService(_id, data) {
        const result = await this.update(_id, data);
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    //-------------------------------------------------------- get selected service
    getSelectedService(_id) {
        const result = this.findById(_id);
        return result;
    }
    //===================================================
    async getEachvendorServices(_shopId) {
        const result = await this._ServiceModel
            .find({ shopId: _shopId })
            .populate('availableStaff')
            .lean();
        return result;
    }
    async getServiceData(shopId) {
        const result = await this._ServiceModel.find({ shopId }).lean();
        return result;
    }
}
exports.ServiceRepository = ServiceRepository;
