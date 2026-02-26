import { FilterQuery } from "mongoose";
import { ICustomerAddressRepository } from "../interface/address-interface/address-repository-interface";
import addressModel from "../models/addressModel";
import { IAddress, ICustomerAddress } from "../types/customerType";
import BaseRepository from "./baseRepository";

export class CustomerAddresRepository
  extends BaseRepository<ICustomerAddress>
  implements ICustomerAddressRepository
{
  private _addressModel = addressModel;

  constructor() {
    super(addressModel);
  }

  //-----------------------------------------------------------------chek user have address collection
  async checkUserAddressExist(customerId: string): Promise<boolean> {
    const response = await this.findByCustomer(customerId);

    if (response) {
      return true;
    } else {
      return false;
    }
  }

  //-----------------------------------------------------------------add address for existing customer
  async addAddress(id: string, payload: IAddress): Promise<void> {
    

    await this._addressModel
      .updateOne({ customerId: id }, { $push: { address: payload } })
      .exec();
    return;
  }

  //-----------------------------------------------------------------add address in firt time
  async addFirstAddress(id: string, payload: IAddress): Promise<void> {
    await this._addressModel.create({
      customerId: id,
      address: [payload],
    });

    return;
  }

  //-------------------------------------------------------------find the address exist or not in the user
  async checkAddressDuplicat(
    customerId: string,
    address: string,
    excludeId?: string
  ): Promise<boolean> {
    const query: FilterQuery<ICustomerAddress> = {
      customerId,
      address: {
        $elemMatch: {
          address: { $regex: new RegExp(`^${address}$`, "i") },
        },
      },
    };

    if (excludeId) {
      query["address.$elemMatch"]._id = { $ne: excludeId };
    }

    const exist = await this.findOneByCondiition(query);
    return !!exist;
  }

  async getAllAddress(customerId: string): Promise<ICustomerAddress | null> {
    const result = await this.findByCustomer(customerId);
    return result;
  }

  //------------------------------------------------------------edit address
  async editCustomerAddress(
    customerId: string,
    addressId: string,
    updatedData: IAddress
  ): Promise<boolean> {
    const query = {
      customerId: customerId,
      "address._id": addressId,
    };

    const update = {
      $set: {
        "address.$": updatedData,
      },
    };
    const result = await this._addressModel.findOneAndUpdate(query, update, {
      new: true,
    });

    return !!result;
  }

  //------------------------------------------------------------delete address

  async deletCustomerAddress(
    customerId: string,
    addressId: string
  ): Promise<boolean> {
    const query = { customerId: customerId };
    const update = {
      $pull: {
        address: { _id: addressId },
      },
    };

    const result = await this._addressModel.findOneAndUpdate(query, update, {
      new: true,
    });
    return !!result;
  }

//-----------------------------------------------------------------get selected address
async getSelectedAddress(customerId: string, addressId: string): Promise<ICustomerAddress | null> {
  
  const query = {
  customerId: customerId,};

  const result = await this._addressModel.findOne(
    query,
    { address: { $elemMatch: { _id: addressId } } } 
  ).lean<ICustomerAddress>();

  return result
}


}
