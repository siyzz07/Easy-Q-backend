// -----in this repo is for the services types that have given by amdin in each vendor and its for the types of the shop like what type of service they provide
import { IServiceTypesRepositoryInterface } from "../interface/service-types-interface/service-type-repository-interface";
import ServiceTypesModel from "../models/ServiceTypesModel";
import { IServiceType } from "../types/adminTypes";
import BaseRepository from "./baseRepository";

export class ServiceTypes
  extends BaseRepository<IServiceType>
  implements IServiceTypesRepositoryInterface
{
  private _ServiceTypeModel = ServiceTypesModel;

  constructor() {
    super(ServiceTypesModel);
  }

  //--------------------------------------------------------------- add new Service
  async   addServiceType(data: {
    serviceName: string;
    description: string;
    isActive: boolean;
  }): Promise<boolean> {
    const addServiece = await this.create(data);
    if (addServiece) {
      return true;
    } else {
      return false;
    }
  }

  //---------------------------------------------------------------- get all service
  async getServices(): Promise<IServiceType[] | []> {
    const result = await this.findAll();
    if (result) {
      return result;
    } else {
      return [];
    }
  }

  //---------------------------------------------------------------- edit  service
  async editServiceType(
    _id: string,
    data: { serviceName: string; description: string }
  ): Promise<boolean> {
    const result = await this.update(_id, data);

    if (result) {
      return true;
    } else {
      return false;
    }
  }

   async vendorTypeData(): Promise<IServiceType[] | null> {
    
    const result = await this._ServiceTypeModel.find()
    return result
  }

    //---------------------------------------------------------------- get service by condition
     async getServiceByCondition(data: Partial<IServiceType>): Promise<IServiceType[]> {
      const result = await this.findManyByCondition(data)
      return result
    }
}
