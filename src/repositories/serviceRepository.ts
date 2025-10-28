import { IServiceRepositoryInterface } from "../interface/repositoryInterface/vendorRepoInterface";
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
    let result = await this.create(data);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  //-------------------------------------------------------- get all Serivce
  async getService(shopId: string): Promise<IService[] | []> {
    let result = await this.findManyByCondition({ shopId: shopId });
    return result;
  }

  //-------------------------------------------------------- edit service
  async editService(_id: string, data: IService): Promise<boolean> {
    let result = await this.update(_id,data)
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
