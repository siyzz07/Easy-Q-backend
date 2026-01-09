import { IAdminRepo } from "../../interface/admin-interface/admin-repository-interface";
import { IAdminServiceInterface } from "../../interface/admin-interface/admin-service-interface";
import { ICustomerRepo } from "../../interface/customer-interface/customer-repository-interface";
import { IVendorRepo } from "../../interface/vendor-interface/vendor-respository-interface";
import { IVendor } from "../../types/vendorType";
import { CustomerDto } from "../../dto/customer-dto/customer-dto";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";
import { CustomerMapper } from "../../mappers/customer-mapper/customer-mapper";
import { VendorMapper } from "../../mappers/vendor-mapper/vendor-mapper";

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
  
  getCustomers = async (): Promise<CustomerDto[]> => {
    const result = await this._customerRepository.getCusomersData();
    return CustomerMapper.toDTOList(result);
  }

  blockCustomer = async (id: string): Promise<void> => {
    await this._customerRepository.blockCustomer(id);
  }

  // ------------------------- Vendor Management -------------------------

  getVendors = async (): Promise<VendorDto[]> => {
    const result = await this._vendorRepository.getVendorData();
    return VendorMapper.toDTOList(result);
  }

  blockVendor = async (id: string): Promise<void> => {
    await this._vendorRepository.blockVendor(id);
  }

  getPendingVendors = async (): Promise<VendorDto[]> => {
    const vendors = await this._vendorRepository.getVendorData();
    const pending = vendors.filter((v) => v.isVerified === "pending");
    return VendorMapper.toDTOList(pending);
  }

  verifyVendor = async (id: string): Promise<void> => {
    await this._vendorRepository.verifyVendor(id);
  }

  rejectVendor = async (id: string): Promise<void> => {
    await this._vendorRepository.rejectVendor(id);
  }

}
