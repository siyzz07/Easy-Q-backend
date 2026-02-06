import { razorpayConfig } from "../../config/razorpayConfig";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { IBookingRopsitoryInterface } from "../../interface/booking-interface/booking-repository-interface";
import { ITransactionRepositoryInterface } from "../../interface/transaction-interface/transaction-repository-interface";
import { ITransactionServiceInterface } from "../../interface/transaction-interface/transaction-service-interface";
import { ErrorResponse } from "../../utils/errorResponse";
import crypto from "crypto";
import logger from "../../utils/logger";
import { IPaginationResponseMeta } from "../../types/common-types";


import { TransactionMapper } from "../../mappers/transaction-mapper/transaction-mapper";
import { TransactionDTO } from "../../dto/transaction-dto/transaction-dto";

export class TransactionService implements ITransactionServiceInterface {
  private _TransactionRepository: ITransactionRepositoryInterface;
  private _BookingRepository: IBookingRopsitoryInterface;

  constructor(
    transactionRepository: ITransactionRepositoryInterface,
    bookingRepositroy: IBookingRopsitoryInterface
  ) {
    this._TransactionRepository = transactionRepository;
    this._BookingRepository = bookingRepositroy;
  }

  /**
   *  creae new Transaction
   *
   */
  createTransaction = async (data: {
    bookingId: string;
    type: string;
  }): Promise<any> => {
    const { bookingId, type } = data;

    const booking = await this._BookingRepository.getEachBookingDataById(
      bookingId
    );

    if (!booking) {
      throw new ErrorResponse(
        MessageEnum.BOOKING_ID_INVALIED,
        StatusCodeEnum.BAD_REQUEST
      );
    }

    const amount = booking.totalAmount;
    const order = await razorpayConfig.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return order;
  };

  /**
   *  verify payment
   *
   */

  verifyPayment = async (data: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    userId: string;
  }): Promise<any> => {
    const body = data.razorpay_order_id + "|" + data.razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== data.razorpay_signature) {
      logger.error("invalied payment signature");
      throw new ErrorResponse(
        MessageEnum.TRANSACTION_PAYMENT_INVALIED,
        StatusCodeEnum.BAD_REQUEST
      );
    }
  };

   /**
   *  getTranasactons
   *
   */
  getTransactons = async (userId: string,query:{page?:string,limit?:string,filter?:string}):Promise<{data:TransactionDTO[] ,pagination:IPaginationResponseMeta}> => {

      const result = await this._TransactionRepository.getTransactionByuser(userId,query)
      const mappedData = result.data.map((transaction)=> TransactionMapper.toDTO(transaction));

      return {
        data:mappedData,
        pagination:result.pagination
      }

  }
}
