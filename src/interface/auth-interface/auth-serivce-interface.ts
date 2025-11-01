//    addCustomer(data:ICustomer): Promise<boolean>;
//     verifyEmail(data:ICustomer):Promise<void>
//     customerLoginService (data:{email:string;password:string}):Promise<{ accessToken: string; refreshToken: string}|void>
//     updateToken (token:string):Promise<string>
//     resetPasswordEmailVerify(email:string):Promise<boolean|void>
//     resetPassowrd(data:{email:string,password:string}):Promise<void>

import { ILogin } from "../../types/common-types";
import { ICustomer } from "../../types/customerType";
import { IVendor } from "../../types/vendorType";

// addNewVendor(data:{shopName:string;phone:string;email:string,password:string,proofImage:string}):Promise<boolean>
// verifyEmail(data:{shopName:string;phone:string;email:string,password:string}):Promise<void>
// vendorLogin(data:{email:string;password:string}):Promise<{ accessToken: string; refreshToken: string }|void>
// updateToken(token:string):Promise<string|void>
// resetPasswordEmailVerify(email:string):Promise<boolean|void>
// resetPassowrd(data:{email:string,password:string}):Promise<void>

export interface AuthServiceInterface {
  verifyEmail(data: IVendor | ICustomer): Promise<void>;
  addNewEntity(data: IVendor | ICustomer): Promise<boolean | void>;
  login(data:ILogin):Promise<{ accessToken: string; refreshToken: string,role:string ,entityData?:IVendor|ICustomer}|void>
  resetPasswordEmailVerify(data:{email:string,role:string}):Promise<boolean|void>
  resetPassword(data:{email:string,password:string,role:string}):Promise<void>
  updateAccessToken(token:any,role:string):Promise<string|void>
}
