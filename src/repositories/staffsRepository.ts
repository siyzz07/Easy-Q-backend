import  { FilterQuery, UpdateQuery } from "mongoose";
import { IStaffRepositoryInterface } from "../interface/staff-interface/staff-repository-interface";
import staffModel from "../models/staffModel";
import { IStaff } from "../types/vendorType";
import BaseRepository from "./baseRepository";
import { IPaginationResponseMeta } from "../types/common-types";

export class StaffRepository
  extends BaseRepository<IStaff>
  implements IStaffRepositoryInterface
{
  private _StaffModel = staffModel;

  constructor() {
    super(staffModel);
  }

  //-----------------------------------------------------add new staff
  async addStaff(data: IStaff): Promise<boolean> {
    const result = await this.create(data);

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  //-----------------------------------------------------get the shop staffs
   async getStaff(shopId: string, query:{page?:string,limit?:string,search?:string,isActive?:string}): Promise<{data:IStaff[],pagination:IPaginationResponseMeta}>{

    const filter:FilterQuery<IStaff>={
      shopId
    }

     if(query.search?.trim()){
       filter.$or=[
           { staffName: { $regex: query.search, $options: "i" } },
       ]
     }

     if (query.isActive !== undefined && query.isActive !== "") {
       filter.isActive = query.isActive === "true";
     }
    
     const options = {
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
            sort: { createdAt: -1 as const },
        };

    const result = await this.filterWithPagination(options,filter)
      return result;

  }

  //-----------------------------------------------------get single staff data
  async getSingleStaff(shopId: string,staffName?: string, staffId?: string): Promise<IStaff | null> {

    const query = { shopId } as {
      shopId: string;
      staffName?: string;
      staffId?: string;
    };

    if (staffName) query.staffName = staffName;
    if (staffId) query.staffId = staffId;

    const result = await this.findOneByCondiition(query);
  
      
    return result
  }

  //-----------------------------------------------------find the duplicate of the staff
  async duplicateStaffFind(shopId: string,staffName:string, staffId?: string): Promise<IStaff[]|[]> {
  const query: any = { shopId,staffName };
  if (staffId) {
    query._id = { $ne: staffId }; 
  }

  const result = await this._StaffModel.find(query);
  return result;
}
  //-----------------------------------------------------edit Staff
  async editStaff(shopId: string,_id:string, data: IStaff): Promise<boolean | void> {
    
    const result = await this._StaffModel.findOneAndUpdate({_id},{$set:data},{new:true})
    return !!result
    
    
  }
  //-----------------------------------------------------edit Staff
   async getStaffById(id: string): Promise<IStaff | null> {

    const result = await this.findById(id)
    return result


  }




   async updateStaff(id: string, data: UpdateQuery<IStaff>): Promise<IStaff | null> {
    
    const result = await this.update(id,data)
    return result
  }
  

   async  getStaffData(shopId: string): Promise<IStaff[] | []> {
      const result = await this._StaffModel.find({shopId}).lean()
      return result
    }
}
