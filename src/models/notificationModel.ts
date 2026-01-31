import mongoose, { Schema, Document, model, mongo } from "mongoose";
import { INotification } from "../types/common-types";


const notificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "recipientType",
    },

    recipientType: {
      type: String,
      enum: ["Customer", "Vendor"],
      required: true,
    },

    

    category: {
      type: String,
      enum: ["booking", "contract", "message", "system", "payment"],
      default: "system",
    },

    type: {
      type: String,
      enum: [
        "booking_rescheduled",
        "new_booking",
        "booking_cancelled",
        "booking_completed",
        "contract_applied",
        "contract_approved",
        "contract_rejected",
        "contract_cancelled",
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
      booking: {
        id: String,
        date: String,
        time: String,
      },
      contract: {
        id: String,
        name: String,
      },
      message: {
        chatId: String,
        senderId: String,
      },
      payment: {
        amount: Number,
        method: String,
        transactionId: String,
      },
      extra: {
        type: Object,
        default: {},
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model<INotification>("Notification", notificationSchema);
