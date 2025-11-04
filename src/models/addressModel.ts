import mongoose, { model, Schema } from "mongoose";
import { ICustomerAddress } from "../types/customerType";

const addressShcema = new Schema<ICustomerAddress>({
  customerId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Customer",
  },
  address: [
    {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      coordinates: {
        lat: { type: String, required: true },
        lng: { type: String, required: true },
      },
      isDefault: {
        type: Boolean,
        default: false,
      },
    },
  ],
});


export default model<ICustomerAddress> ('Address',addressShcema)