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
}
