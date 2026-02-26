import { 
    ContractDto, 
    ContractCustomerDto, 
    ContractAddressDto, 
    ContractServiceDto, 
    ContractVendorDto 
} from "../../dto/contract-dto/contract-dto";

export interface IPopulatedContract {
    _id?: { toString(): string } | string;
    contractId?: string;
    title?: string;
    description?: string;
    budget?: number;

    status?: string | "open" | "in_progress" | "completed" | "cancelled" | "closed";
    isHiring?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    customerId?: {
        _id: { toString(): string } | string;
        name?: string;
        email?: string;
        phone?: string;
    } | { toString(): string } | string;

    address?: {
        _id?: string;
        address?: string;
        city?: string;
        state?: string;
        country?: string;
        phone?: string;
    };

    addressId?: {
        _id: { toString(): string } | string;
        address?: string;
        city?: string;
        state?: string;
        country?: string;
        phone?: string;
    };

    location?: {
        type: "Point";
        coordinates: number[];
    };

    service?: {
        _id: { toString(): string } | string;
        serviceName?: string;
        description?: string;
        price?: string;
        image?: string;
    };

    acceptedVendors?: Array<{
        _id: { toString(): string } | string;
        shopName?: string;
        email?: string;
        phone?: string;
        city?: string;
        ProfileImage?: string;
        rating?: number;
    } | { toString(): string } | string>;

    appliedVendors?: Array<{
        _id: { toString(): string } | string;
        shopName?: string;
        email?: string;
        phone?: string;
        city?: string;
        ProfileImage?: string;
        rating?: number;
    } | { toString(): string } | string>;
}

export const ContractMapper = {
    toDTO(contract: IPopulatedContract): ContractDto {
       
        const customer = contract.customerId && typeof contract.customerId !== "string" && "name" in contract.customerId 
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
                _id: contract.address._id || "",
                address: contract.address.address || "",
                city: contract.address.city || "",
                state: contract.address.state || "",
                country: contract.address.country || "",
                phone: contract.address.phone || ""
            };
        } else if (contract.addressId && contract.addressId.address) {
             address = {
                _id: contract.addressId._id.toString() || "",
                address: contract.addressId.address || "",
                city: contract.addressId.city || "",
                state: contract.addressId.state || "",
                country: contract.addressId.country || "",
                phone: contract.addressId.phone || ""
            };
        }

    
        const serviceType = contract.service && typeof contract.service !== "string" && "serviceName" in contract.service
            ? {
                 _id: contract.service._id.toString(),
                 serviceName: contract.service.serviceName,
                 description: contract.service.description,
                 price: contract.service.price,
                 image: contract.service.image
            } as ContractServiceDto
            : null;


        const acceptedVendors = contract.acceptedVendors && contract.acceptedVendors.length > 0
            ? contract.acceptedVendors.map((v) => {
                if (typeof v !== "string" && "shopName" in v && v.shopName) {
                    return {
                        _id: v._id.toString(),
                        shopName: v.shopName || "",
                        email: v.email || "",
                        phone: v.phone || "",
                        city: v.city || "",
                        profileImage: v.ProfileImage || "",
                        rating: v.rating?.toString() || "0"
                    } as ContractVendorDto;
                }
                return v.toString();
            })
            : [];

            const appliedVendors = contract.appliedVendors && contract.appliedVendors.length > 0
            ? contract.appliedVendors.map((v) => {
                if (typeof v !== "string" && "shopName" in v && v.shopName) {
                    return {
                        _id: v._id.toString(),
                        shopName: v.shopName || "",
                        email: v.email || "",
                        phone: v.phone || "",
                        city: v.city || "",
                        profileImage: v.ProfileImage || "",
                        rating: v.rating?.toString() || "0"
                    } as ContractVendorDto;
                }
                return v.toString();
            })
            : [];

        return {
            _id: contract._id ? contract._id.toString() : "",
            contractId: contract.contractId || "",
            customerId: customer,
            address: address,
            contractName: contract.title || "",
            description: contract.description || "",
            serviceType: serviceType,
            budget: contract.budget || 0,
            location: contract.location as { type: "Point", coordinates: number[] },
            acceptedVendors: acceptedVendors,
            appliedVendors:appliedVendors,
            status: contract.status || "open",
            isHiring: contract.isHiring ? "true" : "false",
            createdAt: contract.createdAt,
            updatedAt: contract.updatedAt 
        };
    },

    toDTOList(contracts: IPopulatedContract[]): ContractDto[] {
        return contracts.map((c) => this.toDTO(c));
    }
};

