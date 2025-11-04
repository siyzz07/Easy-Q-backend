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
      ref: "CustomerAddress",
      required: true,
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
    },
    bookingTime: {
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
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "COD", "payAtShop"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
  },
  {
    timestamps: true, 
  }
);

export const BookingModel = mongoose.model<IBooking>("Booking", bookingSchema);
