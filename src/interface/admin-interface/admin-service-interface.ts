
import { ICustomer } from "../../types/customerType";
import { IVendor } from "../../types/vendorType";


export interface IAdminServiceInterface {

  dashboard () :Promise<any>

  // Customer Management
  getCustomers(): Promise<ICustomer[]>;
  blockCustomer(id: string): Promise<void>;

  // Vendor Management
  getVendors(): Promise<IVendor[]>;
  blockVendor(id: string): Promise<void>;
  getPendingVendors(): Promise<IVendor[]>;
  verifyVendor(id: string): Promise<void>;
  rejectVendor(id: string): Promise<void>;
 
}