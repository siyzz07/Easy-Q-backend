import { IShopData, IVendor } from "../../types/vendorType";


export interface IVendorInterface{
    addNewVendor(data:{shopName:string;phone:string;email:string,password:string}):Promise<boolean>
    verifyEmail(data:{shopName:string;phone:string;email:string,password:string}):Promise<void>
    vendorLogin(data:{email:string;password:string}):Promise<{ accessToken: string; refreshToken: string }|void>
    updateToken(token:string):Promise<string|void>
    resetPasswordEmailVerify(email:string):Promise<boolean|void>
    resetPassowrd(data:{email:string,password:string}):Promise<void>
}


export interface IVendorShopServiceInterface{

 addShopData (data:IShopData,vendorId:string,cordiantes:object) :Promise<any>
 getShopData (id:string):Promise<IVendor>
    
}

