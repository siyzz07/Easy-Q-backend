import mongoose, { Schema } from "mongoose";
import { ITransaction } from "../types/common-types";
import { string } from "joi";
import { TransactionStatusEnum } from "../enums/transactionEnum";





const transactionSchema = new Schema<ITransaction>(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    
    // Who this transaction belongs to
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    
    ownerType: {
      type: String,
      enum: ["customer", "vendor", "admin"],
      required: true,
    },
    
    flow: {
      type: String,
      enum: ["debit", "credit"],
      required: true,
    },
    
    transactionType: {
      type: String,
      enum: ["razorpay", "wallet"],
      required: true,
    },
    
    amount: {
      type: String,
      required: true,
    },
    
    status: {
      type: String,
      enum: Object.values(TransactionStatusEnum),
      default: TransactionStatusEnum.CREATED,
    },
  },
  { timestamps: true }
);

export const TransactionModel = mongoose.model("Transaction",transactionSchema)