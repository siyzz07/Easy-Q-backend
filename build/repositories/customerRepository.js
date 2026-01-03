"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const customerModel_1 = __importDefault(require("../models/customerModel"));
const baseRepository_1 = __importDefault(require("./baseRepository"));
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
const ServiceModel_1 = __importDefault(require("../models/ServiceModel"));
class CustomerRepository extends baseRepository_1.default {
    constructor() {
        super(customerModel_1.default);
        this._customerModel = customerModel_1.default;
        this._vendorModel = vendorModel_1.default;
        this._VendorServiceModel = ServiceModel_1.default;
    }
    //----------------------------- add new customer
    async addNewCustomer(data) {
        const response = await this.create(data);
        return !!response;
    }
    //-----------------------------check customer exist or not
    async checkCustomerExist(email) {
        const customerCheck = await this.findByEmail(email);
        return !!customerCheck;
    }
    //-----------------------------get customer data take by email
    async customerDataByEmail(email) {
        const customer = await this.findByEmail(email);
        return customer;
    }
    //-----------------------------get custemer data  take by id
    async customerDataById(id) {
        const customer = await this.findById(id);
        return customer;
    }
    //-----------------------------reset custoemr passwod
    async resetPassword(email, hashedPassword) {
        await this.updatePassword(email, hashedPassword);
        return;
    }
    //-----------------------------updata custome profile
    async editProfile(data) {
        const { userId, name, email, phone } = data;
        const result = await this._customerModel.findByIdAndUpdate(userId, {
            $set: { name, email, phone },
        }, { new: true });
        return !!result;
    }
    //========================================================================
    //----------------------------- get all customer data
    async getCusomersData() {
        const result = await this.findAll();
        if (result) {
            return result;
        }
        else {
            return [];
        }
    }
    //----------------------------- block customer
    async blockCustomer(_id) {
        const updated = await this._customerModel
            .findByIdAndUpdate(_id, [{ $set: { isActive: { $not: "$isActive" } } }], {
            new: true,
        })
            .lean();
        return !!updated;
    }
}
exports.CustomerRepository = CustomerRepository;
