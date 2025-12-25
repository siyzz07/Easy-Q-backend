import { log } from "console";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

import { AuthServiceInterface } from "../../interface/auth-interface/auth-serivce-interface";
import { IAdmin } from "../../types/adminTypes";
import { IJwtPayload, ILogin } from "../../types/common-types";
import { ICustomer } from "../../types/customerType";
import { IVendor } from "../../types/vendorType";
import { ErrorResponse } from "../../utils/errorResponse";
import { comparePassword, hashPassword } from "../../utils/hash";
import { accessToken, generateJwtToken, refreshToken } from "../../utils/jwt";
import logger from "../../utils/logger";
import { sendEmail } from "../../utils/nodeMailer";
import { token } from "morgan";
import Jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { IVendorRepo } from "../../interface/vendor-interface/vendor-respository-interface";
import { ICustomerRepo } from "../../interface/customer-interface/customer-repository-interface";
import { IAdminRepo } from "../../interface/admin-interface/admin-repository-interface";

export class AuthService implements AuthServiceInterface {
  private _vendorRepository: IVendorRepo;
  private _customerRepository: ICustomerRepo;
  private _adminRepository: IAdminRepo;

  constructor(
    vendorRpository: IVendorRepo,
    customerRepository: ICustomerRepo,
    adminRepository: IAdminRepo
  ) {
    this._customerRepository = customerRepository;
    this._vendorRepository = vendorRpository;
    this._adminRepository = adminRepository;
  }

  /**
   *
   * -------------------------handle singup --------------
   *
   * if vendor or customer try to sign up , want to verify their mail
   */

  // ----------------------------------------------- verify the signup email
  verifyEmail = async (data: IVendor | ICustomer): Promise<void> => {
    const { role, ...payload } = { ...data };

    if (role === "customer") {
      //---handle customer
      let email = payload.email;
      const exist = await this._customerRepository.checkCustomerExist(
        email as string
      );

      if (exist) {
        throw new ErrorResponse(
          MessageEnum.CUSTOMER_ALREADY_EXISTS,
          StatusCodeEnum.CONFLICT
        );
      } else {
        const token = generateJwtToken({ ...payload, role });
        await sendEmail(
          email as string,
          `${process.env.CUSTOMER_VERIFY_MAIL}?token=${token}`
        );
      }
    } else if (role === "vendor") {
      //--- handle vendor
      const email = payload.email;

      let vendorDataVerified = false;
      const exist = await this._vendorRepository.checkVendorExist(
        email as string
      );

      if (exist) {
        const vendorData = await this._vendorRepository.vendorData(
          email as string
        );

        vendorDataVerified =
          vendorData.isVerified === "pending" ||
          vendorData.isVerified === "verified";
      }
      if (exist && vendorDataVerified) {
        throw new ErrorResponse(
          MessageEnum.VENDOR_EXISTS,
          StatusCodeEnum.CONFLICT
        );
      } else {
        if (exist) {
          await this._vendorRepository.deleteVendor(email as string);
        }
        const token = generateJwtToken(data);

        await sendEmail(
          email as string,
          `${process.env.VENDOR_VERIFY_MAIL}?token=${token}`
        );
      }
    } else {
      logger.error(MessageEnum.ROLE_NOT_FOUND);
    }
  };

  // ----------------------------------------------- add new  verified Enitity (customer/vendor)
  addNewEntity = async (data: IVendor | ICustomer): Promise<boolean | void> => {
    let { role, password, ...payload } = { ...data };

    let hashedPassword = await hashPassword(password as string);

    if (role == "customer") {
      //- handle customer
      let exitst = await this._customerRepository.checkCustomerExist(
        payload.email as string
      );
      if (!exitst) {
        const values = {
          ...payload,
          password: hashedPassword,
        };
        let result = await this._customerRepository.addNewCustomer(
          values as ICustomer
        );

        if (result) {
          return true;
        } else {
          logger.error("error to add new customer");
          throw new ErrorResponse(
            MessageEnum.CUSTOMER_ADD_ERROR,
            StatusCodeEnum.INTERNAL_SERVER_ERROR
          );
        }
      }
    } else if (role == "vendor") {
      //- handle vendor
      let exist = await this._vendorRepository.checkVendorExist(
        payload.email as string
      );
      if (exist) {
        throw new ErrorResponse(
          MessageEnum.VENDOR_EXISTS,
          StatusCodeEnum.CONFLICT
        );
      }
      let values = {
        ...payload,
        password: hashedPassword,
      };

      let result = await this._vendorRepository.addNewVendor(values as IVendor);
      if (result) {
        return true;
      } else {
        logger.error("error to add new vendor");
        throw new ErrorResponse(
          MessageEnum.VENDOR_ADD_ERROR,
          StatusCodeEnum.INTERNAL_SERVER_ERROR
        );
      }
    } else {
      logger.error(MessageEnum.ROLE_NOT_FOUND);
    }
  };

  /**
   *
   *     login  entity  service
   *
   */
  login = async (
    data: ILogin
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    entityData?: IVendor | ICustomer;
    role: string;
  } | void> => {
    let { email, password, role } = data;
    if (role == "customer") {
      const checkCustomer = await this._customerRepository.checkCustomerExist(
        email
      );
      if (!checkCustomer) {
        throw new ErrorResponse(
          MessageEnum.CUSTOMER_NOT_FOUND,
          StatusCodeEnum.NOT_FOUND
        );
      }

      const customerData: ICustomer | null =
        await this._customerRepository.customerDataByEmail(email);
      if (customerData) {
        if (customerData.isActive) {
          const passwordMatch = await comparePassword(
            password,
            customerData.password
          );

          if (!passwordMatch) {
            throw new ErrorResponse(
              MessageEnum.INVALID_CREDENTIALS,
              StatusCodeEnum.BAD_REQUEST
            );
          }
          const payload: IJwtPayload = {
            userId: customerData._id as string,
            role: "Customer",
          };

          const AccessToken: string = accessToken(payload);
          const RefreshToken: string = refreshToken(payload);

          return {
            accessToken: AccessToken,
            refreshToken: RefreshToken,
            role: "Customer",
          };
        } else {
          throw new ErrorResponse(
            MessageEnum.CUSTOMER_BLOCKED,
            StatusCodeEnum.BAD_REQUEST
          );
        }
      }
    } else if (role == "vendor") {
      const checkVendorExist = await this._vendorRepository.checkVendorExist(
        email
      );

      if (!checkVendorExist) {
        throw new ErrorResponse(
          MessageEnum.VENDOR_NOT_FOUND,
          StatusCodeEnum.NOT_FOUND
        );
      } else {
        const vendorData = await this._vendorRepository.vendorData(email);
        if (vendorData.isVerified == "pending") {
          throw new ErrorResponse(
            MessageEnum.VENDOR_UNDER_VERIFICATION,
            StatusCodeEnum.BAD_REQUEST
          );
        } else if (vendorData.isVerified == "rejected") {
          throw new ErrorResponse(
            MessageEnum.VENDOR_VERIFICATION_REJECTED,
            StatusCodeEnum.BAD_REQUEST
          );
        } else {
          if (!vendorData.isActive) {
            throw new ErrorResponse(
              MessageEnum.VENDOR_BLOCKED,
              StatusCodeEnum.BAD_REQUEST
            );
          }

          const passwordMatch = await comparePassword(
            password,
            vendorData.password
          );
          if (!passwordMatch) {
            throw new ErrorResponse(
              MessageEnum.INVALID_CREDENTIALS,
              StatusCodeEnum.BAD_REQUEST
            );
          } else {
            const payload: IJwtPayload = {
              userId: vendorData._id,
              role: "Vendor",
            };

            const AccessToken = accessToken(payload);
            const RefreshToken = refreshToken(payload);

            return {
              accessToken: AccessToken,
              refreshToken: RefreshToken,
              entityData: vendorData,
              role: "Vendor",
            };
          }
        }
      }
    } else if (role == "admin") {
      const adminExist = await this._adminRepository.checkAdminExist(email);

      if (!adminExist) {
        throw new ErrorResponse(
          MessageEnum.ADMIN_NOT_FOUND,
          StatusCodeEnum.NOT_FOUND
        );
      }
      const adminData: any = await this._adminRepository.adminDataByEmail(
        email
      );
      const mathcPassword = await comparePassword(password, adminData.password);

      if (!mathcPassword) {
        throw new ErrorResponse(
          MessageEnum.ADMIN_PASSWORD_INCORRECT,
          StatusCodeEnum.NOT_FOUND
        );
      }

      if (adminData) {
        const payload: IJwtPayload = {
          userId: adminData._id,
          role: "Admin",
        };
        const AccessToken: string = accessToken(payload);
        const RefreshToken: string = refreshToken(payload);

        return {
          accessToken: AccessToken,
          refreshToken: RefreshToken,
          role: "Admin",
        };
      }
    } else {
      logger.error(MessageEnum.ROLE_NOT_FOUND);
    }
  };

  /**
   *
   *  Reset password reset  passwrod
   *
   */
  // ----------------------------------------------- verify the email for reset the password
  resetPasswordEmailVerify = async (data: {
    email: string;
    role: string;
  }): Promise<boolean | void> => {
    const { email, role } = data;

    let baseUrl;

    switch (role) {
      case "customer": {
        const exist = await this._customerRepository.checkCustomerExist(email);
        if (!exist) {
          throw new ErrorResponse(
            MessageEnum.CUSTOMER_NOT_FOUND,
            StatusCodeEnum.NOT_FOUND
          );
        }

        baseUrl = process.env.CUSTOMER_FORGOT_PASSWORD;
        break;
      }
      case "vendor": {
        const exist = await this._vendorRepository.checkVendorExist(email);

        if (!exist) {
          // throw new Error(MessageEnum.VENDOR_NOT_FOUND);
          throw new ErrorResponse(
            MessageEnum.VENDOR_NOT_FOUND,
            StatusCodeEnum.NOT_FOUND
          );
        }
        baseUrl = process.env.VENDOR_FORGOT_PASSWORD;
        break;
      }
      default: {
        logger.error(
          MessageEnum.ROLE_NOT_FOUND,
          "in Reset passwrod email verify"
        );
        break;
      }
    }

    if (role === "customer" || role == "vendor") {
      const token = generateJwtToken({ email });
      await sendEmail(email, `${baseUrl}?token=${token}`);
      return true;
    } else {
      logger.error("error to send mail for send verify email");
    }
  };
  // ----------------------------------------------- reset password
  resetPassword = async (data: {email: string;password: string;role: string;}): Promise<void> => {
    const { email, password, role } = data;

    const hashedPassword = await hashPassword(password);

    switch (role) {
      case "customer": {
        const emailExist = await this._customerRepository.checkCustomerExist(email);
        if (!emailExist) {
          throw new ErrorResponse(MessageEnum.CUSTOMER_NOT_FOUND,StatusCodeEnum.NOT_FOUND);
        }

        await this._customerRepository.resetPassword(email, hashedPassword);
        return;
      }

      case "vendor": {
        const emailExist = await this._vendorRepository.checkVendorExist(email);
        if (!emailExist) {
          throw new ErrorResponse(MessageEnum.VENDOR_NOT_FOUND,StatusCodeEnum.NOT_FOUND );
        }

        await this._vendorRepository.resetPassword(email, hashedPassword);
        return;
      }

      default:
        logger.error(MessageEnum.ROLE_NOT_FOUND, "in reset password");
    }
  };

  /***
   *
   *  updata access token
   *
   */
  updateAccessToken = async (token: any, role: string): Promise<string> => {
    let refreshToken: string | undefined;
    let entity: string;

    switch (role.toLowerCase()) {
      case "customer":
        refreshToken = token?.CustomerJwt;
        entity = "Customer";
        break;

      case "vendor":
        refreshToken = token?.VendorJwt;
        entity = "Vendor";
        break;

      case "admin":
        refreshToken = token?.AdminJwt;
        entity = "Admin";
        break;

      default:
        throw new ErrorResponse(
          MessageEnum.ROLE_NOT_FOUND,
          StatusCodeEnum.BAD_REQUEST
        );
    }

    if (!refreshToken) {
      logger.warning("Refresh token missing");
      throw new ErrorResponse(
        MessageEnum.REFRESH_TOKEN_MISSING,
        StatusCodeEnum.BAD_REQUEST
      );
    }

    let decoded: JwtPayload;
    try {
      decoded = Jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_KEY!
      ) as JwtPayload;
    } catch (error: any) {
      logger.error(`Token verification failed: ${error.message}`);
      throw new ErrorResponse(
        MessageEnum.TOKEN_INVALID,
        StatusCodeEnum.UNAUTHORIZED
      );
    }

    if (!decoded?.userId) {
      throw new ErrorResponse(
        MessageEnum.TOKEN_INVALID,
        StatusCodeEnum.UNAUTHORIZED
      );
    }

    const payload: IJwtPayload = {
      userId: decoded.userId,
      role: entity,
    };

    const newAccessToken = accessToken(payload);
    return newAccessToken;
  };
}
