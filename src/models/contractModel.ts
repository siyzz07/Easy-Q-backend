import { Schema, model, Types } from "mongoose";
import { IContract } from "../types/common-types";
import { ContractStatusEnum } from "../enums/contractEnum";

const ContractSchema = new Schema<IContract>({
  contractId: {
    type: String,
    required: true,
    unique: true 
  },

  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },

  addressId: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

   services:{
      type: Schema.Types.ObjectId,
      ref:'ServiceTypes'
   },

  budget: {
    type: Number,
    required: true
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  },

  acceptedVendors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vendor"
    }
  ],

  status: {
    type: String,
    enum: ContractStatusEnum,
    default: "open"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


ContractSchema.index({ location: "2dsphere" });

export const Contract = model("Contract", ContractSchema);
