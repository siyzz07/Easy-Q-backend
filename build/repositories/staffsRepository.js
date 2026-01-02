"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffRepository = void 0;
const staffModel_1 = __importDefault(require("../models/staffModel"));
const baseRepository_1 = __importDefault(require("./baseRepository"));
class StaffRepository extends baseRepository_1.default {
    constructor() {
        super(staffModel_1.default);
        this._StaffModel = staffModel_1.default;
    }
    //-----------------------------------------------------add new staff
    async addStaff(data) {
        const result = await this.create(data);
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    //-----------------------------------------------------get the shop staffs
    async getStaff(shopId) {
        let query;
        query = {
            shopId: shopId,
        };
        const result = await this.findManyByCondition(query);
        if (result) {
            console.log(result);
            return result;
        }
        else {
            return [];
        }
    }
    //-----------------------------------------------------get single staff data
    async getSingleStaff(shopId, staffName, staffId) {
        const query = { shopId };
        if (staffName)
            query.staffName = staffName;
        if (staffId)
            query.staffId = staffId;
        const result = await this.findOneByCondiition(query);
        return result;
    }
    //-----------------------------------------------------find the duplicate of the staff
    async duplicateStaffFind(shopId, staffName, staffId) {
        const query = { shopId, staffName };
        if (staffId) {
            query._id = { $ne: staffId };
        }
        const result = await this._StaffModel.find(query);
        return result;
    }
    //-----------------------------------------------------edit Staff
    async editStaff(shopId, _id, data) {
        const result = await this._StaffModel.findOneAndUpdate({ _id }, { $set: data }, { new: true });
        return !!result;
    }
    //-----------------------------------------------------edit Staff
    async getStaffById(id) {
        const result = await this.findById(id);
        return result;
    }
    async updateStaff(id, data) {
        const result = await this.update(id, data);
        return result;
    }
    async getStaffData(shopId) {
        const result = await this._StaffModel.find({ shopId }).lean();
        return result;
    }
}
exports.StaffRepository = StaffRepository;
