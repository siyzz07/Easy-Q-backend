import { TransactionDTO } from "../../dto/transaction-dto/transaction-dto"
import { IPaginationResponseMeta } from "../../types/common-types"




export interface ITransactionService {

    createTransaction (data:{bookingId:string,type?:string}):Promise<unknown>
    verifyPayment (data:{razorpay_payment_id:string,razorpay_order_id:string,razorpay_signature:string,userId:string}) :Promise<void>
    getTransactons(userId:string,query:{page?:string,limit?:string,filter?:string}):Promise<{data:TransactionDTO[] ,pagination:IPaginationResponseMeta}>


}