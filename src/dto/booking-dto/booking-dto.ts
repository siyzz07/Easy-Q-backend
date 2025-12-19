export interface BookingResponseDTO {
  id: string;
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