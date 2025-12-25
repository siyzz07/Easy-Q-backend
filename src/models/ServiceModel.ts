import mongoose, { model, Schema } from "mongoose";
import { IService } from "../types/vendorType";



const serviceSchema = new mongoose.Schema<IService>({
    shopId:{
        type:Schema.Types.ObjectId,
        ref:'Vendor',
        required:true
    },
    serviceName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    duration:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    availableStaff:[
        {
            type:Schema.Types.ObjectId,
            ref:'Staff'
        }
    ],
    isActive:{
        type:Boolean,
        default:true
    }

})


export default model<IService>('Service',serviceSchema)