"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
const favorite_mapper_1 = require("../../mappers/favorite-mapper/favorite-mapper");
const errorResponse_1 = require("../../utils/errorResponse");
const logger_1 = __importDefault(require("../../utils/logger"));
class FavoriteService {
    constructor(favoriteRepo) {
        //---------------------------- update the faovorite like add to favorite and remove from favorite
        this.favoriteUpdate = async (data) => {
            const { customerId, shopId, action } = data;
            if (action == "add") {
                const checkCustomerExist = await this._favoriteRepository.getFavoriteByCustomerId(customerId);
                if (!checkCustomerExist) {
                    await this._favoriteRepository.createFavorite({
                        customerId: customerId,
                        list: [],
                    });
                }
                const result = await this._favoriteRepository.addVendorToFavorite(customerId, shopId);
                if (result) {
                    logger_1.default.info(messagesEnum_1.MessageEnum.FAVORITE_ADD_SUCCESS);
                    return messagesEnum_1.MessageEnum.FAVORITE_ADD_SUCCESS;
                }
                else {
                    logger_1.default.error(messagesEnum_1.MessageEnum.FAVORITE_ADD_FAILED);
                    throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.FAVORITE_ADD_FAILED, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
                }
            }
            else {
                const result = await this._favoriteRepository.removeVendorFromFavorite(customerId, shopId);
                if (result) {
                    logger_1.default.info(messagesEnum_1.MessageEnum.FAVORITE_REMOVE_SUCCESS);
                    return messagesEnum_1.MessageEnum.FAVORITE_REMOVE_SUCCESS;
                }
                else {
                    logger_1.default.error(messagesEnum_1.MessageEnum.FAVORITE_REMOVE_FAILED);
                    throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.FAVORITE_REMOVE_FAILED, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
                }
            }
        };
        //---------------------------- get the customer favorite
        this.getFavorite = async (data) => {
            const { customerId } = data;
            const favorite = await this._favoriteRepository.getFavoriteByCustomerId(customerId);
            if (favorite) {
                logger_1.default.info(messagesEnum_1.MessageEnum.FAVORITE_FETCH_SUCCESS);
                return favorite_mapper_1.getFavoriteResMapper.toDto(favorite);
            }
            else {
                const result = await this._favoriteRepository.createFavorite({
                    customerId,
                    list: [],
                });
                logger_1.default.info(messagesEnum_1.MessageEnum.FAVORITE_FETCH_SUCCESS);
                return favorite_mapper_1.getFavoriteResMapper.toDto(result);
            }
        };
        //---------------------------- get favorite shopes
        this.getFavoriteShopes = async (data) => {
            const { userId } = data;
            const favorite = await this._favoriteRepository.getFavoriteByCustomerId(userId);
            if (!favorite) {
                await this._favoriteRepository.createFavorite({
                    customerId: userId,
                    list: [],
                });
            }
            const result = await this._favoriteRepository.getFavoreiteShopes(userId);
            if (!result || !result.vendors || result.vendors.length === 0) {
                return [];
            }
            return favorite_mapper_1.getFavoriteShopsResMapper.toDto(result);
        };
        this._favoriteRepository = favoriteRepo;
    }
}
exports.FavoriteService = FavoriteService;
