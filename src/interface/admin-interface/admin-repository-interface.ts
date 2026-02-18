import { IAdmin } from "../../types/adminTypes"




export interface IAdminRepositoryInterface {

    checkAdminExist (email:string):Promise<boolean>
    adminDataByEmail (email:string):Promise<IAdmin | null>
    addAdmin(data:IAdmin):Promise<void>
    

}