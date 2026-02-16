import { ContractDto } from "../../dto/contract-dto/contract-dto";
import { IAddContracValues, IPaginationResponseMeta, IUpdateContractValues } from "../../types/common-types";

export interface IContractServiceInterface {
    addNewContract(userId:string,contractData: IAddContracValues): Promise<ContractDto>;
    editContract(contractId: string,userId:string, contractData: Partial<IUpdateContractValues>): Promise<boolean | null>;
    getContract(contractId: string): Promise<ContractDto | null>;
    getContracts(filter?: any): Promise<ContractDto[]>;
    getCustomerContracts(customerId:string,query:{page?:string,limit?:string,search?:string, filter?:string}):Promise< {data:ContractDto[], pagination:IPaginationResponseMeta}>
    getVendorContractWorks (vendorId:string,query:{page?:string,limit?:string,filter?:string,search?:string,lat?:number,lng?:number,distance?:number}):Promise< {data:ContractDto[], pagination:IPaginationResponseMeta}>
    applyForContract (vendorId:string,contractId:string) :Promise<boolean>
    handleAppliedVendors (vendorId:string,contractId:string,decision:'accept'|'reject') :Promise<boolean>
    getVendorContracts (vendorId:string,query:{page?:string,limit?:string,search?:string}):Promise< {data:ContractDto[], pagination:IPaginationResponseMeta}>
    getVendorAppliedContracts (vendorId:string,query:{page?:string,limit?:string,search?:string}):Promise< {data:ContractDto[], pagination:IPaginationResponseMeta}>
    removeFromContract (vendorId:string , contractId:string) :Promise<boolean|void>

}
