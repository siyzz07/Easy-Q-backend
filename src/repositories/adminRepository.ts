
import { IAdminRepo } from "../interface/admin-interface/admin-repository-interface";
import adminModel from "../models/adminModel";
import customerModel from "../models/customerModel";
import vendorModel from "../models/vendorModel";
import { IAdmin } from "../types/adminTypes";
import { ICustomer } from "../types/customerType";
import { IVendor } from "../types/vendorType";
import BaseRepository from "./baseRepository";

export class AdminRepository extends BaseRepository<IAdmin> implements IAdminRepo {
  private _AdminModel = adminModel; 

  constructor() {
    super(adminModel); 
  }

  //------------------------------------------------------- check admin exist
  async checkAdminExist(email: string): Promise<boolean> {
    const check = await this.findByEmail(email);
    if (check) {
      return true;
    } else {
      return false;
    }
  }
  
  //------------------------------------------------------- take amin data
  async adminDataByEmail(email: string): Promise<IAdmin | null> {
    const adminData = await this.findByEmail(email);

    return adminData;
  }

  async addAdmin(data: IAdmin): Promise<void> {
     await this.create(data);
  }


}
