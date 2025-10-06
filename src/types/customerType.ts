


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
}