import { IAdmin } from "../../types/adminTypes";




export interface IAdminAuthServiceInterface {


    loginAdmin (data:IAdmin):Promise<{ accessToken: string; refreshToken: string } | void>
    updateToken(token:string):Promise<string>



}