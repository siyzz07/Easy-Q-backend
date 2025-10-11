import { model, Schema } from "mongoose";
import { IVendor } from "../types/vendorType";

const vendorShecma = new Schema<IVendor>(
  {
    shopName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    type: {
      type: String,
    },
    openAt: {
      type: String,
    },
    closeAt: {
      type:String ,
    },
    state:{
      type:String
    },
    city:{
      type:String
    },
    workingDays: {
      type: String,
    },
    ProfileImage: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    images: {
      type: [String],
    },
    hasShop:{
      type:Boolean,
      default:false
    },
    cordinates: {
      lat: { type: String },
      lon: { type: String },
    },
    planExpreData: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default model<IVendor>("Vendor", vendorShecma);
