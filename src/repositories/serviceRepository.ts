import { IServiceRepositoryInterface } from "../interface/service-interface/service-repository-interface";
import Service from "../models/Service";
import { IService } from "../types/vendorType";
import BaseRepository from "./baseRepository";

export class ServiceRepository
  extends BaseRepository<any>
  implements IServiceRepositoryInterface
{
  private _ServiceModel = Service;

  constructor() {
    super(Service);
  }

  //-------------------------------------------------------- add new Serivce
  async addService(data: IService): Promise<boolean> {
    const result = await this.create(data);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  //-------------------------------------------------------- get all Serivce
  async getService(shopId: string): Promise<IService[] | []> {
    const result = await this.findManyByCondition({ shopId: shopId });
    return result;
  }

  //-------------------------------------------------------- edit service
  async editService(_id: string, data: IService): Promise<boolean> {
    const result = await this.update(_id,data)
    if (result) {
      return true;
    } else {
      return false;
    }
  }



  //===================================================
  async getEachvendorServices(_shopId: string): Promise<IService[] | []> {
        const result = await this._ServiceModel.find({shopId:_shopId})
        return result
    }


     async getServiceData(shopId: string): Promise<IService[] | []> {
      const result = await this._ServiceModel.find({shopId}).lean()
      return result
    }

}
