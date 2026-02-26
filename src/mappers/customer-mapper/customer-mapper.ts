import { CustomerDto } from "../../dto/customer-dto/customer-dto";
import { ICustomer } from "../../types/customerType";

export const CustomerMapper = {
    toDTO(customer: ICustomer): CustomerDto {
        return {
            id: customer._id?.toString() || "",
            name: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || "",
            isVerified: customer.isVerified || false,
            isActive: customer.isActive || false,
            createdAt: customer.createAt || new Date()
        }
    },
    toDTOList(customers: ICustomer[]): CustomerDto[] {
        return customers.map(c => this.toDTO(c));
    }
}
