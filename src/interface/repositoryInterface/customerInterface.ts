import { IAddress, ICustomer, ICustomerAddress } from "../../types/customerType"
import { IVendor } from "../../types/vendorType"




export interface ICustomerRepo{
    addNewCustomer(data:{name:string,email:string,phone:string,password:string,isVerified:boolean,isActive:boolean}) :Promise <boolean>,
    checkCustomerExist(email:string) :Promise<boolean>
    customerDataByEmail(email:string) :Promise <ICustomer|null>
    customerDataById(id:string) :Promise <ICustomer|null>
    resetPassword (email:string,passowrd:string):Promise<void>
    getVendorsData() :Promise<IVendor[]|null>
    editProfile(data:{userId:string;name:string;email:string;phone:string}):Promise<boolean>

}



export interface ICustomerAddressRepositoryInterface{
    
    checkUserAddressExist (customerId:string):Promise<boolean>
    addAddress (id:string,payload:IAddress):Promise<void>
    addFirstAddress(id:string,payload:IAddress):Promise<void>
    getAllAddress (custoemrId:string):Promise<ICustomerAddress|null>
    checkAddressDuplicat (userId:string,address:string,excludeId?:string):Promise<boolean>
    deletCustomerAddress (customerId:string,id:string) :Promise<boolean>
    editCustomerAddress (customerId:string,addressId:string,payload:IAddress):Promise<boolean>
    

    }