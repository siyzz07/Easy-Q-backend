"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRepository = void 0;
const ServiceModel_1 = __importDefault(require("../models/ServiceModel"));
const ServiceTypesModel_1 = __importDefault(require("../models/ServiceTypesModel"));
const staffModel_1 = __importDefault(require("../models/staffModel"));
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
const baseRepository_1 = __importDefault(require("./baseRepository"));
class VendorRepository extends baseRepository_1.default {
    constructor() {
        super(vendorModel_1.default);
        this._vendorModel = vendorModel_1.default;
        this._ServiceTypeModel = ServiceTypesModel_1.default;
        this._Service = ServiceModel_1.default;
        this._Staff = staffModel_1.default;
    }
    //--------------- add new vendor
    async addNewVendor(data) {
        const vendor = await this.create(data);
        return !!vendor;
    }
    //--------------- check vendro exitst
    async checkVendorExist(email) {
        const vendor = await this.findByEmail(email);
        return !!vendor;
    }
    //--------------- get vendor data
    async vendorData(email) {
        const vendor = this.findByEmail(email);
        return vendor;
    }
    //--------------- get vendor data by id
    async vendorDatabyId(id) {
        const vendor = this.findById(id);
        return vendor;
    }
    //--------------- find and update
    async findByIdAndUpdate(id, data) {
        const vendor = await vendorModel_1.default.findByIdAndUpdate(id, { $set: data }, { new: true });
        return vendor;
    }
    //------------------------------------------ reset password
    async resetPassword(email, hashedPassword) {
        await this.updatePassword(email, hashedPassword);
        return;
    }
    //------------------------------------------ delete vendor
    async deleteVendor(email) {
        await this._vendorModel.deleteOne({ email });
        return null;
    }
    //========================================================
    async rejectVendor(_id) {
        const update = await this._vendorModel
            .findByIdAndUpdate(_id, { $set: { isVerified: "rejected" } }, { new: true })
            .lean();
        return !!update;
    }
    async verifyVendor(_id) {
        const update = await this._vendorModel
            .findByIdAndUpdate(_id, { $set: { isVerified: "verified" } }, { new: true })
            .lean();
        return !!update;
    }
    async blockVendor(_id) {
        const updated = await this._vendorModel
            .findByIdAndUpdate(_id, [{ $set: { isActive: { $not: "$isActive" } } }], {
            new: true,
        })
            .lean();
        return !!updated;
    }
    async getVendorData() {
        const result = await this._vendorModel.find().lean();
        if (result) {
            return result;
        }
        else {
            return [];
        }
    }
    async getVendorsData() {
        const vendorData = await this._vendorModel.find({ isActive: true }).lean();
        return vendorData;
    }
    async getEachVendorData(_id) {
        const result = await this._vendorModel.findById(_id).populate("shopType");
        return result;
    }
    // ----------------------- add vendor shop image
    async addImage(_id, image) {
        const result = await this._vendorModel.findByIdAndUpdate(_id, { $push: { images: image } }, { new: true });
        return !!result;
    }
    // ----------------------- delete vendor shop image
    async deleteShopImage(_id, imageId) {
        const result = await this._vendorModel.findByIdAndUpdate(_id, { $pull: { images: { _id: imageId } } }, { new: true });
        return !!result;
    }
    //------------------------- get all vendor dat with pagination
    async vendorsDataWithPagination(data) {
        const filter = {};
        if (data.search?.trim() || data.location?.trim()) {
            filter.$or = [];
            if (data.search?.trim()) {
                filter.$or.push({
                    shopName: { $regex: data.search, $options: "i" },
                });
            }
            if (data.location?.trim()) {
                filter.$or.push({
                    city: { $regex: data.location, $options: "i" },
                });
            }
        }
        const options = {
            page: Number(data.page) || 1,
            limit: Number(data.limit) || 10,
            sort: { _id: -1 },
        };
        const response = await this.filterWithPagination(options, filter);
        return response;
    }
}
exports.VendorRepository = VendorRepository;
