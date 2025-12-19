import { Schema, model } from "mongoose";
import { IStaff } from "../types/vendorType";

const staffSchema = new Schema<IStaff>(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    staffName: {
      type: String,
      required: true,
    },
    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
    },
    breaks: [
      {
        breakStartTime: String,
        breakEndTime: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    blockedDates: {
      type: [Date],
      default: [],
    },
  },
  { timestamps: true }
);

export default model<IStaff>("Staff", staffSchema);
