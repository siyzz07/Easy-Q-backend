import {ICustomer} from "../../types/customerType";
import { IService, IVendor } from "../../types/vendorType";





export interface ICustomerServiceInterface{

    getCustomerData (id:string):Promise<ICustomer|void>
    editProfile(data:{userId:string;name:string;email:string;phone:string}):Promise<boolean|void>
    updatePasswordInProfile(data:{currentPassword:string;userId:string;password:string}):Promise<boolean|void>


    
    
    

    //==========================================================


}



