import { IFavorite } from "../../types/customerType";


export interface IFavoriteRepository {
  createFavorite(data: {customerId:string,list:[]}): Promise<IFavorite>;
  getFavoriteByCustomerId(customerId: string): Promise<IFavorite | null>;
  addVendorToFavorite(customerId: string, vendorId: string): Promise<boolean >;
 removeVendorFromFavorite(customerId: string, vendorId: string): Promise<boolean>;
  getFavoreiteShopes (customerId:string):Promise<IFavorite|null>
//   deleteFavorite(customerId: string): Promise<IFavorite | null>;
}