import { ICustomer } from "../../types/customerType"
import { IVendor } from "../../types/vendorType"




export interface ICustomerRepo{
    addNewCustomer(data:{name:string,email:string,phone:string,password:string,isVerified:boolean,isActive:boolean}) :Promise <boolean>,
    checkCustomerExist(email:string) :Promise<boolean>
    customerDataByEmail(email:string) :Promise <ICustomer|null>
    customerDataById(id:string) :Promise <ICustomer|null>
    resetPassword (email:string,passowrd:string):Promise<void>

    getVendorsData() :Promise<IVendor[]|null>

}