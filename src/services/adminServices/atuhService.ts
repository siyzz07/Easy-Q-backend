import { MessageEnum } from "../../enums/messagesEnum";
import { IAdminRepo } from "../../interface/repositoryInterface/adminRepoInterface";
import { IAdminAuthServiceInterface } from "../../interface/serviceInterface/adminServiceInterface";
import { IAdmin } from "../../types/adminTypes";
import { comparePassword} from "../../utils/hash";
import { accessToken, refreshToken } from "../../utils/jwt";

import Jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { IJwtPayload } from "../../types/common-types";

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

      const adminExist = await this._adminRepository.checkAdminExist(email);

      if (!adminExist) {
        throw new Error(MessageEnum.ADMIN_NOT_FOUND);
      }
      const adminData: any = await this._adminRepository.adminDataByEmail(
        email
      );

      const mathcPassword = await comparePassword(password, adminData.password);

      if (!mathcPassword) {
        throw new Error(MessageEnum.ADMIN_PASSWORD_INCORRECT);
      }

      if (adminData) {
        const payload: IJwtPayload = {
          userId: adminData._id,
          role: "Admin",
        };

        const AccessToken: string = accessToken(payload);
        const RefreshToken: string = refreshToken(payload);

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

      const payload: IJwtPayload = {
        userId: decoded.userId,
        role: "Admin",
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
}
