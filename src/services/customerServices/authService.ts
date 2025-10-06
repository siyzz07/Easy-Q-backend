import { log } from "console";
import { MessageEnum } from "../../enums/messagesEnum";
import { ICustomerRepo } from "../../interface/repositoryInterface/customerInterface";
import { ICustomerInterface } from "../../interface/serviceInterface/customerServiceInterface";
import { ICustomer } from "../../types/customerType";
import { comparePassword, hashPassword } from "../../utils/hash";
import { accessToken, generateJwtToken, refreshToken } from "../../utils/jwt";
import { sendEmail } from "../../utils/nodeMailer";
import Jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";

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
        await sendEmail(
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

  customerLoginService = async (data: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; refreshToken: string } | void> => {
    try {
      const { email, password } = data;

      const checkCustomer = await this._customerRepository.checkCustomerExist(
        email
      );

      if (!checkCustomer) {
        throw new Error(MessageEnum.CUSTOMER_NOT_FOUND);
        return;
      }

      let customerData: any =
        await this._customerRepository.customerDataByEmail(email);

      if (customerData) {
        let passwordMatch = await comparePassword(
          password,
          customerData.password
        );

        if (!passwordMatch) {
          throw new Error(MessageEnum.INVALID_CREDENTIALS);
          return;
        }

        let AccessToken: string = accessToken(customerData._id);
        let RefreshToken: string = refreshToken(customerData._id);
        return { accessToken: AccessToken, refreshToken: RefreshToken };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      } else {
        console.log("customer login error", error);
      }
    }
  };

  updateToken = async (refreshToken: string): Promise<string> => {
      if (!refreshToken) {
        throw new Error("TOKEN_MISSING");
      }
  
      try {
       
        const decoded = Jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_TOKEN_KEY!
        ) as JwtPayload;
  
        console.log(decoded);
        const AccessToken = accessToken(decoded.userId)
       
        return AccessToken
        
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          throw new Error("TOKEN_EXPIRED");
        } else if (error instanceof JsonWebTokenError) {
          throw new Error("TOKEN_INVALID");
        } else {
          throw new Error("SERVER_ERROR");
        }
      }
    };
}

export default AuthService;
