import { IAdminRepo } from "../interface/repositoryInterface/adminRepoInterface";
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

  //------------------------------------------------------- chech the admin exist or not
  async checkAdminExist(email: string): Promise<boolean> {
    const admin = await this.findByEmail(email);
    
    return !!admin;
  }
  
  //------------------------------------------------------- take amin data
  async adminDataByEmail(email: string): Promise<IAdmin> {
    const adminData = await this.findByEmail(email);

    return adminData;
  }

  async addAdmin(data: IAdmin): Promise<void> {
     await this.create(data);
  }


  //--------------------------------------------------------------------
  //--------------------------------------------------------------------
  //--------------------------------------------------------------------
  //--------------------------------------------------------------------
  //--------------------------------------------------------------------
  //--------------------------------------------------------------------
  //--------------------------------------------------------------------
  async getCusomersData(): Promise<ICustomer[] | []> {
    const result = await this._CustomerModel.find().lean();
    if (result) {
      return result;
    } else {
      return [];
    }
  }


  //---------------------------------------------------- block customer by admin
  //---------------------------------------------------- block customer by admin
  //---------------------------------------------------- block customer by admin
  //---------------------------------------------------- block customer by admin
  //---------------------------------------------------- block customer by admin
  //---------------------------------------------------- block customer by admin
  async blockCustomer(_id: string): Promise<boolean> {
    const updated = await this._CustomerModel
      .findByIdAndUpdate(_id, [{ $set: { isActive: { $not: "$isActive" } } }], {
        new: true,
      })
      .lean();
    return !!updated;
  }

//------------------------------------------------------- get vendors data
//------------------------------------------------------- get vendors data
//------------------------------------------------------- get vendors data
//------------------------------------------------------- get vendors data
//------------------------------------------------------- get vendors data
//------------------------------------------------------- get vendors data
//------------------------------------------------------- get vendors data
//------------------------------------------------------- get vendors data
async getVendorData(): Promise<IVendor[] | []> {
  const result = await this._VendorModel.find().lean();
  if (result) {
    return result;
  } else {
    return [];
  }
}

//-------------------------------------------------------block vendor data
//-------------------------------------------------------block vendor data
//-------------------------------------------------------block vendor data
//-------------------------------------------------------block vendor data
//-------------------------------------------------------block vendor data
//-------------------------------------------------------block vendor data
//-------------------------------------------------------block vendor data
//-------------------------------------------------------block vendor data
//-------------------------------------------------------block vendor data

async blockVendor(_id: string): Promise<boolean> {
  const updated = await this._VendorModel
  .findByIdAndUpdate(_id, [{ $set: { isActive: { $not: "$isActive" } } }], {
    new: true,
  })
  .lean();
  return !!updated;
}


//-------------------------------------------------------verify vendor
//-------------------------------------------------------verify vendor
//-------------------------------------------------------verify vendor
//-------------------------------------------------------verify vendor
//-------------------------------------------------------verify vendor
//-------------------------------------------------------verify vendor
//-------------------------------------------------------verify vendor
async verifyVendor(_id: string): Promise<boolean> {
  const update = await this._VendorModel.findByIdAndUpdate(
    _id,
    { $set: { isVerified: "verified" } },
    { new: true } 
  ).lean();

  return !!update;
}

//-------------------------------------------------------reject vendor
//-------------------------------------------------------reject vendor
//-------------------------------------------------------reject vendor
//-------------------------------------------------------reject vendor
//-------------------------------------------------------reject vendor
//-------------------------------------------------------reject vendor
//-------------------------------------------------------reject vendor
async rejectVendor(_id: string): Promise<boolean> {
    const update = await this._VendorModel.findByIdAndUpdate(
    _id,
    { $set: { isVerified: "rejected" } },
    { new: true } 
  ).lean();

  return !!update;
}


}
