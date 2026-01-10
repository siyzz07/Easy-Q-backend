import { IPaginationResponseMeta, ITransaction } from "../../types/common-types";


export interface ITransactionRepositoryInterface {
    
    createTransaction (data:Partial<ITransaction>):Promise<ITransaction>
    getTransactionByuser(userId:string, query:{page?:string,limit?:string,filter?:string}):Promise<{data:ITransaction[] ,pagination:IPaginationResponseMeta}>
    
}