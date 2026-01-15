
import { IAdmin } from "../../types/adminTypes";
import { ILogin } from "../../types/common-types";
import { ICustomer } from "../../types/customerType";
import { IVendor } from "../../types/vendorType";


export interface AuthServiceInterface {
  verifyEmail(data: IVendor | ICustomer): Promise<void>;
  addNewEntity(data: IVendor | ICustomer | IAdmin): Promise<boolean | void>;
  login(data:ILogin):Promise<{ accessToken: string; refreshToken: string,role:string ,entityData?:IVendor|ICustomer}|void>
  resetPasswordEmailVerify(data:{email:string,role:string}):Promise<boolean|void>
  resetPassword(data:{email:string,password:string,role:string}):Promise<void>
  updateAccessToken(token:any,role:string):Promise<string>
  googleAuth (token:string):Promise<{ accessToken: string; refreshToken: string,role:string ,entityData?:IVendor|ICustomer}|void>
}
