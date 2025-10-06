import { IAdmin } from "../../types/adminTypes"



export interface IAdminRepo {

    checkAdminExist (email:string):Promise<boolean>
    adminDataByEmail (email:string):Promise<IAdmin>
    addAdmin(data:IAdmin):Promise<void>



}