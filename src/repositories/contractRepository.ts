import { FilterQuery, PopulateOptions } from "mongoose";
import { IContractRepositoryInterface } from "../interface/contract-interface/contract-respositlory-interface";
import { Contract } from "../models/contractModel";
import { IContract, IPaginationResponseMeta } from "../types/common-types";
import BaseRepository from "./baseRepository";
import { ContractDto } from "../dto/contract-dto/contract-dto";


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

    /**
     * 
     *  get customer contract data
     * 
     */
    async getCustomerContracts(customerId: string, query: { page?: string; limit?: string; search?: string; filter?: string; }): Promise<{ data: any[]; pagination: IPaginationResponseMeta; }> {

         const filter :FilterQuery<IContract> ={
                customerId:customerId
         }

        if(query.search?.trim().length){
            filter.$or=[
                {title:{$regex:query.search , $options:'i'}}
            ]
        }


        if(query.filter !== 'all'){
            filter.status == query.filter
            
        }

        const options ={
            page:Number(query.page)||1,
            limit:Number(query.limit)||9,
            sort:{createdAt:-1 as const}
        }

        const populate :PopulateOptions[] =[
            {path:'customerId'},
            {path:'service'},
            {path:'acceptedVendors'}
        ]


        let result = await this.filterWithPagination(options,filter,populate)
        return result

    }


}

export default ContractRepository;