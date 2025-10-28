
import { IVendorRepo } from "../interface/repositoryInterface/vendorRepoInterface";
import ServiceTypesModel from "../models/ServiceTypesModel";
import vendorModel from "../models/vendorModel";
import { IServiceType } from "../types/adminTypes";
import { IVendor } from "../types/vendorType";
import BaseRepository from "./baseRepository";

export class VendorRepository
  extends BaseRepository<any>
  implements IVendorRepo
{
  private _vendorModel = vendorModel;
  private _ServiceTypeModel = ServiceTypesModel

  constructor() {
    super(vendorModel);
  }

  async addNewVendor(data: IVendor): Promise<boolean> {
    const vendor = await this.create(data);
    return !!vendor;
  }

  async checkVendorExist(email: string): Promise<boolean> {
    const vendor = await this.findByEmail(email);
    return !!vendor;
  }

  async vendorData(email: string): Promise<void> {
    const vendor = this.findByEmail(email);
    return vendor;
  }

  async vendorDatabyId(id: string): Promise<IVendor | any> {
    const vendor = this.findById(id);
    return vendor;
  }

  async findByIdAndUpdate(id: string, data: object): Promise<any> {
    
    const vendor = await vendorModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    return vendor;
  }

  //------------------------------------------ reset password
  async resetPassword(email: string, hashedPassword: string): Promise<void> {
    await this.updatePassword(email, hashedPassword)
    return 
  }
  //------------------------------------------ delete vendor
  async deleteVendor(email: string): Promise<null> {
    await this._vendorModel.deleteOne({email})
    return null
  }
  
  //------------------------------------------ get vendorservice types
  async vendorTypeData(): Promise<IServiceType[] | null> {
    
    let result = await this._ServiceTypeModel.find()
    return result
  }

  //------------------------------------------ 

}
