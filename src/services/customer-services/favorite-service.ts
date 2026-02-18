import {
  FavoriteRquestDto,
  getFavoriteReqDto,
  getFavoriteResDto,
} from "../../dto/favorite-dto/favorite-dto";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { IFavoriteRepositoryInterface } from "../../interface/favorite-interface/favorite-repository-interface";
import { IFavoriteServiceInterface } from "../../interface/favorite-interface/favorite-service-interface";
import {
  getFavoriteResMapper,
  getFavoriteShopsResMapper,
} from "../../mappers/favorite-mapper/favorite-mapper";
import { ErrorResponse } from "../../utils/errorResponse";
import logger from "../../utils/logger";

export class FavoriteService implements IFavoriteServiceInterface {
  private _favoriteRepository: IFavoriteRepositoryInterface;

  constructor(favoriteRepo: IFavoriteRepositoryInterface) {
    this._favoriteRepository = favoriteRepo;
  }

  //---------------------------- update the faovorite like add to favorite and remove from favorite
  favoriteUpdate = async (data: FavoriteRquestDto): Promise<string | void> => {
    const { customerId, shopId, action } = data;
    if (action == "add") {
      const checkCustomerExist =
        await this._favoriteRepository.getFavoriteByCustomerId(customerId);
      if (!checkCustomerExist) {
        await this._favoriteRepository.createFavorite({
          customerId: customerId,
          list: [],
        });
      }

      const result = await this._favoriteRepository.addVendorToFavorite(
        customerId,
        shopId
      );
      if (result) {
        logger.info(MessageEnum.FAVORITE_ADD_SUCCESS);
        return MessageEnum.FAVORITE_ADD_SUCCESS;
      } else {
        logger.error(MessageEnum.FAVORITE_ADD_FAILED);
        throw new ErrorResponse(
          MessageEnum.FAVORITE_ADD_FAILED,
          StatusCodeEnum.NOT_FOUND
        );
      }
    } else {
      const result = await this._favoriteRepository.removeVendorFromFavorite(
        customerId,
        shopId
      );

      if (result) {
        logger.info(MessageEnum.FAVORITE_REMOVE_SUCCESS);
        return MessageEnum.FAVORITE_REMOVE_SUCCESS;
      } else {
        logger.error(MessageEnum.FAVORITE_REMOVE_FAILED);
        throw new ErrorResponse(
          MessageEnum.FAVORITE_REMOVE_FAILED,
          StatusCodeEnum.NOT_FOUND
        );
      }
    }
  };

  //---------------------------- get the customer favorite
  getFavorite = async (
    data: getFavoriteReqDto
  ): Promise<getFavoriteResDto | []> => {
    const { customerId } = data;

    const favorite = await this._favoriteRepository.getFavoriteByCustomerId(
      customerId
    );

    if (favorite) {
      logger.info(MessageEnum.FAVORITE_FETCH_SUCCESS);
      return getFavoriteResMapper.toDto(favorite);
    } else {
      const result = await this._favoriteRepository.createFavorite({
        customerId,
        list: [],
      });
      logger.info(MessageEnum.FAVORITE_FETCH_SUCCESS);
      return getFavoriteResMapper.toDto(result);
    }
  };

  //---------------------------- get favorite shopes
  getFavoriteShopes = async (data: {
    userId: string;
  }): Promise<VendorDto[]> => {
    const { userId } = data;

    const favorite = await this._favoriteRepository.getFavoriteByCustomerId(
      userId
    );

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

    return getFavoriteShopsResMapper.toDto(result);
  };
}
