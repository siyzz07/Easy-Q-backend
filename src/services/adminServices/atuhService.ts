import { log } from "node:console";
import { MessageEnum } from "../../enums/messagesEnum";
import { IAdminRepo } from "../../interface/repositoryInterface/adminRepoInterface";
import { IAdminAuthServiceInterface } from "../../interface/serviceInterface/adminServiceInterface";
import { IAdmin } from "../../types/adminTypes";
import { comparePassword, hashPassword } from "../../utils/hash";
import { accessToken, refreshToken } from "../../utils/jwt";
import { emit } from "node:process";
import Jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";

export class AuthService implements IAdminAuthServiceInterface {
  private _adminRepository: IAdminRepo;

  constructor(adminRepo: IAdminRepo) {
    this._adminRepository = adminRepo;
  }

  loginAdmin = async (
    data: IAdmin
  ): Promise<{ accessToken: string; refreshToken: string } | void> => {
    try {
      const { email, password } = data;

      let adminExist = await this._adminRepository.checkAdminExist(email);

      if (!adminExist) {
        throw new Error(MessageEnum.ADMIN_NOT_FOUND);
      }
      let adminData: any = await this._adminRepository.adminDataByEmail(email);

      let mathcPassword = await comparePassword(password, adminData.password);

      if (!mathcPassword) {
        throw new Error(MessageEnum.ADMIN_PASSWORD_INCORRECT);
      }

      if (adminData) {
        let AccessToken: string = accessToken(adminData._id);
        let RefreshToken: string = refreshToken(adminData._id);

        return { accessToken: AccessToken, refreshToken: RefreshToken };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === MessageEnum.ADMIN_NOT_FOUND) {
          throw error;
        } else if (error.message === MessageEnum.ADMIN_PASSWORD_INCORRECT) {
          throw error;
        } else {
          console.log("admin login error ", error.message);
        }
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
