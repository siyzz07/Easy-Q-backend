import { IFavoriteRepository } from "../interface/favorite-interface/favorite-repository-interface";
import favoriteModel from "../models/favoriteModel";
import { IFavorite } from "../types/customerType";
import BaseRepository from "./baseRepository";


export class FavoriteRepository extends BaseRepository<any> implements IFavoriteRepository{

        private _FavoriteModel  = favoriteModel

    constructor(){
            super(favoriteModel)
    }



//--------------------------------------------------- Create a favorite document for a customer
  async createFavorite(data: {customerId:string,list:[]}):Promise<IFavorite> {
        const result = await this.create(data)
        return result
  }

//--------------------------------------------------- Get favorite by customerId

  async getFavoriteByCustomerId(customerId: string): Promise<IFavorite | null>{
        const query = {
                customerId:customerId
        }
        const result = await this.findOneByCondiition(query)
        return result
  }

//------------------------------------------------------- Add vendor to favorites
  async addVendorToFavorite(customerId: string, shopId: string): Promise<boolean> {
          const result = await this._FavoriteModel.updateOne(
            { customerId },
            { $addToSet: { vendors: shopId } }
          );

  return result.modifiedCount > 0;
}


//-------------------------------------------------------Remove vendor from favorites
 async removeVendorFromFavorite(customerId: string, vendorId: string): Promise<boolean> {

  const result = await this._FavoriteModel.updateOne(
    { customerId },
    { $pull: { vendors: vendorId } }
  );

  return result.modifiedCount > 0;
}

//-------------------------------------------------------get favorite shopes
async getFavoreiteShopes(customerId: string): Promise<IFavorite|null> {
  const result = await this._FavoriteModel.findOne({customerId:customerId}).populate('vendors')
  return result
}

}