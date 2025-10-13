import { IAdmin } from "../../types/adminTypes";
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
}
