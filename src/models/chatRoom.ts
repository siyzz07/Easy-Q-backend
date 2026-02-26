import { Schema, model } from "mongoose";
import { IChatRoom } from "../types/common-types";
;
const ChatRoomSchema = new Schema<IChatRoom>(
  {
    contractId: {
      type: Schema.Types.ObjectId,
      ref: "Contract",
      required: true,
      unique: true,
    },

    members: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
          refPath: "members.userType",
        },
        userType: {
          type: String,
          enum: ["Customer", "Vendor"],
          required: true,
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          required: true,
        },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);



export default model<IChatRoom>("ChatRoom", ChatRoomSchema);
