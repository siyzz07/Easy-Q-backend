import { Types } from "mongoose";



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
  lon: string;
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
  coordiantes:any
  userId?:string
}

