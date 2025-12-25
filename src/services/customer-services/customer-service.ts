import { log } from "console";
import { MessageEnum } from "../../enums/messagesEnum";

import { ICustomer } from "../../types/customerType";
import { IService, IVendor } from "../../types/vendorType";
import { comparePassword, hashPassword } from "../../utils/hash";
import { ICustomerRepo } from "../../interface/customer-interface/customer-repository-interface";
import { ICustomerServiceInterface } from "../../interface/customer-interface/customer-service-interface";
import { ErrorResponse } from "../../utils/errorResponse";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import logger from "../../utils/logger";
import { sendEmail } from "../../utils/nodeMailer";

export class CustomerService implements ICustomerServiceInterface {
  private _customerRepository: ICustomerRepo

  constructor(customerRepo: ICustomerRepo) {
    this._customerRepository = customerRepo;
  }


  //----------------------------------------get customer data
  getCustomerData = async (id: string): Promise<ICustomer | void> => {
      const response: ICustomer | null =
      await this._customerRepository.customerDataById(id);
      if (response) {
        return response;
      } else {
        throw new ErrorResponse(MessageEnum.CUSTOMER_DATA_FETCH_FAILED,StatusCodeEnum.NOT_FOUND)
      }
  };
  
  //----------------------------------------edit profile
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
      logger.error('failed to edit customer profile ')
      throw new ErrorResponse(MessageEnum.SERVER_ERROR,StatusCodeEnum.INTERNAL_SERVER_ERROR)
    }
  };


  //----------------------------------------reset password in profile
  updatePasswordInProfile = async (data: { currentPassword: string; userId: string; password: string; }): Promise<boolean | void> =>{
    
      const {userId,password,currentPassword} =data
      const customer = await this._customerRepository.customerDataById(userId)
      if(!customer){
        throw new ErrorResponse(MessageEnum.CUSTOMER_NOT_FOUND,StatusCodeEnum.NOT_FOUND)
      }

      const customerPassword = customer.password

      const checkCorrectPassword = await comparePassword(currentPassword,customerPassword)
     
      
      if(!checkCorrectPassword){
        throw new ErrorResponse(MessageEnum.INVALID_PASSWORD,StatusCodeEnum.BAD_REQUEST)
      }
      
      const hashedPassword = await hashPassword(password)
      await this._customerRepository.resetPassword(customer.email,hashedPassword)
      return true



  }

  //=======================================================================


  //---------------------------------------- get all cutomer data
   getCustomersDatas = async (): Promise<ICustomer[] | []> => {
    const result = await this._customerRepository.getCusomersData();
    return result;
  };

  //---------------------------------------- block customer by admin
  blockCustomer = async (customerId: string): Promise<boolean | void> => {
    const result = await this._customerRepository.blockCustomer(customerId);

    return result;
  };
}
