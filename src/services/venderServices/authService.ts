import Jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { MessageEnum } from "../../enums/messagesEnum";
import { IVendorRepo } from "../../interface/repositoryInterface/vendorRepoInterface";
import { IVendorInterface } from "../../interface/serviceInterface/vendorServiceInterface";
import { comparePassword, hashPassword } from "../../utils/hash";
import { accessToken, generateJwtToken, refreshToken } from "../../utils/jwt";
import { sendEmail } from "../../utils/nodeMailer";
import { IJwtPayload } from "../../types/common-types";

export class VendorAuthService implements IVendorInterface {
  private _vendorRepository: IVendorRepo;

  constructor(vendorRepository: IVendorRepo) {
    this._vendorRepository = vendorRepository;
  }

  //---------------------------- verify email for signup
  verifyEmail = async (data: {
    shopName: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      const { email, password, phone, shopName } = data;

      const exist = await this._vendorRepository.checkVendorExist(email);

      if (exist) {
        throw new Error(MessageEnum.VENDOR_EXISTS);
      } else {
        let token = generateJwtToken(data);

        await sendEmail(
          email,
          `${process.env.VENDOR_VERIFY_MAIL}?token=${token}`
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === MessageEnum.VENDOR_EXISTS) {
          throw error;
        } else {
          console.log("Server error:", error.message);
        }
      } else {
        console.log("Unknown error:", error);
      }
    }
  };

  //--------------------------- add new veriyfied vendor

  addNewVendor = async (data: {
    shopName: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<any> => {
    try {
      const { shopName, email, phone, password } = data;

      let exist = await this._vendorRepository.checkVendorExist(email);

      if (!exist) {
        const hashedPassword = await hashPassword(password);

        const vendorData = {
          shopName,
          phone,
          email,
          isActive: true,
          password: hashedPassword,
        };

        const response = await this._vendorRepository.addNewVendor(vendorData);
        if (response) {
          return true;
        } else {
          return false;
        }
      } else {
        throw new Error(MessageEnum.VENDOR_EXISTS);
      }
    } catch (error) {
      console.error("Error in addNewVendor:", error);

      if (
        error instanceof Error &&
        error.message === MessageEnum.VENDOR_EXISTS
      ) {
        throw error; // bubble up controlled error
      }

      // throw new Error(MessageEnum.SERVER_ERROR); //  or return false, depending on your design
    }
  };

  //----------------------------------- login vendor
  vendorLogin = async (data: {
    email: string;
    password: string;
  }): Promise<{
    accessToken: string;
    refreshToken: string;
    vendorData: object;
  } | void> => {
    try {
      const { email, password } = { ...data };

      const checkVendorExist = await this._vendorRepository.checkVendorExist(
        email
      );

      if (!checkVendorExist) {
        throw new Error(MessageEnum.VENDOR_NOT_FOUND);
      } else {
        let vendorData = await this._vendorRepository.vendorData(email);

        if(!vendorData.isActive){
          throw new Error(MessageEnum.VENDOR_BLOCKED)
          return 
        }



        let passwordMatch = await comparePassword(
          password,
          vendorData.password
        );
        if (!passwordMatch) {
          throw new Error(MessageEnum.INVALID_CREDENTIALS);
        } else {
          let payload: IJwtPayload = {
            userId: vendorData._id,
            role: "Vendor",
          };

          let AccessToken = accessToken(payload);
          let RefreshToken = refreshToken(payload);

          return {
            accessToken: AccessToken,
            refreshToken: RefreshToken,
            vendorData: vendorData,
          };
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === MessageEnum.VENDOR_NOT_FOUND) {
          throw error;
        } else if (error.message === MessageEnum.INVALID_CREDENTIALS) {
          throw error;
        }else if(error.message === MessageEnum.VENDOR_BLOCKED){
            throw error
        }
      } else {
        console.log("vendor Login unknown error");
      }
    }
  };

  //------------------------------- add new accesss token

  updateToken = async (refreshToken: string): Promise<string> => {
    if (!refreshToken) {
      throw new Error("TOKEN_MISSING");
    }

    try {
      const decoded = Jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_KEY!
      ) as JwtPayload;

      const payload: IJwtPayload = {
        userId: decoded.userId,
        role: "Vendor",
      };
      const AccessToken = accessToken(payload);

      return AccessToken;
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

  //------------------------- reset password email verify

  resetPasswordEmailVerify = async (email: string): Promise<boolean | void> => {
    try {
      let exist = await this._vendorRepository.checkVendorExist(email);

      if (!exist) {
        throw new Error(MessageEnum.VENDOR_NOT_FOUND);
      }
      let token = generateJwtToken({ email });
      await sendEmail(
        email,
        `${process.env.VENDOR_FORGOT_PASSWORD}?token=${token}`
      );
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };

  // -------------------------------- reset password
  resetPassowrd = async (data: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      const { email, password } = { ...data };

      let emailExist = await this._vendorRepository.checkVendorExist(email);
      let hashedPassword = await hashPassword(password);

      if (emailExist) {
        await this._vendorRepository.resetPassword(email, hashedPassword);
        return;
      } else {
        throw new Error(MessageEnum.VENDOR_NOT_FOUND);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };
}
