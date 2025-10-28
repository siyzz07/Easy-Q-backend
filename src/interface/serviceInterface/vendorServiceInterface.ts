import { IServiceType } from "../../types/adminTypes";
import { IService, IShopData, IStaff, IStaffAdd, IVendor } from "../../types/vendorType";


export interface IVendorInterface{
    addNewVendor(data:{shopName:string;phone:string;email:string,password:string,proofImage:string}):Promise<boolean>
    verifyEmail(data:{shopName:string;phone:string;email:string,password:string}):Promise<void>
    vendorLogin(data:{email:string;password:string}):Promise<{ accessToken: string; refreshToken: string }|void>
    updateToken(token:string):Promise<string|void>
    resetPasswordEmailVerify(email:string):Promise<boolean|void>
    resetPassowrd(data:{email:string,password:string}):Promise<void>
}


export interface IVendorShopServiceInterface{

 addShopData (data:IShopData,vendorId:string,cordiantes:object) :Promise<any>
 getShopData (id:string):Promise<IVendor>
 getShopTypes () :Promise<IServiceType[]|[]>
    
}


//-------------------------------------------------vednor staff
export interface IStaffServiceInterface{
    addNewStaff(userId:string,data:any):Promise<boolean|void>
    getStaffService(shopId:string):Promise<IStaff[]|[]>
    editStaff (data:IStaff):Promise<boolean|void>
}



//-------------------------------------------------vednor sevices
export interface IServiceInterface{
    addNewService(data:IService):Promise<boolean|void>
    getAllService(shopId:string):Promise<IService[]|[]>
    editService(data:IService):Promise<boolean|void>
}

