
import stripe from "../../config/stripeConfig";



import { Request, Response } from "express";
import { ITransactionServiceInterface } from "../../interface/transaction-interface/transaction-service-interface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";


export class TransactionController {

  private _TransactionService :ITransactionServiceInterface

    constructor (transactionService:ITransactionServiceInterface){
      this._TransactionService=transactionService
    }


  public createPaymentIntent = async (
    req: Request,
    res: Response
  ): Promise<void> => {

      const {bookingId,type} = req.body
      const response = await this._TransactionService.createTransaction({bookingId,type})
      
      res
        .status(StatusCodeEnum.OK)
        .json({ success:true, result:response})

  };


  verifyPament = async (req:Request,res:Response) :Promise<void> =>{

    await this._TransactionService.verifyPayment(req.body)

      res
        .status(StatusCodeEnum.OK)
        .json({success:true})
  }




}
