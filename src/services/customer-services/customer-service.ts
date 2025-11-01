import { log } from "console";
import { MessageEnum } from "../../enums/messagesEnum";
import { ICustomerRepo } from "../../interface/repositoryInterface/customerInterface";
import { ICustomerServiceInterface } from "../../interface/serviceInterface/customerServiceInterface";
import { ICustomer } from "../../types/customerType";
import { IService, IVendor } from "../../types/vendorType";
import { comparePassword, hashPassword } from "../../utils/hash";

export class CustomerService implements ICustomerServiceInterface {
  private _customerRepository: ICustomerRepo;

  constructor(customerRepo: ICustomerRepo) {
    this._customerRepository = customerRepo;
  }

  //----------------------------------------------------------------get vendors data
  getVendorsData = async (): Promise<IVendor[] | null> => {
    try {
      const response = await this._customerRepository.getVendorsData();
      
      if (!response || response.length === 0) {
        return null;
      }
      
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Get vendors data error:", error.message);
      }
      return null;
    }
  };
  
  //----------------------------------------------------------------get customer data
  getCustomerData = async (id: string): Promise<ICustomer | void> => {
    try {
      const response: ICustomer | null =
      await this._customerRepository.customerDataById(id);
      if (response) {
        return response;
      } else {
        throw new Error(MessageEnum.CUSTOMER_DATA_FETCH_FAILED);
      }
    } catch (error: unknown) {
      if (error) {
        throw error;
      }
    }
  };
  
  //----------------------------------------------------------------edit profile
  editProfile = async (data: {
    userId: string;
    name: string;
    email: string;
    phone: string;
  }): Promise<boolean|void> => {
    const result = await this._customerRepository.editProfile(data);
    
    if (result) {
      return true;
    } else {
      throw new Error(MessageEnum.SERVER_ERROR)
    }
  };
  //----------------------------------------------------------------reset password in profile
  updatePasswordInProfile = async (data: { currentPassword: string; userId: string; password: string; }): Promise<boolean | void> =>{
    
      const {userId,password,currentPassword} =data
      const customer = await this._customerRepository.customerDataById(userId)
      if(!customer){
        throw new Error(MessageEnum.CUSTOMER_NOT_FOUND)
      }

      const customerPassword = customer.password

      const checkCorrectPassword = await comparePassword(currentPassword,customerPassword)
     
      
      if(!checkCorrectPassword){
        throw new Error(MessageEnum.INVALID_PASSWORD)
      }
      
      const hashedPassword = await hashPassword(password)
      await this._customerRepository.resetPassword(customer.email,hashedPassword)
      return true



  }

  //---------------------------------------------------------------- get each vendor data
  getEachVendorData = async (data: string): Promise<IVendor | void>  => {
    
    console.log(data );
    
    const result = await this._customerRepository.getEachVendorData(data)
    if(result){
      return result
    }else{
      throw new Error(MessageEnum.VENDOR__DATA_FETCH_FAILED)
    }
    
  }
  //---------------------------------------------------------------- get each vendor services
  getEachVendorServices = async (data: string): Promise<IService[] | []> =>{
    const result = await this._customerRepository.getEachvendorServices(data)
    return result
  }
}
