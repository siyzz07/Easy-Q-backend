import { promises } from "dns";
import { IServiceType } from "../../types/adminTypes";
import {
  IService,
  IServiceData,
  IShopData,
  IStaff,
  IStaffAdd,
  IVendor,
} from "../../types/vendorType";
import { IPaginationResponseMeta } from "../../types/common-types";

//-------------------------------------------------vednor sevices
export interface IServiceInterface {
  addNewService(data: IService): Promise<boolean | void>;
  getAllService(shopId: string,query:{page?:string,limit?:string,search?:string}): Promise<{data:IService[],pagination:IPaginationResponseMeta}>;
  editService(data: IService): Promise<boolean | void>;
  getSelectedSerivce(_id:string):Promise<IService|void>

  //==============================================
  getEachVendorServices(data: string): Promise<IServiceData[] | []>; //----------------
}
