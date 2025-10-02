import { log } from "console";
import { MessageEnum } from "../../enums/messagesEnum";
import { ICustomerRepo } from "../../interface/repositoryInterface/customerInterface";
import { ICustomerInterface } from "../../interface/serviceInterface/customerServiceInterface";
import { ICustomer } from "../../types/customerType";
import { hashPassword } from "../../utils/hash";
import { generateJwtToken } from "../../utils/jwt";
import { sendEmail } from "../../utils/nodeMailer";

class AuthService implements ICustomerInterface {
  private _customerRepository: ICustomerRepo;

  constructor(customerRepository: ICustomerRepo) {
    this._customerRepository = customerRepository;
  }

  //----------------------------------------------------------------------------------------verify user email
  verifyEmail = async (values: ICustomer): Promise<void> => {
    try {
      let { email, ...payload } = { ...values };

      let exist = await this._customerRepository.checkCustomerExist(email);

      if (exist) {
        throw new Error(MessageEnum.CUSTOMER_ALREADY_EXISTS);
      } else {
        let token = generateJwtToken(values);
        sendEmail(
          email,
          `http://localhost:5173/customer/verify-email?token=${token}`
        );
      }
    } catch (error: any) {
      console.log("error in addCustomerService");
      throw error;
    }
  };

  addCustomer = async (values: ICustomer): Promise<boolean> => {
    try {
      let { password, email, name, phone } = { ...values };

      let exist = await this._customerRepository.checkCustomerExist(email);

      if (!exist) {
        let hashedPassword = await hashPassword(password);

        let data = {
          name,
          phone,
          email,
          isVerified: true,
          isActive: true,
          password: hashedPassword,
        };

        let response = await this._customerRepository.addNewCustomer(data);

        if (response) {
          return true;
        } else {
          return false;
        }
      } else {
       throw new Error(MessageEnum.CUSTOMER_ALREADY_EXISTS);
      }
    } catch (error: any) {
      // console.log("error in addCustomerService");
      // console.log(error.message);
      
      throw error;
    }
  };
}

export default AuthService;
