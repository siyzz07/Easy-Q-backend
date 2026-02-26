import mongoose, { Types } from "mongoose";
import { IVendor } from "./vendorType";



export interface ICustomer {
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  isActive: boolean;
  password:string
  createAt?: Date;
  updatedAt?: Date;
  _id?:string
  role?:string
}


interface ICustomerZone {
  lat: string;
  lng: string;
}

export interface ICustomerAddressData {

  address:string;
  city:string;
  state:string;
  country:string;
  phone:string;
  coordinates:ICustomerZone;
  isDefaule:boolean


}


export interface ICustomerAddress {

    _id?:string;
    customerId:Types.ObjectId
    address:IAddress[]|[]

}


export interface IAddress{
  _id?:string
  address:string;
  city:string
  state:string;
  country:string;
  phone:string;
  coordinates:{
    lat:string;
    lng:string
  }
  userId?:string
}


export interface IFavorite{
  _id?:string;
  customerId:mongoose.Types.ObjectId
  vendors: mongoose.Types.ObjectId[];
}

export interface IFavoritePopulated {
  _id?: string;
  customerId: mongoose.Types.ObjectId;
  vendors: IVendor[];
}