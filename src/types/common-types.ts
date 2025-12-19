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


export interface ITimeCheck{
  staffId:string;
  timePreffer:string;
  date:string;
  userId:string;
  serviceId:string;
  addressId:string;
  shopId:string

}


export interface IBooking {
  _id?:  string
  customerId: mongoose.Types.ObjectId;
  userId?:string
  shopId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  customerAddressId: mongoose.Types.ObjectId;
  staffId?: mongoose.Types.ObjectId; 
  bookingTimeStart: string; 
  bookingTimeEnd: string; 
  bookingDate: string; 
  status:string;
  totalAmount: string;
  paymentMethod: string,
  paymentStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
  expireAt?:Date|null
}


export interface INotification {
  _id?: string;

  recipient: string | mongoose.Types.ObjectId;
  recipientType: "User" | "Vendor";


  category?: "booking" | "contract" | "message" | "system" | "payment";

  type:
    | "new_booking"
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
    booking?: {
      id?: string;
      date?: string;
      time?: string;
    };

    contract?: {
      id?: string;
      name?: string;
    };

    message?: {
      chatId?: string;
      senderId?: string;
    };

    payment?: {
      amount?: number;
      method?: string;
      transactionId?: string;
    };

    extra?: Record<string, any>;
  };

  createdAt: Date;
  updatedAt: Date;
}
