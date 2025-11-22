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


export interface INotification{
   _id?: string;

  recipient: string | mongoose.Types.ObjectId;
  recipientType: "User" | "Vendor";

  sender?: string | mongoose.Types.ObjectId;
  senderType?: "User" | "Vendor" | "System";

  category?: "booking" | "contract" | "message" | "system" | "payment";

  type:
    | "booking_confirmed"
    | "booking_cancelled"
    | "booking_completed"
    | "contract_applyied"
    | "contract_signed"
    | "message"
    | "system"
    | "payment_success"
    | "payment_failed";

  title: string;
  content: string;
  isRead?: boolean;

  metaData?: {
    bookingId?: string;
    serviceName?: string;
    date?: string;
    time?: string;
    contractName?: string;
  };

  createdAt: Date;
  updatedAt: Date;


}