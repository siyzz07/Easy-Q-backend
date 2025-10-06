import { Document } from "mongoose";
import { ICustomer } from "../types/customerType";
import { ICustomerRepo } from "../interface/repositoryInterface/customerInterface";
import customer from "../models/customerModel";
import BaseRepository from "./baseRepository";
import { IBaseRepositoryInterface } from "../interface/repositoryInterface/baseInterface";

export class CustomerRepository
  extends BaseRepository<any>
  implements ICustomerRepo
{
  private _customerModel = customer;

  constructor() {
    super(customer);
  }

  async addNewCustomer(data: ICustomer): Promise<boolean> {
    let response = await this.create(data);
    return !!response
  }

  async checkCustomerExist(email: string): Promise<boolean> {
    let customerCheck = await this.findByEmail(email);
    return !!customerCheck;
  }

  async customerDataByEmail(email: string): Promise<ICustomer | null> {
    
    let  customer = await this.findByEmail(email)
    return customer
  }


  async customerDataById(id: string): Promise<ICustomer | null> {
    
    let customer =await this.findById(id)
    return  customer
  }
}
