import { IAddress, ICustomer} from "../../types/customerType";
import { IService, IVendor } from "../../types/vendorType";


export interface ICustomerAddressServiceInterface{

   addAddress (data:IAddress):Promise<void>
   getAddress (customerId:string):Promise<IAddress[]|[]>
   deletCustomerAddress (custoemrId:string,id:string):Promise<string|void>
   editCustomerAddress(data:IAddress):Promise<boolean|void>
   

}