import { CustomerDto } from "../../dto/customer-dto/customer-dto";

export const CustomerMapper = {
    toDTO(customer: any): CustomerDto {
        return {
            id: customer._id?.toString() || "",
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            isVerified: customer.isVerified,
            isActive: customer.isActive,
            createdAt: customer.createAt
        }
    },
    toDTOList(customers: any[]): CustomerDto[] {
        return customers.map(c => this.toDTO(c));
    }
}
