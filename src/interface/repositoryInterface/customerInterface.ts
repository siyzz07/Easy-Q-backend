import { ICustomer } from "../../types/customerType"




export interface ICustomerRepo{
    addNewCustomer(data:{name:string,email:string,phone:string,password:string,isVerified:boolean,isActive:boolean}) :Promise <boolean>,
    checkCustomerExist(email:string) :Promise<boolean>
    customerDataByEmail(email:string) :Promise <ICustomer|null>
    customerDataById(id:string) :Promise <ICustomer|null>
}