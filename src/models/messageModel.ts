import mongoose, { Schema } from "mongoose";
import { IMessage } from "../types/common-types";



const MessageSchema = new Schema<IMessage>({
  chatRoomId: {
    type: Schema.Types.ObjectId,
    ref: "ChatRoom",
    required: true
  },

  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "senderRole"
  },

  senderRole: {
    type: String,
    required: true,
    enum: ["Vendor", "Customer"]
  },

  text: String,

  attachments: [
    {
      url: String,
      type: { type: String, enum: ["image"] }
    }
  ]

}, { timestamps: true });

export default mongoose.model('Message',MessageSchema)