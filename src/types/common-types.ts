import mongoose from "mongoose";


export interface IJwtPayload {
    userId:string;
    role:string
}


export interface ILogin{
    email:string
    password:string
    role:string
}





export interface IBooking {
  _id?:  string
  customerId: mongoose.Types.ObjectId;
  userId?:string
  shopId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  customerAddressId: mongoose.Types.ObjectId;
  staffId?: mongoose.Types.ObjectId; 
  bookingTime: any; 
  bookingDate: string; 
  status:string;
  totalAmount: number;
  paymentMethod: string,
  paymentStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
}