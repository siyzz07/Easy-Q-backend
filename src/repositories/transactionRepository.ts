import { ITransactionRepositoryInterface } from "../interface/transaction-interface/transaction-repository-interface";
import { TransactionModel } from "../models/transactionModel";
import { ITransaction } from "../types/common-types";
import BaseRepository from "./baseRepository";
import mongoose from 'mongoose';


export class TransactionRepository extends BaseRepository<ITransaction> implements ITransactionRepositoryInterface{


    private _TransactionModel = TransactionModel
    constructor(){
        super(TransactionModel)
    }

    async createTransaction(data: Partial<ITransaction>): Promise<ITransaction> {
         return await this.create(data as ITransaction)   
    }

    async getTransactionByuser(userId: string): Promise<ITransaction[]> {
         return await this.findManyByCondition({user: new mongoose.Types.ObjectId(userId)})
    }

}
