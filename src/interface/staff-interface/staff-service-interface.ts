import { IServiceType } from "../../types/adminTypes";
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
  getStaffService(shopId: string): Promise<IStaff[] | []>;
  editStaff(data: IStaff): Promise<boolean | void>;
  editStaffBlockDate(data:{_id:string,blockedDates:any,userId:string}):Promise<boolean|void>
}
