
import { Request, Response } from "express";
import { ITransactionServiceInterface } from "../../interface/transaction-interface/transaction-service-interface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

export class TransactionController {
  private _TransactionService: ITransactionServiceInterface;

  constructor(transactionService: ITransactionServiceInterface) {
    this._TransactionService = transactionService;
  }

  /**
   *
   *  in razorpay order createing
   *
   */
  public createPaymentIntent = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { bookingId, type } = req.body;
    const response = await this._TransactionService.createTransaction({
      bookingId,
      type,
    });

    res.status(StatusCodeEnum.OK).json({ success: true, result: response });
  };

  /**
   *
   *  verify the razorpay payment
   *
   */

  verifyPament = async (req: Request, res: Response): Promise<void> => {
    await this._TransactionService.verifyPayment(req.body);

    res.status(StatusCodeEnum.OK).json({ success: true });
  };

  /**
   *
   *  get transactons
   *
   */
  getTransactions = async (req: Request, res: Response): Promise<void> => {
    const result = await this._TransactionService.getTransactons(
      req.body.userId,
      req.query
    );

    res
      .status(StatusCodeEnum.OK)
      .json({
        success: true,
        data: result.data,
        pagination:result.pagination,
        message: MessageEnum.TRANSACTION_FETCH_SUCCESS,
      });
  };
}
