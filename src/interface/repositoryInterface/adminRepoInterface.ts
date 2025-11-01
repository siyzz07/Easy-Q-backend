import { IAdmin, IServiceType } from "../../types/adminTypes"
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
    rejectVendor(_id:string):Promise<boolean>
    verifyVendor(_id:string):Promise<boolean>

}



//----------------------------------------------------------service repository interface the service that given by adimin for each vendro
export interface IServiceTypesRepositoryInterface{
        addServiceType (data:{serviceName:string;description:string,isActive:boolean}):Promise<boolean>
        getServices():Promise<IServiceType[]|[]>
        editServiceType(_id:string,data: { serviceName: string; description: string; }): Promise<boolean>
        
    
}