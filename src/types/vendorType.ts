import mongoose, { ObjectId } from "mongoose";
import { Schema, Document, Types } from "mongoose";

interface IZone {
  lat: string;
  lon: string;
}

export interface IImage {
    url: string;
    publicId: string;
  }

export interface IVendor {
  shopName?: string;
  proofImage?:string;
  // userId?:string;
  email?: string;
  phone?: string;
  password?: string;
  country?: string;
  state?: string;
  city?: string;
  shopType?: string;
  openAt?: string;
  closeAt?: string;
  workingDays?: string[];
  cordinates?: IZone;
  ProfileImage?: string;
  images?:IImage[];
  isActive?: boolean;
  planExpreData?: Date;
  createAt?: Date;
  updatedAt?: Date;
  hasShop?: boolean;
  isVerified?:"pending" | "verified" | "rejected"; 
  role?:string
  
}

export interface IShopData {
  state: string;
  city: string;
  shopType: string;
  openAt: any;
  closeAt: any;
  profileImage: any;
  workingDays: string[]|string;
}


interface IBreakTime{
  breakStartTime:string;
  breakEndTime:string
}


export interface IStaff {
  _id?: string;
  shopId: ObjectId |string;
  staffName: string;
  openingTime: string;
  closingTime: string;
  breaks:IBreakTime[]
  isActive?: boolean;
  blockedDates?: [];
  userId?:string;
}

export interface IStaffAdd{
  staffName:string;
  openingTime:string;
  closingTime:string;
  breaks:IBreakTime[]
}


export interface IService {
  _id?:string;
  userId?:string
  shopId:mongoose.Types.ObjectId;
  image:string;
  serviceName:string;
  description:string;
  duration:string;
  price:string
  isActive:boolean;
  availableStaff:mongoose.Types.ObjectId[] 
}


export interface IServiceData {
  _id?:string;
  userId?:string
  shopId:mongoose.Types.ObjectId;
  image:string;
  serviceName:string;
  description:string;
  duration:string;
  price:string
  isActive:boolean;
  availableStaff:IStaff[]|[]
}


export interface IReview extends Document {
  customerId: Types.ObjectId;
  vendorId: Types.ObjectId;
  rating: string;
  createdAt?: Date;
  comment:string
}