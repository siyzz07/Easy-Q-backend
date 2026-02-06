import mongoose, { ObjectId } from "mongoose";
import {  Document } from "mongoose";



export interface IGeoLocation {
  type: "Point";
  coordinates: number[];
}

export interface IImage {
    url: string;
    publicId: string;
  }

export interface IVendor {
  _id?:string
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
  location?: IGeoLocation;
  ProfileImage?: string;
  images?:IImage[];
  isActive?: boolean;
  rating?:number
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
  customerId: mongoose.Types.ObjectId | string;
  vendorId: mongoose.Types.ObjectId | string;
  rating: string;
  createdAt?: Date;
  comment:string
}