import { CustomerDto } from "../../dto/customer-dto/customer-dto";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";
import { IPaginationResponseMeta } from "../../types/common-types";
import { IVendor } from "../../types/vendorType";

export interface IAdminServiceInterface {
  dashboard(): Promise<any>;

  getVendors(): Promise<VendorDto[]>;
  getVendorsPagination(query: {
    page?: string;
    limit?: string;
    search?: string;
  }): Promise<{ data: IVendor[]; pagination: IPaginationResponseMeta }>;
  blockVendor(id: string): Promise<void>;
  getPendingVendors(): Promise<VendorDto[]>;
  getCustomers(): Promise<CustomerDto[]>;
  blockCustomer(id: string): Promise<void>;
  verifyVendor(id: string): Promise<void>;
  rejectVendor(id: string): Promise<void>;
}
