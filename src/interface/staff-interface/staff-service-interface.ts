import { IServiceType } from "../../types/adminTypes";
import { IPaginationResponseMeta } from "../../types/common-types";
import {
  IService,
  IShopData,
  IStaff,
  IStaffAdd,
  IVendor,
} from "../../types/vendorType";

//-------------------------------------------------vednor staff
export interface IStaffServiceInterface {
  addNewStaff(userId: string, data: any): Promise<boolean | void>;
  getStaffService(shopId: string,query:{page?:string,limit?:string,search?:string}): Promise<{data:IStaff[],pagination:IPaginationResponseMeta}>;
  editStaff(data: IStaff): Promise<boolean | void>;
  editStaffBlockDate(data:{_id:string,blockedDates:any,userId:string}):Promise<boolean|void>
}
