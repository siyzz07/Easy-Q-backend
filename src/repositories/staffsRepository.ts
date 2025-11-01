import { IBaseRepositoryInterface } from "../interface/repositoryInterface/baseInterface";
import { IStaffRepositoryInterface } from "../interface/repositoryInterface/vendorRepoInterface";
import staffModel from "../models/staffModel";
import { IStaff } from "../types/vendorType";
import BaseRepository from "./baseRepository";

export class StaffRepository
  extends BaseRepository<any>
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
  async getStaff(shopId: string): Promise<IStaff[] | []> {
    const result = await this.findManyByCondition({ shopId: shopId });
    if (result) {
      return result;
    } else {
      return [];
    }
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
    console.log("------",result);
    return !!result
    

  }
}
