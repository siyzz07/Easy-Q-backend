"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAddresRepository = void 0;
const addressModel_1 = __importDefault(require("../models/addressModel"));
const baseRepository_1 = __importDefault(require("./baseRepository"));
class CustomerAddresRepository extends baseRepository_1.default {
    constructor() {
        super(addressModel_1.default);
        this._addressModel = addressModel_1.default;
    }
    //-----------------------------------------------------------------chek user have address collection
    async checkUserAddressExist(customerId) {
        const response = await this.findByCustomer(customerId);
        if (response) {
            return true;
        }
        else {
            return false;
        }
    }
    //-----------------------------------------------------------------add address for existing customer
    async addAddress(id, payload) {
        await this._addressModel
            .updateOne({ customerId: id }, { $push: { address: payload } })
            .exec();
        return;
    }
    //-----------------------------------------------------------------add address in firt time
    async addFirstAddress(id, payload) {
        await this._addressModel.create({
            customerId: id,
            address: [payload],
        });
        return;
    }
    //-----------------------------------------------------------------get all address of the user
    async getAllAddress(custoemrId) {
        const address = await this.findByCustomer(custoemrId);
        if (address) {
            return address;
        }
        else {
            return null;
        }
    }
    //-----------------------------------------------------------------get user have same addess
    async checkAddressDuplicat(customerId, address, excludeId) {
        const query = {
            customerId,
            address: {
                $elemMatch: {
                    address: address,
                    ...(excludeId ? { _id: { $ne: excludeId } } : {}),
                },
            },
        };
        const addressExist = await this._addressModel.findOne(query);
        return !!addressExist;
    }
    //-----------------------------------------------------------------delet customer address
    async deletCustomerAddress(customerId, id) {
        const result = await this._addressModel.updateOne({ customerId }, { $pull: { address: { _id: id } } });
        return result.modifiedCount > 0;
    }
    //-----------------------------------------------------------------edit customer address
    async editCustomerAddress(customerId, addressId, payload) {
        const updated = await this._addressModel.findOneAndUpdate({ customerId, "address._id": addressId }, {
            $set: {
                "address.$.address": payload.address,
                "address.$.phone": payload.phone,
                "address.$.country": payload.country,
                "address.$.state": payload.state,
                "address.$.city": payload.city,
            },
        }, { new: true });
        return updated !== null;
    }
    //-----------------------------------------------------------------get selected address
    async getSelectedAddress(customerId, addressId) {
        const query = {
            customerId: customerId,
        };
        const result = await this.findOneByCondiition(query);
        return result;
    }
}
exports.CustomerAddresRepository = CustomerAddresRepository;
