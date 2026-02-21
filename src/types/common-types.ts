import mongoose, {  SortOrder } from "mongoose";
import { ChatRoleEnum } from "../enums/role";
import { ICustomer, ICustomerAddressData } from "./customerType";
import { IService, IStaff, IVendor } from "./vendorType";
import { TransactionTypeEnum, TransactionStatusEnum, TransactionOwnerTypeEnum } from "../enums/transactionEnum";

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
  bookingId:string,
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
  reschedule?:number
}


 export interface IBookingPopulated {
   _id?:  string
  bookingId:string,
  customerId:ICustomer;
  shopId:IVendor;
  serviceId:IService;
  customerAddressId:ICustomerAddressData;
  staffId?:IStaff; 
  bookingTimeStart: string; 
  bookingTimeEnd: string; 
  bookingDate: string; 
  status:string;
  totalAmount: string;
  paymentMethod: string,
  paymentStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
  expireAt?:Date|null,
  reschedule :string
}

export interface INotification {
  _id?: string;

  recipient: string | mongoose.Types.ObjectId;
  recipientType: "Customer" | "Vendor";


  category?: "booking" | "contract" | "message" | "system" | "payment";

  type:
    | "new_booking"
    | "booking_cancelled"
    | "booking_completed"
    |'booking_rescheduled'
    | "contract_applied"
    |"contract_approved"
    |"contract_rejected"
    |"contract_cancelled"
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


export interface IPaginationMeta {
  page?: number;
  limit?: number;
  sort?:  Record<string, SortOrder>;
}

export interface IPaginationResponseMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}







export interface ITransaction extends Document {
    referenceId?: string;
    bookingId: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    userType: TransactionOwnerTypeEnum;
    flow:string
    transactionType: TransactionTypeEnum;
    amount: number;
    status: TransactionStatusEnum;
    createdAt: Date;
    updatedAt: Date;
}



export interface IWallet {
  user: mongoose.Types.ObjectId;
  userType: "Vendor" | "Customer";
  balance: number;

}




export interface IContract {
  _id?: mongoose.Types.ObjectId;
  contractId: string;
  customerId: mongoose.Types.ObjectId;
  address: {
    _id:string
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
  };
  title: string;
  description: string;
  service:mongoose.Types.ObjectId;
  budget: number;

  location: {
    type: "Point";
    coordinates: number[]; 
  };


  acceptedVendors: mongoose.Types.ObjectId[];
  appliedVendors: mongoose.Types.ObjectId[]
  status: "open" | "in_progress" | "completed" | "cancelled"|"closed";
  isHiring:boolean
  createdAt: Date;
}



export interface IUpdateContractValues {
  contractName: string;
  description: string;
  phone: string;
  address: string;
  serviceType: string;
  status: ContractStatusEnum;
  isHiring: boolean;
}

export interface IAddContracValues {
  contractName: string;
  description: string;
  phone: string;
  address: string;
  serviceType: string;
}




export interface IChatMember {
  userId: mongoose.Types.ObjectId;
  userType: "Customer" | "Vendor";
  role: ChatRoleEnum;
}

export interface IChatRoom {
  _id?: mongoose.Types.ObjectId;
  contractId: mongoose.Types.ObjectId;
  members: IChatMember[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


import { Types } from "mongoose";
import { ContractStatusEnum } from "../enums/contractEnum";

export type SenderModelType = "Vendor" | "Customer";

export interface IMessage {
  _id?: Types.ObjectId;
  chatRoomId: Types.ObjectId;
  sender: Types.ObjectId;
  senderRole: SenderModelType;
  text?: string;
  attachments?: {
    url: string;
    type: "image" ;
  }[];

  createdAt?: Date;
  updatedAt?: Date;
}

