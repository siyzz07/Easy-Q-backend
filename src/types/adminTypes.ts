
import mongoose from "mongoose";


export interface IAdmin {
   _id?:string,
   email:string,
   password:string
   role?:string
}


export interface IServiceType{
   _id?:string|mongoose.Types.ObjectId;
   serviceName:string;
   description:string;
   isActive:boolean
}