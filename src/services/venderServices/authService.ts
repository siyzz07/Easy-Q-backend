import Jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { MessageEnum } from "../../enums/messagesEnum";
import { IVendorRepo } from "../../interface/repositoryInterface/vendorRepoInterface";
import { IVendorInterface } from "../../interface/serviceInterface/vendorServiceInterface";
import { comparePassword, hashPassword } from "../../utils/hash";
import { accessToken, generateJwtToken, refreshToken } from "../../utils/jwt";
import { sendEmail } from "../../utils/nodeMailer";

export class VendorAuthService implements IVendorInterface {
  private _vendorRepository: IVendorRepo;

  constructor(vendorRepository: IVendorRepo) {
    this._vendorRepository = vendorRepository;
  }

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
          `http://localhost:5173/vendor/verify-email?token=${token}`
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

  vendorLogin = async (data: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; refreshToken: string ,vendorData:object} | void> => {
    try {
      const { email, password } = { ...data };

      const checkVendorExist = await this._vendorRepository.checkVendorExist(
        email
      );

      if (!checkVendorExist) {
        throw new Error(MessageEnum.VENDOR_NOT_FOUND);
      } else {
        let vendorData = await this._vendorRepository.vendorData(email);

        let passwordMatch = await comparePassword(
          password,
          vendorData.password
        );
        if (!passwordMatch) {
          throw new Error(MessageEnum.INVALID_CREDENTIALS);
        } else {

          
          let AccessToken = accessToken(vendorData._id);
          let RefreshToken = refreshToken(vendorData._id);

          return { accessToken: AccessToken, refreshToken: RefreshToken , vendorData:vendorData };
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === MessageEnum.VENDOR_NOT_FOUND) {
          throw error;
        } else if (error.message === MessageEnum.INVALID_CREDENTIALS) {
          throw error;
        }
      } else {
        console.log("vendor Login unknown error");
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
