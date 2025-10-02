import mongoose, { model, Schema } from "mongoose";


interface IOtp{
    email:string;
    otp:string;
    createdAt:Date
}



const otpSchema = new Schema({
    email :{
        type:String,
        required:true,
        unique :true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:300
    }
})

export default model<IOtp>("Otp",otpSchema)