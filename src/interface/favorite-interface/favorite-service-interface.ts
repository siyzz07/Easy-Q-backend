import { promises } from "dns";
import { FavoriteRquestDto, getFavoriteReqDto, getFavoriteResDto, getFavoriteShopesResDto } from "../../dto/favorite-dto/favorite-dto";
import { IFavorite } from "../../types/customerType";
import { IVendor } from "../../types/vendorType";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";


export interface IFavoriteService{
    
    favoriteUpdate(data:FavoriteRquestDto):Promise<string|void>
    getFavorite(data:getFavoriteReqDto):Promise<getFavoriteResDto|[]>
    getFavoriteShopes(data:{userId:string}):Promise<VendorDto[]>

}