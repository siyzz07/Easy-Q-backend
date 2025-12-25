import mongoose, { Schema, Document } from "mongoose";
import { INotification } from "../types/common-types";


const notificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      refPath: "recipientType",
      required: true,
    },

    recipientType: {
      type: String,
      enum: ["Customer", "Vendor"],
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      refPath: "senderType",
      required: false,
    },

    senderType: {
      type: String,
      enum: ["Customer", "Vendor"],
      default: "System",
    },

    category: {
      type: String,
      enum: ["booking", "contract", "message", "system", "payment"],
      default: "system",
    },

    type: {
      type: String,
      enum: [
        "booking_confirmed",
        "booking_cancelled",
        "booking_completed",
        "contract_applyied",
        "contract_signed",
        "message",
        "system",
        "payment_success",
        "payment_failed",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    metaData: {
      bookingId: { type: String },
      serviceName: { type: String },
      date: { type: String },
      time: { type: String },
      contractName: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INotification>("Notification", notificationSchema);
