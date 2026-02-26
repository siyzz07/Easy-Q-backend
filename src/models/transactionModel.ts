import mongoose, { Schema } from "mongoose";
import { ITransaction } from "../types/common-types";
import { TransactionStatusEnum } from "../enums/transactionEnum";





const transactionSchema = new Schema<ITransaction>(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    

    user: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath:'userType'
    },
    
    userType: {
      type: String,
      enum: ["customer", "vendor"],
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
      type: Number,
      required: true,
    },
    
    status: {
      type: String,
      enum: Object.values(TransactionStatusEnum)
    },
  },
  { timestamps: true }
);

export const TransactionModel = mongoose.model("Transaction",transactionSchema)