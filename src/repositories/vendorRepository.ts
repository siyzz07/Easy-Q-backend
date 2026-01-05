import { FilterQuery } from "mongoose";
import { IVendorRepo } from "../interface/vendor-interface/vendor-respository-interface";
import Service from "../models/ServiceModel";
import ServiceTypesModel from "../models/ServiceTypesModel";
import staffModel from "../models/staffModel";
import vendorModel from "../models/vendorModel";
import { IServiceType } from "../types/adminTypes";
import { IImage, IService, IStaff, IVendor } from "../types/vendorType";
import BaseRepository from "./baseRepository";
import { IPaginationResponseMeta } from "../types/common-types";

export class VendorRepository
  extends BaseRepository<any>
  implements IVendorRepo
{
  private _vendorModel = vendorModel;
  private _ServiceTypeModel = ServiceTypesModel;
  private _Service = Service;
  private _Staff = staffModel;

  constructor() {
    super(vendorModel);
  }

  //--------------- add new vendor
  async addNewVendor(data: IVendor): Promise<boolean> {
    const vendor = await this.create(data);
    return !!vendor;
  }

  //--------------- check vendro exitst
  async checkVendorExist(email: string): Promise<boolean> {
    const vendor = await this.findByEmail(email);
    return !!vendor;
  }

  //--------------- get vendor data
  async vendorData(email: string): Promise<void> {
    const vendor = this.findByEmail(email);
    return vendor;
  }

  //--------------- get vendor data by id
  async vendorDatabyId(id: string): Promise<IVendor | any> {
    const vendor = this.findById(id);
    return vendor;
  }

  //--------------- find and update
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
    await this.updatePassword(email, hashedPassword);
    return;
  }
  //------------------------------------------ delete vendor
  async deleteVendor(email: string): Promise<null> {
    await this._vendorModel.deleteOne({ email });
    return null;
  }

  //========================================================
  async rejectVendor(_id: string): Promise<boolean> {
    const update = await this._vendorModel
      .findByIdAndUpdate(
        _id,
        { $set: { isVerified: "rejected" } },
        { new: true }
      )
      .lean();

    return !!update;
  }

  async verifyVendor(_id: string): Promise<boolean> {
    const update = await this._vendorModel
      .findByIdAndUpdate(
        _id,
        { $set: { isVerified: "verified" } },
        { new: true }
      )
      .lean();

    return !!update;
  }

  async blockVendor(_id: string): Promise<boolean> {
    const updated = await this._vendorModel
      .findByIdAndUpdate(_id, [{ $set: { isActive: { $not: "$isActive" } } }], {
        new: true,
      })
      .lean();
    return !!updated;
  }

  async getVendorData(): Promise<IVendor[] | []> {
    const result = await this._vendorModel.find().lean();
    if (result) {
      return result;
    } else {
      return [];
    }
  }

  async getVendorsData(): Promise<IVendor[] | null> {
    const vendorData = await this._vendorModel.find({ isActive: true }).lean();
    return vendorData;
  }

  async getEachVendorData(_id: string): Promise<IVendor | null> {
    const result = await this._vendorModel.findById(_id).populate("shopType");
    return result;
  }

  // ----------------------- add vendor shop image
  async addImage(_id: string, image: IImage): Promise<boolean> {
    const result = await this._vendorModel.findByIdAndUpdate(
      _id,
      { $push: { images: image } },
      { new: true }
    );

    return !!result;
  }

  // ----------------------- delete vendor shop image
  async deleteShopImage(_id: string, imageId: string): Promise<boolean> {
    const result = await this._vendorModel.findByIdAndUpdate(
      _id,
      { $pull: { images: { _id: imageId } } },
      { new: true }
    );

    return !!result;
  }

  //------------------------- get all vendor dat with pagination
  async vendorsDataWithPagination(data: {
    search?: string;
    location?: string;
    page?: string;
    limit?: string;
  }): Promise<{data:IVendor[],pagination: IPaginationResponseMeta} > {
    const filter: FilterQuery<IVendor> = {};

    if (data.search?.trim() || data.location?.trim()) {
      filter.$or = [];

      if (data.search?.trim()) {
        filter.$or.push({
          shopName: { $regex: data.search, $options: "i" },
        });
      }

      if (data.location?.trim()) {
        filter.$or.push({
          city: { $regex: data.location, $options: "i" },
        });
      }
    }

   const options = {
  page: Number(data.page) || 1,
  limit: Number(data.limit) || 10,
  sort: { _id: -1 } as const,
};

    const response = await this.filterWithPagination(options,filter)
    return response

  }
}
