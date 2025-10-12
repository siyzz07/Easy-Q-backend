


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


interface ICustomerZone {
  lat: string;
  lon: string;
}

export interface ICustomerAddressData {

  address:string;
  city:string;
  state:string;
  country:string;
  phone:string;
  cordinates:ICustomerZone;
  isDefaule:boolean


}


export interface ICustomerAddress {

    _id?:string;
    customerId:string;
    address:ICustomerAddressData[]

}