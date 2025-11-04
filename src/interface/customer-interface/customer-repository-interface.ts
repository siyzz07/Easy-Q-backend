import { IAddress, ICustomer, ICustomerAddress } from "../../types/customerType"
import { IService, IVendor } from "../../types/vendorType"




export interface ICustomerRepo{
    addNewCustomer(data:ICustomer) :Promise <boolean>,
    checkCustomerExist(email:string) :Promise<boolean>
    customerDataByEmail(email:string) :Promise <ICustomer|null>
    customerDataById(id:string) :Promise <ICustomer|null>
    resetPassword (email:string,passowrd:string):Promise<void>
    editProfile(data:{userId:string;name:string;email:string;phone:string}):Promise<boolean>
    
 
//----------------------------------------------------------------------------------
    getCusomersData():Promise<ICustomer[]|[]> //--------------------
    blockCustomer(_id:string):Promise<boolean> //--------------------


    
}
