import { ITransactionRepositoryInterface } from "../interface/transaction-interface/transaction-repository-interface";
import { TransactionModel } from "../models/transactionModel";
import BaseRepository from "./baseRepository";


export class TransactionRepository extends BaseRepository<any> implements ITransactionRepositoryInterface{


    private _TransactionModel = TransactionModel
    constructor(){
        super(TransactionModel)
    }
}