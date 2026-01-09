import { ITransaction } from "../../types/common-types";


export interface ITransactionRepositoryInterface {
    
    createTransaction (data:Partial<ITransaction>):Promise<ITransaction>
    getTransactionByuser(userId:string):Promise<ITransaction[]>
}