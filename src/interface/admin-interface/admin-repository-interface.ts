import { IAdmin } from "../../types/adminTypes"
import { ICustomer } from "../../types/customerType"
import { IVendor } from "../../types/vendorType"



export interface IAdminRepo {

    checkAdminExist (email:string):Promise<boolean>
    adminDataByEmail (email:string):Promise<IAdmin | null>
    addAdmin(data:IAdmin):Promise<void>
    

}