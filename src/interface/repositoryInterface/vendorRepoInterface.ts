import { IVendor } from "../../types/vendorType";


export interface IVendorRepo {

    addNewVendor(data:{shopName:string;email:string;phone:string;password:string,isActive:boolean}):Promise<boolean>
    checkVendorExist(email:string):Promise<boolean>
    vendorData(email:string):Promise<IVendor|any>
    vendorDatabyId(id:string) :Promise<IVendor|any>
    findByIdAndUpdate (id:string,data:object) :Promise<any>
    resetPassword (email:string,passowrd:string):Promise<void>
   


}