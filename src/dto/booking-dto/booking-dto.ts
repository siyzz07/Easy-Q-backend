export interface BookingResponseDTO {
  id: string;  
  bookingId:string,
  customerId: string;
  shopId: string;
  serviceId: string;
  customerAddressId: string;
  staffId?: string;
  bookingTimeStart: string;
  bookingTimeEnd: string;
  bookingDate: string;
  status: string;
  totalAmount: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}


export interface CreateBookingDTO {
  userId?:string;
  bookingId:string
  totalAmount: number;
  paymentMethod: string;
  status:string
}


export interface checkTimeDto{
  staffId:string;
  timePreffer:string;
  date:string;
  serviceId:string;
  customerId:string;
  addressId:string;
  shopId:string;
}


export interface bookingDatasPopulatedDto {
  id: string;
  bookingId: string;

  date: string;
  startTime: string;
  endTime: string;
  status: string;

  totalAmount: string;
  paymentMethod: string;
  paymentStatus: string;

  customer: CustomerDTO;
  shop: VendorDTO;
  service: ServiceDTO;
  address?: CustomerAddressDTO | null;
  staff?: StaffDTO | null;

  createdAt?: Date;
  updatedAt?: Date;
}





//-----------------------
export interface CustomerDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  isActive: boolean;
}


export interface VendorDTO {
  id: string;
  shopName?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  profileImage?: string;
  isVerified?: "pending" | "verified" | "rejected";
  workingDays:string[]
  rating?:number

}



export interface ServiceDTO {
  id: string;
  name: string;
  price: string;
  duration: string;
  image: string;
}


export interface CustomerAddressDTO {
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  isDefault: boolean;
}


export interface StaffDTO {
  id: string;
  name: string;
  openingTime: string;
  closingTime: string;
  isActive?: boolean;
}