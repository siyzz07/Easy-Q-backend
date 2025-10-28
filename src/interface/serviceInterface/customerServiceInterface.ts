import { IAddress, ICustomer} from "../../types/customerType";
import { IService, IVendor } from "../../types/vendorType";


//----------------------------------------customer auth
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
    getCustomerData (id:string):Promise<ICustomer|void>
    editProfile(data:{userId:string;name:string;email:string;phone:string}):Promise<boolean|void>
    updatePasswordInProfile(data:{currentPassword:string;userId:string;password:string}):Promise<boolean|void>
    getEachVendorData (data:string):Promise<IVendor|void>
    getEachVendorServices(data:string):Promise<IService[]|[]>
}



export interface ICustomerAddressServiceInterface{

   addAddress (data:IAddress):Promise<void>
   getAddress (customerId:string):Promise<IAddress[]|[]>
   deletCustomerAddress (custoemrId:string,id:string):Promise<string|void>
   editCustomerAddress(data:IAddress):Promise<boolean|void>
   

}