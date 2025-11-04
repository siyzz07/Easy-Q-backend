import { IAddress, ICustomerAddress } from "../../types/customerType"





export interface ICustomerAddressRepositoryInterface{
    
    checkUserAddressExist (customerId:string):Promise<boolean>
    addAddress (id:string,payload:IAddress):Promise<void>
    addFirstAddress(id:string,payload:IAddress):Promise<void>
    getAllAddress (custoemrId:string):Promise<ICustomerAddress|null>
    checkAddressDuplicat (userId:string,address:string,excludeId?:string):Promise<boolean>
    deletCustomerAddress (customerId:string,id:string) :Promise<boolean>
    editCustomerAddress (customerId:string,addressId:string,payload:IAddress):Promise<boolean>
    // getSelectedAddress (customerId:string,addressId:string):Promise<IAddress>
    

    }