import { model, Schema } from "mongoose";
import { IStaff } from "../types/vendorType";



const staffSchema = new Schema<IStaff>(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    staffName: {
      type: String,
      required: true,
     
    },
    openingTime: {
      type: String,
      
    },
    
    closingTime: {
      type: String,
      
    },
    breakStartTime: {
      type: String,
      
    },
    breakEndTime: {
      type: String,
      
    },
    isActive: {
      type: Boolean,
      
    },
    
    bookingTimes:{
      type:String,
    },

    bookingBlocks: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default model<IStaff>('Staff',staffSchema)