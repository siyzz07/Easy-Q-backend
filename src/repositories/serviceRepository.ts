import { FilterQuery } from "mongoose";
import { IServiceRepositoryInterface } from "../interface/service-interface/service-repository-interface";
import Service from "../models/ServiceModel";
import { IPaginationResponseMeta } from "../types/common-types";
import { IService, IServiceData } from "../types/vendorType";
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
  async getService(shopId: string,query:{page?:string,limit?:string,search?:string}): Promise<{data:IService[],pagination:IPaginationResponseMeta}> {
    
    const filter:FilterQuery<IService> ={
      shopId
    }

     if(query.search?.trim()){
      filter.$or=[
          { serviceName: { $regex: query.search, $options: "i" } },
      ]
    }
    
     const options = {
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
            sort: { createdAt: -1 as const },
        };
   
    const result = await this.filterWithPagination(options,filter)
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
 //-------------------------------------------------------- get selected service
 getSelectedService(_id: string): Promise<IService> {
   const result = this.findById(_id)
   return result
 }


  //===================================================
 async getEachvendorServices(_shopId: string): Promise<IServiceData[]> {
  const result = await this._ServiceModel
    .find({ shopId: _shopId })
    .populate('availableStaff')
    .lean();

  return result as unknown as IServiceData[];
}

     async getServiceData(shopId: string): Promise<IService[] | []> {
      const result = await this._ServiceModel.find({shopId}).lean()
      return result
    }

}
