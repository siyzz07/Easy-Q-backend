import mongoose from "mongoose";
import { IWalletRepository } from "../interface/wallet-interface/wallet-repository-interface";
import walletModel from "../models/walletModel";
import { IWallet } from "../types/common-types";
import BaseRepository from "./baseRepository";

export class WalletRepository
  extends BaseRepository<IWallet>
  implements IWalletRepository
{
  private _WalletModel = walletModel;

  constructor() {
    super(walletModel);
  }

  /**
   * create new wallet for user
   *
   */
  async createWallet(
    id: string,
    userType: "Customer" | "Vendor"
  ): Promise<IWallet> {
    return await this.create({ user: new mongoose.Types.ObjectId(id), userType, balance: 0 });
  }

  /**
   * 
   *  fetch wallet data
   * 
   */
  async getWalletByuser(user: string): Promise<IWallet|null> {

      const userid =new mongoose.Types.ObjectId(user)
        const data = await this.findOneByCondiition({ user:userid}); 
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
