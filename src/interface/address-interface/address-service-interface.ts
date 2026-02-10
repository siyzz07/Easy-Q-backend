import { IAddress} from "../../types/customerType";



export interface ICustomerAddressServiceInterface{

   addAddress (data:IAddress):Promise<void>
   getAddress (customerId:string):Promise<IAddress[]|[]>
   deletCustomerAddress (custoemrId:string,id:string):Promise<string|void>
   editCustomerAddress(data:IAddress):Promise<boolean|void>
   getEachAddress(customerId:string,addressId:string):Promise<IAddress|void>
   

}