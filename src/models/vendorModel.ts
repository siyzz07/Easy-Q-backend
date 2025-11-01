import mongoose, { model, Schema } from "mongoose";
import { IVendor } from "../types/vendorType";

const vendorSchema = new Schema<IVendor>(
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
    proofImage:{
          type: String,
    },
    password: {
      type: String,
    },
    shopType: {
      type: mongoose.Types.ObjectId,
      ref:'ServiceTypes'
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
      default:true
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
    isVerified:{
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",  
    }
  },
  { timestamps: true }
);

export default model<IVendor>("Vendor", vendorSchema);
