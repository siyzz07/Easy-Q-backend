
import { ICustomer } from "../types/customerType";
import { ICustomerRepo } from "../interface/repositoryInterface/customerInterface";
import customer from "../models/customerModel";
import BaseRepository from "./baseRepository";
import vendorModel from "../models/vendorModel";
import { IService, IVendor } from "../types/vendorType";
import Service from "../models/Service";

export class CustomerRepository
  extends BaseRepository<any>
  implements ICustomerRepo
{
  private _customerModel = customer;
  private _vendorModel = vendorModel;
  private _VendorServiceModel =Service

  constructor() {
    super(customer);
  }

  async addNewCustomer(data: ICustomer): Promise<boolean> {
    const response = await this.create(data);
    return !!response;
  }

  //---------------------------------------------------------------------check customer exist or not
  async checkCustomerExist(email: string): Promise<boolean> {
    const customerCheck = await this.findByEmail(email);
    return !!customerCheck;
  }

  //---------------------------------------------------------------------get customer data take by email
  async customerDataByEmail(email: string): Promise<ICustomer | null> {
    const customer = await this.findByEmail(email);
    return customer;
  }

  //---------------------------------------------------------------------get custemer data  take by id
  async customerDataById(id: string): Promise<ICustomer | null> {
    const customer = await this.findById(id);
    return customer;
  }

  //---------------------------------------------------------------------get all vendors/shops data
  //---------------------------------------------------------------------get all vendors/shops data
  //---------------------------------------------------------------------get all vendors/shops data
  //---------------------------------------------------------------------get all vendors/shops data
  //---------------------------------------------------------------------get all vendors/shops data
  async getVendorsData(): Promise<IVendor[] | null> {
    const vendorData = await this._vendorModel.find({isActive:true}).lean();
    return vendorData;
  }

  //---------------------------------------------------------------------reset custoemr passwod
  async resetPassword(email: string, hashedPassword: string): Promise<void> {
    await this.updatePassword(email, hashedPassword);
    return;
  }
  //---------------------------------------------------------------------updata custome profile
  async editProfile(data: {
    userId: string;
    name: string;
    email: string;
    phone: string;
  }): Promise<boolean> {
    const { userId, name, email, phone } = data;

    const result = await this._customerModel.findByIdAndUpdate(
      userId,
      {
        $set: { name, email, phone },
      },
      { new: true }
    );

   

    return !!result;
  }

    //---------------------------------------------------------------------get each vendor data
    //---------------------------------------------------------------------get each vendor data
    //---------------------------------------------------------------------get each vendor data
    //---------------------------------------------------------------------get each vendor data
    //---------------------------------------------------------------------get each vendor data
    async getEachVendorData(_id: string): Promise<IVendor | null> {
      const result = await this._vendorModel.findById(_id).populate('shopType')
      return result
    }
    //---------------------------------------------------------------------get each vendor services
    //---------------------------------------------------------------------get each vendor services
    //---------------------------------------------------------------------get each vendor services
    //---------------------------------------------------------------------get each vendor services
    //---------------------------------------------------------------------get each vendor services
    async getEachvendorServices(_shopId: string): Promise<IService[] | []> {
        const result = await this._VendorServiceModel.find({shopId:_shopId})
        return result
    }
  }
