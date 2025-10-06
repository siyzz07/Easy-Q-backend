interface IZone {
  lat: string;
  lon: string;
}

export interface IVendor {
  shopName?: string;
  email?: string;
  phone?: string;
  password?: string;
  country?: string;
  state?: string;
  city?: string;
  type?: string;
  openAt?: string;
  closeAt?: string;
  workingDays?: string;
  cordinates?: IZone;
  profileImage?: string;
  images?: string[];
  isActive?: boolean;
  planExpreData?: Date;
  createAt?: Date;
  updatedAt?: Date;
  hasShop?:boolean
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

