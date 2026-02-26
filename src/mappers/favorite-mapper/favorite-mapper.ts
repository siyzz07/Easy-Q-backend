import { FavoriteRquestDto, getFavoriteReqDto, getFavoriteResDto } from "../../dto/favorite-dto/favorite-dto";
import { IFavorite } from "../../types/customerType";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";



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
  toDto(data: any): VendorDto[] {
    return data.vendors.map((v: any) => ({
      _id: v._id.toString(),
      shopName: v.shopName,
      email: v.email,
      phone: v.phone,
      ProfileImage: v.ProfileImage,
      city: v.city,
      openAt: v.openAt,
      closeAt: v.closeAt,
      isActive: v.isActive,
      isVerified: v.isVerified,
      cordinates: v.cordinates,
      hasShop: v.hasShop,
      images: v.images
    }));
  }
};


