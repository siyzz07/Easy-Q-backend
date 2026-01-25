import { IContractRepositoryInterface } from "../interface/contract-interface/contract-respositlory-interface";
import { Contract } from "../models/contractModel";
import { IContract } from "../types/common-types";
import BaseRepository from "./baseRepository";


class ContractRepository extends BaseRepository<IContract> implements IContractRepositoryInterface {
        private _ContractModel = Contract
    constructor (){
        super(Contract)
    }


    async addNewContract(data: Partial<IContract>): Promise<IContract> {
        return await this.create(data as IContract);

    }
    
    async editContract(contractId: string, data: Partial<IContract>): Promise<IContract | null> {
        return await this._ContractModel.findOneAndUpdate({ contractId: contractId }, data, { new: true }).exec();
    }


    async getContract(contractId: string): Promise<IContract | null> {
        return await this._ContractModel.findOne({ contractId: contractId })
            .populate("customerId")
            .populate("addressId")
            .populate("services")
            .populate("acceptedVendors")
            .exec();
    }

    async getContracts(filter: any = {}): Promise<IContract[]> {
        return await this._ContractModel.find(filter)
            .populate("customerId")
            .populate("addressId")
            .populate("services")
            .populate("acceptedVendors")
            .exec();
    }



}

export default ContractRepository;