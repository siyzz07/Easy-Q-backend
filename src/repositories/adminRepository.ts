
import { IAdminRepo } from "../interface/admin-interface/admin-repository-interface";
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


}
