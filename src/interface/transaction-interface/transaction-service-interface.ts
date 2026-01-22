import { TransactionDTO } from "../../dto/transaction-dto/transaction-dto"
import { IPaginationResponseMeta, ITransaction } from "../../types/common-types"




export interface ITransactionServiceInterface {

    createTransaction (data:{bookingId:string,type:string}):Promise<any>
    verifyPayment (data:{razorpay_payment_id:string,razorpay_order_id:string,razorpay_signature:string,userId:string}) :Promise<any>
    getTransactons(userId:string,query:{page?:string,limit?:string,filter?:string}):Promise<{data:TransactionDTO[] ,pagination:IPaginationResponseMeta}>


}