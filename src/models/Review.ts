import mongoose, { Schema } from "mongoose";
import { IReview } from "../types/vendorType";



const reviewSchema = new Schema<IReview>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    rating: {
      type: String,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default  mongoose.model<IReview>("Review", reviewSchema);