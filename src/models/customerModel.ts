import { model, Schema } from "mongoose";
import { ICustomer } from "../types/customerType";



const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default:true
    },
    isActive: {
      type: Boolean,
      default:true
    },
    password:{
      type:String
    }
  },
  { timestamps: true }
);


export default  model<ICustomer>("Customer",customerSchema)