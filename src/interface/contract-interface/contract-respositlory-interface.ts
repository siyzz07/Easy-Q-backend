import { ContractDto } from "../../dto/contract-dto/contract-dto";
import { IContract, IPaginationResponseMeta } from "../../types/common-types";

 export interface IContractRepositoryInterface {

    addNewContract (data:Partial<IContract>):Promise<IContract>
    editContract(contractId:string, data:Partial<IContract>):Promise<IContract | null>
    getContract(contractId: string): Promise<IContract | null>
    getContracts(filter?: any): Promise<IContract[]>

    getCustomerContracts(customerId:string, query:{page?:string,limit?:string,search?:string, filter?:string}):Promise<{data:ContractDto[] , pagination:IPaginationResponseMeta}>
    getVendorWrokWithPaginationAndLocation (vendorId:string,serviceType:string,query:{page?:string,limit?:string,search?:string,lat?:number,lng?:number,distance?:number,postedWithin:string}):Promise< {data:any[], pagination:IPaginationResponseMeta}>
    applyForAContract (vendorId:string,contractId:string):Promise<boolean>
    removeFromContractRequest (contractId:string,vendorId:string):Promise<boolean>
    acceptVendorForContract (contractId:string,vendorId:string):Promise<boolean>
 }