import { ICustomer } from "../../types/customerType";
import { IVendor } from "../../types/vendorType";

export interface ICustomerInterface {
    addCustomer(data:ICustomer): Promise<boolean>;
    verifyEmail(data:ICustomer):Promise<void>
    customerLoginService (data:{email:string;password:string}):Promise<{ accessToken: string; refreshToken: string}|void>
    updateToken (token:string):Promise<string>
    resetPasswordEmailVerify(email:string):Promise<boolean|void>
    resetPassowrd(data:{email:string,password:string}):Promise<void>
    
}



export interface ICustomerServiceInterface{

     getVendorsData ():Promise<IVendor[]|null>

}
