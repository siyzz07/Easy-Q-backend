import { ContractDto } from "../../dto/contract-dto/contract-dto";
import { IAddContracValues, IContract } from "../../types/common-types";

export interface IContractServiceInterface {
    addNewContract(userId:string,contractData: IAddContracValues): Promise<ContractDto>;
    editContract(contractId: string, contractData: Partial<IContract>): Promise<ContractDto | null>;
    getContract(contractId: string): Promise<ContractDto | null>;
    getContracts(filter?: any): Promise<ContractDto[]>;
}
