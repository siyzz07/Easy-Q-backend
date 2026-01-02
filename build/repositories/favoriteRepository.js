"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteRepository = void 0;
const favoriteModel_1 = __importDefault(require("../models/favoriteModel"));
const baseRepository_1 = __importDefault(require("./baseRepository"));
class FavoriteRepository extends baseRepository_1.default {
    constructor() {
        super(favoriteModel_1.default);
        this._FavoriteModel = favoriteModel_1.default;
    }
    //--------------------------------------------------- Create a favorite document for a customer
    async createFavorite(data) {
        const result = await this.create(data);
        return result;
    }
    //--------------------------------------------------- Get favorite by customerId
    async getFavoriteByCustomerId(customerId) {
        const query = {
            customerId: customerId
        };
        const result = await this.findOneByCondiition(query);
        return result;
    }
    //------------------------------------------------------- Add vendor to favorites
    async addVendorToFavorite(customerId, shopId) {
        const result = await this._FavoriteModel.updateOne({ customerId }, { $addToSet: { vendors: shopId } });
        return result.modifiedCount > 0;
    }
    //-------------------------------------------------------Remove vendor from favorites
    async removeVendorFromFavorite(customerId, vendorId) {
        const result = await this._FavoriteModel.updateOne({ customerId }, { $pull: { vendors: vendorId } });
        return result.modifiedCount > 0;
    }
    //-------------------------------------------------------get favorite shopes
    async getFavoreiteShopes(customerId) {
        const result = await this._FavoriteModel.findOne({ customerId: customerId }).populate('vendors');
        return result;
    }
}
exports.FavoriteRepository = FavoriteRepository;
