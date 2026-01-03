"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteController = void 0;
const favorite_mapper_1 = require("../../mappers/favorite-mapper/favorite-mapper");
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
class FavoriteController {
    constructor(favoriteservice) {
        //----------------------- add to favorite
        this.updateFavorite = async (req, res, next) => {
            try {
                const result = await this._favoriteService.favoriteUpdate(favorite_mapper_1.favoriteUpdataReqMapper.toDto(req.body));
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ message: result, success: true });
            }
            catch (error) {
                next(error);
            }
        };
        //----------------------- get customer favorite
        this.getFavorites = async (req, res, next) => {
            try {
                const result = await this._favoriteService.getFavorite(favorite_mapper_1.getFavoriteReqMapper.toDto(req.body));
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ success: true, Message: messagesEnum_1.MessageEnum.FAVORITE_FETCH_SUCCESS, data: result });
            }
            catch (error) {
                next(error);
            }
        };
        //----------------------- get favorite shopes
        this.getFavoriteShopes = async (req, res, next) => {
            try {
                const result = await this._favoriteService.getFavoriteShopes(req.body);
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.OK)
                    .json({ success: true, message: messagesEnum_1.MessageEnum.FAVORITE_FETCH_SUCCESS, data: result });
            }
            catch (error) {
                next(error);
            }
        };
        this._favoriteService = favoriteservice;
    }
}
exports.FavoriteController = FavoriteController;
