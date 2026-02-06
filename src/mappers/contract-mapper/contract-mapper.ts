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

  
        let address: ContractAddressDto | null = null;

        if (contract.address && contract.address.address) {
            address = {
                _id:contract.address._id,
                address: contract.address.address,
                city: contract.address.city,
                state: contract.address.state,
                country: contract.address.country,
                phone: contract.address.phone
            };
        } else if (contract.addressId && contract.addressId.address) {
             address = {
                _id: contract.addressId._id.toString(),
                address: contract.addressId.address,
                city: contract.addressId.city,
                state: contract.addressId.state,
                country: contract.addressId.country,
                phone: contract.addressId.phone
            };
        }

    
        const serviceType = contract.service && contract.service.serviceName
            ? {
                 _id: contract.service._id.toString(),
                 serviceName: contract.service.serviceName,
                 description: contract.service.description,
                 price: contract.service.price,
                 image: contract.service.image
            } as ContractServiceDto
            : null;


        const acceptedVendors = contract.acceptedVendors && contract.acceptedVendors.length > 0
            ? contract.acceptedVendors.map((v: any) => {
                if (v.shopName) {
                    return {
                        _id: v._id.toString(),
                        shopName: v.shopName,
                        email: v.email,
                        phone: v.phone,
                        city: v.city,
                        profileImage: v.ProfileImage || "",
                         rating:v.rating
                    } as ContractVendorDto;
                }
                return v.toString();
            })
            : [];

            const appliedVendors = contract.appliedVendors && contract.appliedVendors.length > 0
            ? contract.appliedVendors.map((v: any) => {
                if (v.shopName) {
                    return {
                        _id: v._id.toString(),
                        shopName: v.shopName,
                        email: v.email,
                        phone: v.phone,
                        city: v.city,
                        profileImage: v.ProfileImage || "",
                        rating:v.rating
                    } as ContractVendorDto;
                }
                return v.toString();
            })
            : [];

        return {
            _id: contract._id ? contract._id.toString() : "",
            contractId: contract.contractId,
            customerId: customer,
            address: address,
            contractName: contract.title,
            description: contract.description,
            serviceType: serviceType,
            budget: contract.budget,
            location: contract.location,
            acceptedVendors: acceptedVendors,
            appliedVendors:appliedVendors,
            status: contract.status,
            isHiring:contract.isHiring,
            createdAt: contract.createdAt,
            updatedAt: contract.updatedAt 
        };
    },

    toDTOList(contracts: any[]): ContractDto[] {
        return contracts.map((c) => this.toDTO(c));
    }
};

