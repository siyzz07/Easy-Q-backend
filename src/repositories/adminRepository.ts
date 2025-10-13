import { IAdminRepo } from "../interface/repositoryInterface/adminRepoInterface";
import { IBaseRepositoryInterface } from "../interface/repositoryInterface/baseInterface";
import adminModel from "../models/adminModel";
import customerModel from "../models/customerModel";
import vendorModel from "../models/vendorModel";
import { IAdmin } from "../types/adminTypes";
import { ICustomer } from "../types/customerType";
import { IVendor } from "../types/vendorType";
import BaseRepository from "./baseRepository";

export class AdminRepository extends BaseRepository<any> implements IAdminRepo {
  private _adminModel = adminModel;
  private _CustomerModel = customerModel;
  private _VendorModel = vendorModel;

  constructor() {
    super(adminModel);
  }

  async checkAdminExist(email: string): Promise<boolean> {
    const admin = await this.findByEmail(email);

    return !!admin;
  }

  async adminDataByEmail(email: string): Promise<IAdmin> {
    const adminData = await this.findByEmail(email);

    return adminData;
  }

  async addAdmin(data: IAdmin): Promise<void> {
    const add = await this.create(data);
  }

  async getCusomersData(): Promise<ICustomer[] | []> {
    let result = await this._CustomerModel.find().lean();
    if (result) {
      return result;
    } else {
      return [];
    }
  }

  //----------------------- block customer by admin
  async blockCustomer(_id: string): Promise<boolean> {
    const updated = await this._CustomerModel
      .findByIdAndUpdate(_id, [{ $set: { isActive: { $not: "$isActive" } } }], {
        new: true,
      })
      .lean();
    return !!updated;
  }

//------------------------------------------------------- get vendors data
async getVendorData(): Promise<IVendor[] | []> {
  let result = await this._VendorModel.find().lean();
  if (result) {
    return result;
  } else {
    return [];
  }
}

//-------------------------------------------------------block vendor data
 
async blockVendor(_id: string): Promise<boolean> {
  const updated = await this._VendorModel
      .findByIdAndUpdate(_id, [{ $set: { isActive: { $not: "$isActive" } } }], {
        new: true,
      })
      .lean();
    return !!updated;
}




}
