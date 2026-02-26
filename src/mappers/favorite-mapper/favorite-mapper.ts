import { FavoriteRquestDto, getFavoriteReqDto, getFavoriteResDto } from "../../dto/favorite-dto/favorite-dto";
import { IFavorite } from "../../types/customerType";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";
import { VendorMapper } from "../vendor-mapper/vendor-mapper";
import { IVendor } from "../../types/vendorType";
export const favoriteUpdataReqMapper ={
    toDto(data:{userId:string,shopId:string,action:'add'|'remove'}):FavoriteRquestDto{
        return {
            customerId:data.userId,
            shopId:data.shopId,
            action:data.action
        }
    }
}


export const getFavoriteReqMapper ={
    toDto(data:{userId:string}):getFavoriteReqDto{
        return{
            customerId:data.userId
        }
    }
}

export const getFavoriteResMapper = {
    toDto(data:IFavorite):getFavoriteResDto{
        return {
        _id:data._id as string,
        vendors:data.vendors
        }
    }
}
export const getFavoriteShopsResMapper = {
  toDto(data: { vendors: IVendor[] }): VendorDto[] {
    return VendorMapper.toDTOList(data.vendors);
  }
};


