import mongoose from "mongoose";
import { IWalletRepositoryInterface } from "../interface/wallet-interface/wallet-repository-interface";
import walletModel from "../models/walletModel";
import { IWallet } from "../types/common-types";
import BaseRepository from "./baseRepository";

export class WalletRepository
  extends BaseRepository<any>
  implements IWalletRepositoryInterface
{
  private _WalletModel = walletModel;

  constructor() {
    super(walletModel);
  }

  /**
   * 
   *  create a wallet
   * 
   */
  async createWallet(
    id: string,
    userType: "Customer" | "Vendor"
  ): Promise<IWallet> {
    return await this.create({ user: id, userType });
  }

  /**
   * 
   *  fetch wallet data
   * 
   */
  async getWalletByuser(user: string): Promise<IWallet|null> {

      const userid =new mongoose.Types.ObjectId(user)
        let data = await this.findOneByCondiition({ user:userid}); 
        if(data){
            return data
        }else{
            return null
        }
  }


   /**
   * 
   *  update wallet
   * 
   */
  async updateWallet(userId: string, amount: number): Promise<boolean> {
    const result = await this._WalletModel.updateOne(
      { user: userId },
      { $inc: { balance: amount } }
    );

    return result.modifiedCount > 0;
  }
}
