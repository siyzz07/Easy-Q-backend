export interface CustomerDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt?: Date;
}
