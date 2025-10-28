import { IAdminRepo } from "../../interface/repositoryInterface/adminRepoInterface";
import { IAdminServiceInterface } from "../../interface/serviceInterface/adminServiceInterface";
import { ICustomer } from "../../types/customerType";
import { IVendor } from "../../types/vendorType";

export class AdminService implements IAdminServiceInterface {
  private _adminRepository: IAdminRepo;

  constructor(adminRepo: IAdminRepo) {
    this._adminRepository = adminRepo;
  }

  getCustomersDatas = async (): Promise<ICustomer[] | []> => {
    const result = await this._adminRepository.getCusomersData();
    return result;
  };

  //--------------------------------------------------blokc customer
  blockCustomer = async (customerId: string): Promise<boolean | void> => {
    const result = await this._adminRepository.blockCustomer(customerId);

    return result;
  };

  //--------------------------------------------------get vendros data service
  getVendorsDatas = async (): Promise<IVendor[] | []> => {
    const result = await this._adminRepository.getVendorData();
    return result;
  };

  //--------------------------------------------------block vendr data service
  blockVendor = async (customerId: string): Promise<boolean | void> => {
    const result = await this._adminRepository.blockVendor(customerId);

    return result;
  };
  //--------------------------------------------------get vendors request
  getVendorsVerification = async (): Promise<IVendor[] | []> => {
    const result = await this.getVendorsDatas();

    if (result) {
      let data = result.filter(
        (value: IVendor) => value.isVerified == "pending"
      );
      return data;
    } else {
      return [];
    }
  };

  //--------------------------------------------------reject vendor request
  rejectVendorRequst = async (_id: string): Promise<boolean | void> => {
    const result = await this._adminRepository.rejectVendor(_id);
    return result;
  };

  //--------------------------------------------------verify vendor request
  verifyVendorRequst = async (_id: string): Promise<boolean | void> => {
    const result = await this._adminRepository.verifyVendor(_id);
    return result;
  };

  //--------------------------------------------------handle dashboard data
  dashboard = async (): Promise<any> => {
    let vendorsData = await this._adminRepository.getVendorData();
    let customerData = await this._adminRepository.getCusomersData();

    let pendingVendors = vendorsData.reduce((acc: number, vendor: IVendor) => {
      if (vendor.isVerified === "pending") {
        acc += 1;
      }
      return acc;
    }, 0);

    let verifiedVendors =  vendorsData.reduce((acc: number, vendor: IVendor) => {
      if (vendor.isVerified === "verified") {
        acc += 1;
      }
      return acc;
    }, 0);


    let rejectedVendors =  vendorsData.reduce((acc: number, vendor: IVendor) => {
      if (vendor.isVerified === "rejected") {
        acc += 1;
      }
      return acc;
    }, 0);

    let totalVednors = verifiedVendors+pendingVendors
    let totalCutomers = customerData.length

    return ({totalCutomers,totalVednors,pendingVendors,verifiedVendors,rejectedVendors})
    

  };
}
