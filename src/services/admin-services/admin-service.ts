import { IAdminRepo } from "../../interface/admin-interface/admin-repository-interface";
import { IAdminServiceInterface } from "../../interface/admin-interface/admin-service-interface";
import { ICustomerRepo } from "../../interface/customer-interface/customer-repository-interface";
import { IVendorRepo } from "../../interface/vendor-interface/vendor-respository-interface";
import { ICustomer } from "../../types/customerType";
import { IVendor } from "../../types/vendorType";

export class AdminService implements IAdminServiceInterface {
  private _adminRepository: IAdminRepo;
  private _customerRepository: ICustomerRepo;
  private _vendorRepository: IVendorRepo;

  constructor(
    adminRepo: IAdminRepo,
    customerRepo: ICustomerRepo,
    vendorRepo: IVendorRepo
  ) {
    this._adminRepository = adminRepo;
    this._customerRepository = customerRepo;
    this._vendorRepository = vendorRepo;
  }



  /**
   * 
   *  Admin dashboard
   * 
   */
  dashboard = async (): Promise<any> => {
    const vendorsData = await this._vendorRepository.getVendorData();
    const customerData = await this._customerRepository.getCusomersData();

    const pendingVendors = vendorsData.reduce(
      (acc: number, vendor: IVendor) => {
        if (vendor.isVerified === "pending") {
          acc += 1;
        }
        return acc;
      },
      0
    );

    const verifiedVendors = vendorsData.reduce(
      (acc: number, vendor: IVendor) => {
        if (vendor.isVerified === "verified") {
          acc += 1;
        }
        return acc;
      },
      0
    );

    const rejectedVendors = vendorsData.reduce(
      (acc: number, vendor: IVendor) => {
        if (vendor.isVerified === "rejected") {
          acc += 1;
        }
        return acc;
      },
      0
    );

    const totalVednors = verifiedVendors + pendingVendors;
    const totalCutomers = customerData.length;

    return {
      totalCutomers,
      totalVednors,
      pendingVendors,
      verifiedVendors,
      rejectedVendors,
    };
  };

  // ------------------------- Customer Management -------------------------
  
  getCustomers = async (): Promise<ICustomer[]> => {
    return await this._customerRepository.getCusomersData();
  }

  blockCustomer = async (id: string): Promise<void> => {
    await this._customerRepository.blockCustomer(id);
  }

  // ------------------------- Vendor Management -------------------------

  getVendors = async (): Promise<IVendor[]> => {
    return await this._vendorRepository.getVendorData();
  }

  blockVendor = async (id: string): Promise<void> => {
    await this._vendorRepository.blockVendor(id);
  }

  getPendingVendors = async (): Promise<IVendor[]> => {
    const vendors = await this._vendorRepository.getVendorData();
    return vendors.filter((v) => v.isVerified === "pending");
  }

  verifyVendor = async (id: string): Promise<void> => {
    await this._vendorRepository.verifyVendor(id);
  }

  rejectVendor = async (id: string): Promise<void> => {
    await this._vendorRepository.rejectVendor(id);
  }

}
