import { IContract } from "../../types/common-types";
import { 
    ContractDto, 
    ContractCustomerDto, 
    ContractAddressDto, 
    ContractServiceDto, 
    ContractVendorDto 
} from "../../dto/contract-dto/contract-dto";

export const ContractMapper = {
    toDTO(contract: any): ContractDto {
       
        const customer = contract.customerId && contract.customerId.name 
            ? {
                _id: contract.customerId._id.toString(),
                name: contract.customerId.name,
                email: contract.customerId.email,
                phone: contract.customerId.phone
            } as ContractCustomerDto
            : (contract.customerId ? contract.customerId.toString() : "");

  
        const address = contract.addressId && contract.addressId.address
            ? {
                _id: contract.addressId._id.toString(),
                address: contract.addressId.address,
                city: contract.addressId.city,
                state: contract.addressId.state,
                country: contract.addressId.country,
                phone: contract.addressId.phone
            } as ContractAddressDto
            : (contract.addressId ? contract.addressId.toString() : "");

    
        const services = contract.services && contract.services.length > 0
            ? contract.services.map((s: any) => {
                if (s.serviceName) {
                    return {
                        _id: s._id.toString(),
                        serviceName: s.serviceName,
                        description: s.description,
                        price: s.price,
                        image: s.image
                    } as ContractServiceDto;
                }
                return s.toString();
            })
            : [];

    
        const acceptedVendors = contract.acceptedVendors && contract.acceptedVendors.length > 0
            ? contract.acceptedVendors.map((v: any) => {
                if (v.shopName) {
                    return {
                        _id: v._id.toString(),
                        shopName: v.shopName,
                        email: v.email,
                        phone: v.phone,
                        city: v.city,
                        profileImage: v.ProfileImage || ""
                    } as ContractVendorDto;
                }
                return v.toString();
            })
            : [];

        return {
            _id: contract._id ? contract._id.toString() : "",
            contractId: contract.contractId,
            customerId: customer,
            addressId: address,
            title: contract.title,
            description: contract.description,
            services: services,
            budget: contract.budget,
            location: contract.location,
            acceptedVendors: acceptedVendors,
            status: contract.status,
            createdAt: contract.createdAt,
            updatedAt: contract.updatedAt 
        };
    },

    toDTOList(contracts: any[]): ContractDto[] {
        return contracts.map((c) => this.toDTO(c));
    }
};

