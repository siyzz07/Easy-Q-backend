import { ITransactionRepositoryInterface } from "../interface/transaction-interface/transaction-repository-interface";
import { TransactionModel } from "../models/transactionModel";
import { ITransaction } from "../types/common-types";
import BaseRepository from "./baseRepository";


export class TransactionRepository extends BaseRepository<any> implements ITransactionRepositoryInterface{


    private _TransactionModel = TransactionModel
    constructor(){
        super(TransactionModel)
    }

    async createTransaction(data: Partial<ITransaction>): Promise<ITransaction> {
         return await this.create(data)   
    }

    async getTransactionByuser(userId: string): Promise<ITransaction[]> {
         return await this.findManyByCondition({user:userId})
    }

}

