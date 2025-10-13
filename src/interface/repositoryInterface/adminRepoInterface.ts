import { IAdmin } from "../../types/adminTypes"
import { ICustomer } from "../../types/customerType"
import { IVendor } from "../../types/vendorType"



export interface IAdminRepo {

    checkAdminExist (email:string):Promise<boolean>
    adminDataByEmail (email:string):Promise<IAdmin>
    addAdmin(data:IAdmin):Promise<void>
    getCusomersData():Promise<ICustomer[]|[]>
    blockCustomer(_id:string):Promise<boolean>
    getVendorData():Promise<IVendor[]|[]>
    blockVendor(_id:string):Promise<boolean>

}