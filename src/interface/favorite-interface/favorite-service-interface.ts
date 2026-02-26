
import { FavoriteRquestDto, getFavoriteReqDto, getFavoriteResDto } from "../../dto/favorite-dto/favorite-dto";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";


export interface IFavoriteService{
    
    favoriteUpdate(data:FavoriteRquestDto):Promise<string|void>
    getFavorite(data:getFavoriteReqDto):Promise<getFavoriteResDto|[]>
    getFavoriteShopes(data:{userId:string}):Promise<VendorDto[]>

}