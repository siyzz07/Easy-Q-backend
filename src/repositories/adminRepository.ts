import { IAdminRepo } from "../interface/repositoryInterface/adminRepoInterface";
import { IBaseRepositoryInterface } from "../interface/repositoryInterface/baseInterface";
import adminModel from "../models/adminModel";
import { IAdmin } from "../types/adminTypes";
import BaseRepository from "./baseRepository";


export class AdminRepository extends BaseRepository<any> implements IAdminRepo{

   private _adminModel = adminModel

   constructor(){
      super(adminModel)
   }


    async  checkAdminExist(email: string): Promise<boolean> {
        
     const admin = await this.findByEmail(email)

     return !!admin

   }


   async adminDataByEmail(email: string): Promise<IAdmin> {

       const adminData = await this.findByEmail(email)
      
       return adminData

   }

   async addAdmin(data:IAdmin):Promise<void>{

     const add = await this.create(data)

   }


}