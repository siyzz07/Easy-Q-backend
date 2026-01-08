import mongoose, { model, Schema } from "mongoose";
import { IWallet } from "../types/common-types";

const walletSchema = new Schema<IWallet>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "userType",
    },

    userType: {
      type: String,
      enum: ["Vendor", "Customer"],
      required: true,
    },

    balance: {
      type: Number,
      default: 0,
      min: 0,
    }
  },
  { timestamps: true }
);

export default model<IWallet>("Wallet", walletSchema);