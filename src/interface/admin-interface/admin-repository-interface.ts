import { IAdmin } from "../../types/adminTypes"




export interface IAdminRepo {

    checkAdminExist (email:string):Promise<boolean>
    adminDataByEmail (email:string):Promise<IAdmin | null>
    addAdmin(data:IAdmin):Promise<void>
    

}