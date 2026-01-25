import { IContract } from "../../types/common-types";

 export interface IContractRepositoryInterface {

    addNewContract (data:Partial<IContract>):Promise<IContract>
    editContract(contractId:string, data:Partial<IContract>):Promise<IContract | null>
    getContract(contractId: string): Promise<IContract | null>
    getContracts(filter?: any): Promise<IContract[]>

 }