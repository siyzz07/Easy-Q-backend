"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
const logger_1 = __importDefault(require("../../utils/logger"));
class AuthController {
    constructor(authService) {
        /**
         * sign up
         */
        // ------------------------------------------------------  verify email
        this.verifyEmail = async (req, res, next) => {
            try {
                const data = req.body;
                await this._authService.verifyEmail(data);
                res.status(httpStatusCodeEnum_1.StatusCodeEnum.OK).json(messagesEnum_1.MessageEnum.REGISTER_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        // ------------------------------------------------------  add Entity
        this.addNewEntity = async (req, res, next) => {
            try {
                const data = req.body;
                const response = await this._authService.addNewEntity(data);
                if (response) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json(messagesEnum_1.MessageEnum.ENTITY_ADDEDD_SUCCESSFULY);
                }
            }
            catch (error) {
                next(error);
            }
        };
        /**
         *  login
         */
        this.login = async (req, res, next) => {
            try {
                const data = req.body;
                const result = await this._authService.login(data);
                if (result) {
                    res.cookie(`${result.role}Jwt`, result.refreshToken, {
                        httpOnly: true,
                        secure: false,
                        maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY),
                    });
                    res.status(httpStatusCodeEnum_1.StatusCodeEnum.OK).json({
                        message: `${result.role} ${messagesEnum_1.MessageEnum.LOGIN_SUCCESSFLLY}`,
                        accesstoken: result.accessToken,
                        ...(result.entityData && { data: result.entityData }),
                    });
                }
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        };
        /**
         *
         *  Restet passwrod
         *
         */
        // ------------------------------------------------------ verify resest password email
        this.resetPasswordEmailVerify = async (req, res, next) => {
            try {
                const result = await this._authService.resetPasswordEmailVerify(req.body);
                if (result) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                        .json({ message: messagesEnum_1.MessageEnum.EMAIL_SEND_SUCCESS });
                }
            }
            catch (error) {
                next(error);
            }
        };
        // ------------------------------------------------------ reset password for verified email
        this.resetPassword = async (req, res, next) => {
            try {
                await this._authService.resetPassword(req.body);
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ message: messagesEnum_1.MessageEnum.PASSWROD_CAHNGE_SUCCESS });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         *
         *  Refreah token
         *
         */
        // ------------------------------------------------------ update customer refresh token
        this.refreshToken = async (req, res, next) => {
            try {
                const refreshToken = req.cookies;
                const accessToken = await this._authService.updateAccessToken(refreshToken, req.body.role);
                res.status(httpStatusCodeEnum_1.StatusCodeEnum.OK).json({ accessToken });
            }
            catch (error) {
                next(error);
            }
        };
        /***
         *
         *
         *  Logout
         *
         */
        this.logout = async (req, res, next) => {
            try {
                const role = req.body.role;
                res.clearCookie(`${role}Jwt`, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                });
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ message: messagesEnum_1.MessageEnum.LOGOOUT_SUCCESS });
            }
            catch (error) {
                logger_1.default.error("error to logout entity");
                next(error);
            }
        };
        this._authService = authService;
    }
}
exports.AuthController = AuthController;
