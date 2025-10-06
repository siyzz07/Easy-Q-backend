

import { model, Schema } from "mongoose";
import { IAdmin } from "../types/adminTypes";




const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type:String
    }
  },

);


export default  model<IAdmin>("Admin",adminSchema)