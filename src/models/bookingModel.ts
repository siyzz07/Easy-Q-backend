// models/BookingModel.ts
import mongoose, { Schema } from "mongoose";
import { IBooking } from "../types/common-types";
const bookingSchema = new Schema<IBooking>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    bookingId:{
      type:String,
      unique:true
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    customerAddressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
    },
    bookingTimeStart: {
      type: String,
      required: true,
    },
     bookingTimeEnd: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    totalAmount: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "payAtShop",'wallet'],
    },
    paymentStatus: {
      type: String,
      enum: ["pending","paid", "failed", "refunded"],
    },
    expireAt: {
      type: Date,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);


bookingSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const BookingModel = mongoose.model<IBooking>("Booking", bookingSchema);