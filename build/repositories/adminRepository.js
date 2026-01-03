"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const customerModel_1 = __importDefault(require("../models/customerModel"));
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
const baseRepository_1 = __importDefault(require("./baseRepository"));
class AdminRepository extends baseRepository_1.default {
    constructor() {
        super(adminModel_1.default);
        this._adminModel = adminModel_1.default;
        this._CustomerModel = customerModel_1.default;
        this._VendorModel = vendorModel_1.default;
    }
    //------------------------------------------------------- chech the admin exist or not
    async checkAdminExist(email) {
        const admin = await this.findByEmail(email);
        return !!admin;
    }
    //------------------------------------------------------- take amin data
    async adminDataByEmail(email) {
        const adminData = await this.findByEmail(email);
        return adminData;
    }
    async addAdmin(data) {
        await this.create(data);
    }
}
exports.AdminRepository = AdminRepository;
