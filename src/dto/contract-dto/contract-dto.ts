import mongoose from "mongoose";

export interface  ContractCustomerDto {
    _id: string;
    name: string;
    email: string;
    phone: string;
    // profileImage?: string; // Add if available
}

export interface ContractAddressDto {
    _id: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
}

export interface ContractServiceDto {
    _id: string;
    serviceName: string;
    description: string;
    price: string;
    image: string;
}

export interface ContractVendorDto {
    _id: string;
    shopName: string;
    email: string;
    phone: string;
    city: string;
    profileImage: string;
    rating:string
}

export interface ContractDto {
    _id?: mongoose.Types.ObjectId|string;
    contractId: string;
    customerId: ContractCustomerDto | string;
    address: ContractAddressDto | null;
    contractName: string;
    description: string;
    serviceType: ContractServiceDto | null;
    budget: number;
    location: {
        type: "Point";
        coordinates: number[];
    };
    acceptedVendors: (ContractVendorDto | string)[];
    appliedVendors:(ContractVendorDto | string)[]
    status: string;
    isHiring:string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ContractResponseDto {
    message: string;
    data?: ContractDto | ContractDto[];
}

