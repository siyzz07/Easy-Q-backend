import { IBaseRepositoryInterface } from "../interface/repositoryInterface/baseInterface";
import { IVendorRepo } from "../interface/repositoryInterface/vendorRepoInterface";
import vendorModel from "../models/vendorModel";
import { IVendor } from "../types/vendorType";
import BaseRepository from "./baseRepository";

export class VendorRepository
  extends BaseRepository<any>
  implements IVendorRepo
{
  private _vendorModel = vendorModel;

  constructor() {
    super(vendorModel);
  }

  async addNewVendor(data: IVendor): Promise<boolean> {
    let vendor = await this.create(data);
    return !!vendor;
  }

  async checkVendorExist(email: string): Promise<boolean> {
    let vendor = await this.findByEmail(email);
    return !!vendor;
  }

  async vendorData(email: string): Promise<void> {
    let vendor = this.findByEmail(email);
    return vendor;
  }

  async vendorDatabyId(id: string): Promise<IVendor | any> {
    let vendor = this.findById(id);
    return vendor;
  }

  async findByIdAndUpdate(id: string, data: object): Promise<any> {
    console.log("pppp", id, data);
    const vendor = await vendorModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    return vendor;
  }
}
