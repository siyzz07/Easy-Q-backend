export interface VendorDto {
  _id: string;
  shopName: string;
  email: string;
  phone: string;
  ProfileImage: string;
  city: string;
  openAt: string;
  closeAt: string;
  isActive: boolean;
  isVerified: string;
  cordinates: any;       
  hasShop: boolean;
  images: string[];
  state:string
  workingDays:string[]
}