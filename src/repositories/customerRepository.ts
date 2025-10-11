import { Document } from "mongoose";
import { ICustomer } from "../types/customerType";
import { ICustomerRepo } from "../interface/repositoryInterface/customerInterface";
import customer from "../models/customerModel";
import BaseRepository from "./baseRepository";
import { IBaseRepositoryInterface } from "../interface/repositoryInterface/baseInterface";
import vendorModel from "../models/vendorModel";
import { IVendor } from "../types/vendorType";

export class CustomerRepository
  extends BaseRepository<any>
  implements ICustomerRepo
{
  private _customerModel = customer;
  private _vendorMode = vendorModel;

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
  async getVendorsData(): Promise<IVendor[] | null> {
    const vendorData = await this._vendorMode.find().lean();
    return vendorData;
  }
  
  //---------------------------------------------------------------------reset custoemr passwod
  async resetPassword(email: string, hashedPassword: string): Promise<void> {
    await this.updatePassword(email, hashedPassword);
    return;
  }
}
