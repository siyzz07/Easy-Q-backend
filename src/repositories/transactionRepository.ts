import { options } from "joi";
import { ITransactionRepositoryInterface } from "../interface/transaction-interface/transaction-repository-interface";
import { TransactionModel } from "../models/transactionModel";
import { IPaginationResponseMeta, ITransaction } from "../types/common-types";
import BaseRepository from "./baseRepository";
import mongoose, { FilterQuery, PopulateOption, PopulateOptions } from 'mongoose';


export class TransactionRepository extends BaseRepository<ITransaction> implements ITransactionRepositoryInterface{


    private _TransactionModel = TransactionModel
    constructor(){
        super(TransactionModel)
    }

    async createTransaction(data: Partial<ITransaction>): Promise<ITransaction> {
         return await this.create(data as ITransaction)   
    }

    async getTransactionByuser(userId: string,query:{page?:string,limit?:string,filter?:string}):Promise<{data:ITransaction[] ,pagination:IPaginationResponseMeta   }> {

        const filter :FilterQuery<ITransaction>={
            user:userId
        }

        if(query.filter != 'all'){
            filter.$or=[
                {flow :{$regex:query.filter ,$options:'i'}}
            ]
        }


        const populate :PopulateOptions[]=[
            {path:'bookingId',


                populate:[
                    {path:'shopId'},
                    {path:'serviceId' ,select:'serviceName'}
                ]
            },

        ]


            const options = {
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
            sort: { createdAt: -1 as const },
             };

             const result = await this.filterWithPagination(options,filter,populate)
                
             return result

    }

}
