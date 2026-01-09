export interface ServiceResponseDTO {
  id: string;
  serviceName: string;
  shopId: string;
  duration: string;
  description: string;
  price: string;
  image: string;
  isActive: boolean;
  availableStaff: any[]; 
}
