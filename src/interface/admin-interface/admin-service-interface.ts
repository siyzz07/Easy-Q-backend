
import { CustomerDto } from "../../dto/customer-dto/customer-dto";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";


export interface IAdminServiceInterface {

  dashboard () :Promise<any>

  // Customer Management
  getCustomers(): Promise<CustomerDto[]>;
  blockCustomer(id: string): Promise<void>;

  // Vendor Management
  getVendors(): Promise<VendorDto[]>;
  blockVendor(id: string): Promise<void>;
  getPendingVendors(): Promise<VendorDto[]>;
  verifyVendor(id: string): Promise<void>;
  rejectVendor(id: string): Promise<void>;
 
}