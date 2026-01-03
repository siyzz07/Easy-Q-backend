"use strict";
// in this repo is for the services types that have given by amdin in each vendor and its for the types of the shop like what type of service they provide
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTypes = void 0;
const ServiceTypesModel_1 = __importDefault(require("../models/ServiceTypesModel"));
const baseRepository_1 = __importDefault(require("./baseRepository"));
class ServiceTypes extends baseRepository_1.default {
    constructor() {
        super(ServiceTypesModel_1.default);
        this._ServiceTypeModel = ServiceTypesModel_1.default;
    }
    //--------------------------------------------------------------- add new Service
    async addServiceType(data) {
        const addServiece = await this.create(data);
        if (addServiece) {
            return true;
        }
        else {
            return false;
        }
    }
    //---------------------------------------------------------------- get all service
    async getServices() {
        const result = await this.findAll();
        if (result) {
            return result;
        }
        else {
            return [];
        }
    }
    //---------------------------------------------------------------- edit  service
    async editServiceType(_id, data) {
        const result = await this.update(_id, data);
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    async vendorTypeData() {
        const result = await this._ServiceTypeModel.find();
        return result;
    }
}
exports.ServiceTypes = ServiceTypes;
