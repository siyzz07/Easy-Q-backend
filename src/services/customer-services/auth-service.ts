
import { MessageEnum } from "../../enums/messagesEnum";
import { ICustomerRepo } from "../../interface/repositoryInterface/customerInterface";
import { ICustomerInterface } from "../../interface/serviceInterface/customerServiceInterface";
import { ICustomer } from "../../types/customerType";
import { comparePassword, hashPassword } from "../../utils/hash";
import { accessToken, generateJwtToken, refreshToken } from "../../utils/jwt";
import { sendEmail } from "../../utils/nodeMailer";
import Jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { IJwtPayload } from "../../types/common-types";


class AuthService implements ICustomerInterface {
  private _customerRepository: ICustomerRepo;

  constructor(customerRepository: ICustomerRepo) {
    this._customerRepository = customerRepository;
  }

  //----------------------------------------------------------------------------------------verify user email
  verifyEmail = async (values: ICustomer): Promise<void> => {
    try {

      console.log(values);
      
      const { email } = { ...values };

    
      const exist = await this._customerRepository.checkCustomerExist(email);

      if (exist) {
        throw new Error(MessageEnum.CUSTOMER_ALREADY_EXISTS);
      } else {
        const token = generateJwtToken(values);
        await sendEmail(
          email,
          `${process.env.CUSTOMER_VERIFY_MAIL}?token=${token}`
        );
      }
    } catch (error: any) {
      console.log("error in addCustomerService");
      throw error;
    }
  };





  
  addCustomer = async (values: ICustomer): Promise<boolean> => {
    const { password, email, name, phone } = { ...values };

    const exist = await this._customerRepository.checkCustomerExist(email);

    if (!exist) {
      const hashedPassword = await hashPassword(password);

      const data = {
        name,
        phone,
        email,
        isVerified: true,
        isActive: true,
        password: hashedPassword,
      };

      const response = await this._customerRepository.addNewCustomer(data);

      if (response) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new Error(MessageEnum.CUSTOMER_ALREADY_EXISTS);
    }
  };

  //-----------------------------------------------login customer
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

      const customerData: any =
        await this._customerRepository.customerDataByEmail(email);

      if (customerData) {
        if (customerData.isActive) {
          const passwordMatch = await comparePassword(
            password,
            customerData.password
          );

          if (!passwordMatch) {
            throw new Error(MessageEnum.INVALID_CREDENTIALS);
            return;
          }

          const payload: IJwtPayload = {
            userId: customerData._id,
            role: "Customer",
          };

          const AccessToken: string = accessToken(payload);
          const RefreshToken: string = refreshToken(payload);

          return { accessToken: AccessToken, refreshToken: RefreshToken };
        } else {
          throw new Error(MessageEnum.CUSTOMER_BLOCKED);
        }
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
      console.log("service refresh token missing");
      throw new Error("TOKEN_MISSING");
    }

    try {
      const decoded = Jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_KEY!
      ) as JwtPayload;

      const payload: IJwtPayload = {
        userId: decoded.userId,
        role: "Customer",
      };
      const AccessToken = await accessToken(payload);
   

      return AccessToken;
    } catch (error: unknown) {
      console.log("referesh otken service error");
      if (error instanceof TokenExpiredError) {
        throw new Error("TOKEN_EXPIRED");
      } else if (error instanceof JsonWebTokenError) {
        throw new Error("TOKEN_INVALID");
      } else {
        throw new Error("SERVER_ERROR");
      }
    }
  };


  
  // ------------------- reset password email verify -------------
  resetPasswordEmailVerify = async (email: string): Promise<boolean | void> => {
    try {
      const exist = await this._customerRepository.checkCustomerExist(email);

      if (!exist) {
        throw new Error(MessageEnum.CUSTOMER_NOT_FOUND);
      }
      const token = generateJwtToken({ email });
      await sendEmail(
        email,
        `${process.env.CUSTOMER_FORGOT_PASSWORD}?token=${token}`
      );
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };

  //---------------------------------------------------- reset customer password
  resetPassowrd = async (data: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      const { email, password } = { ...data };

      const emailExist = await this._customerRepository.checkCustomerExist(
        email
      );
      const hashedPassword = await hashPassword(password);

      if (emailExist) {
        await this._customerRepository.resetPassword(email, hashedPassword);
        return;
      } else {
        throw new Error(MessageEnum.CUSTOMER_NOT_FOUND);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };
}

export default AuthService;
