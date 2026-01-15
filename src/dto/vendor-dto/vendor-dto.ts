import { IImage } from "../../types/vendorType";

export interface VendorDto {
  _id: string;
  shopName: string;
  email: string;
  phone: string;
  ProfileImage?:string;
  city: string;
  openAt: string;
  closeAt: string;
  isActive: boolean;
  isVerified: string;
  location?: {
    type: string;
    coordinates: number[];
  };
  hasShop: boolean;
  images: IImage[];
  state:string
  workingDays:string[];
  rating:number,
  proofImage:string
}