export interface BookingResponseDTO {
  id: string;
  customerId: string;
  shopId: string;
  serviceId: string;
  customerAddressId: string;
  staffId?: string;
  bookingTime: string;
  bookingDate: string;
  status: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}


export interface CreateBookingDTO {
    userId?:string;
  customerId: string;
  shopId: string;
  serviceId: string;
  customerAddressId: string;
  staffId: string;
  bookingDate: string;
  bookingTime: string;
  totalAmount: number;
  paymentMethod: string;
}
