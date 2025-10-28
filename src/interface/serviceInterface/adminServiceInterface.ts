import { IAdmin, IServiceType } from "../../types/adminTypes";
import { ICustomer } from "../../types/customerType";
import { IVendor } from "../../types/vendorType";

export interface IAdminAuthServiceInterface {
  loginAdmin(
    data: IAdmin
  ): Promise<{ accessToken: string; refreshToken: string } | void>;
  updateToken(token: string): Promise<string>;
}

export interface IAdminServiceInterface {
  getCustomersDatas(): Promise<ICustomer[] | []>;
  blockCustomer (customerId:string):Promise<boolean|void>
  getVendorsDatas(): Promise<IVendor[] | []>;
  blockVendor (customerId:string):Promise<boolean|void>
  getVendorsVerification():Promise<IVendor []|[]>
  rejectVendorRequst (_id:string):Promise<boolean|void>
  verifyVendorRequst (_id:string):Promise<boolean|void>
  dashboard () :Promise<any>

}




export interface IShopTypeServiceInterface{
   addServiceType (data:{userId:string;serviceName:string;description:string}):Promise<boolean|void>
   getServices ():Promise<IServiceType[]|[]>
   editServiceType (data:{_id:string;serviceName:string;description:string}):Promise<boolean|void>
}
