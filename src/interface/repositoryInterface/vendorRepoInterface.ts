import { IServiceType } from "../../types/adminTypes";
import { IService, IStaff, IVendor } from "../../types/vendorType";


export interface IVendorRepo {
    addNewVendor(data:{shopName:string;email:string;phone:string;password:string,isActive:boolean}):Promise<boolean>
    checkVendorExist(email:string):Promise<boolean>
    vendorData(email:string):Promise<IVendor|any>
    vendorDatabyId(id:string) :Promise<IVendor|any>
    findByIdAndUpdate (id:string,data:object) :Promise<any>
    resetPassword (email:string,passowrd:string):Promise<void>
    vendorTypeData():Promise<IServiceType[]|null>
    deleteVendor (email:string):Promise<null>
}


//----------------------------------------------------vendor staff 
export interface IStaffRepositoryInterface {
    addStaff (data:IStaff):Promise<boolean>
    getStaff (shopId:string):Promise<IStaff []|[]>
    getSingleStaff(shopId:string,staffName?:string,staffId?:string):Promise<IStaff|null>
    editStaff(shopId:string,_id:string,data:IStaff):Promise <boolean|void>
    duplicateStaffFind(shopId:string,staffName:string,staffId?:string):Promise <IStaff[]|[]>

}


//----------------------------------------------------vendor shop service
export interface IServiceRepositoryInterface{
    addService(data:IService):Promise<boolean>
    getService(shopId:string):Promise<IService[]|[]>
    editService(_id:string,data:IService):Promise<boolean>
}