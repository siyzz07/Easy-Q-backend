import { IPaginationResponseMeta } from "../../types/common-types";
import {
  IStaff,
  IStaffAdd,
} from "../../types/vendorType";

//-------------------------------------------------vednor staff
export interface IStaffService {
  addNewStaff(userId: string, data: IStaffAdd): Promise<boolean | void>;
  getStaffService(shopId: string,query:{page?:string,limit?:string,search?:string,isActive?:string}): Promise<{data:IStaff[],pagination:IPaginationResponseMeta}>;
  editStaff(data: IStaff): Promise<boolean | void>;
  editStaffBlockDate(data:{_id:string,blockedDates:Date[],userId:string}):Promise<boolean|void>
}
