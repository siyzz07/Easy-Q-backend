
import { query } from "winston";
import { ICustomerAddressRepositoryInterface } from "../interface/address-interface/address-repository-interface";
import addressModel from "../models/addressModel";
import { IAddress, ICustomerAddress } from "../types/customerType";
import BaseRepository from "./baseRepository";

export class CustomerAddresRepository
  extends BaseRepository<any>
  implements ICustomerAddressRepositoryInterface
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
  //-----------------------------------------------------------------get all address of the user

  async getAllAddress(custoemrId: string): Promise<ICustomerAddress | null> {
    const address = await this.findByCustomer(custoemrId);
    if (address) {
      return address;
    } else {
      return null;
    }
  }
  //-----------------------------------------------------------------get user have same addess
 async checkAddressDuplicat(
  customerId: string,
  address: string,
  excludeId?: string
): Promise<boolean> {
  const query: any = {
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
  async deletCustomerAddress(customerId: string, id: string): Promise<boolean> {
    const result = await this._addressModel.updateOne(
      { customerId },
      { $pull: { address: { _id: id } } }
    );
 
    return result.modifiedCount > 0;
  }

  //-----------------------------------------------------------------edit customer address
  async editCustomerAddress(
  customerId: string,
  addressId: string,
  payload: IAddress
): Promise<boolean> {
 

 const updated = await this._addressModel.findOneAndUpdate(
    { customerId, "address._id": addressId },
    {
      $set: {
        "address.$.address": payload.address,
        "address.$.phone": payload.phone,
        "address.$.country": payload.country,
        "address.$.state": payload.state,
        "address.$.city": payload.city,
      },
    },
    { new: true }
  );


  return updated !== null;
}

//-----------------------------------------------------------------get selected address
async getSelectedAddress(customerId: string, addressId: string): Promise<IAddress> {
  
  let query = {
  customerId: customerId,};

  let result = await this.findOneByCondiition(query)
  return result

}


}
