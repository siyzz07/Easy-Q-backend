import mongoose, { ObjectId } from "mongoose";

interface IZone {
  lat: string;
  lon: string;
}

export interface IVendor {
  shopName?: string;
  proofImage?:string;
  email?: string;
  phone?: string;
  password?: string;
  country?: string;
  state?: string;
  city?: string;
  shopType?: string;
  openAt?: string;
  closeAt?: string;
  workingDays?: string;
  cordinates?: IZone;
  ProfileImage?: string;
  images?: string[];
  isActive?: boolean;
  planExpreData?: Date;
  createAt?: Date;
  updatedAt?: Date;
  hasShop?: boolean;
  isVerified?:"pending" | "verified" | "rejected"; 
  
}

export interface IShopData {
  state: string;
  city: string;
  shopType: string;
  openAt: any;
  closeAt: any;
  profileImage: any;
  workingDays: string;
}


export interface IStaff {
  _id?: string;
  shopId: ObjectId |string;
  staffName: string;
  openingTime: string;
  closingTime: string;
  breakStartTime: string;
  breakEndTime: string;
  isActive?: boolean;
  bookingBlocks?: string[];
  userId?:string
}

export interface IStaffAdd{
  staffName:string;
  openingTime:string;
  closingTime:string;
  breakStartTime:string,
  breakEndTime:string
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