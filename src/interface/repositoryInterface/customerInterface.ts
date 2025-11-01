import { IAddress, ICustomer, ICustomerAddress } from "../../types/customerType"
import { IService, IVendor } from "../../types/vendorType"




export interface ICustomerRepo{
    addNewCustomer(data:ICustomer) :Promise <boolean>,
    checkCustomerExist(email:string) :Promise<boolean>
    customerDataByEmail(email:string) :Promise <ICustomer|null>
    customerDataById(id:string) :Promise <ICustomer|null>
    resetPassword (email:string,passowrd:string):Promise<void>
    getVendorsData() :Promise<IVendor[]|null>
    editProfile(data:{userId:string;name:string;email:string;phone:string}):Promise<boolean>
    getEachVendorData(_id:string):Promise<IVendor|null>
    getEachvendorServices(_shopId:string):Promise<IService[]|[]>

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