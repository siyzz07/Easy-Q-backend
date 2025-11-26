import mongoose from "mongoose";
import { VendorDto } from "../vendor-dto/vendor-dto";


export interface FavoriteRquestDto{
    shopId:string;
    action:'add'|'remove';
    customerId:string
}


export interface getFavoriteReqDto{
    customerId:string
}

export interface getFavoriteResDto{
    _id:string;
    vendors:mongoose.Types.ObjectId[]
}

export interface getFavoriteShopesResDto{
    vendors:VendorDto[]
}