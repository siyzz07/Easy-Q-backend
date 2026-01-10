import { IWallet } from "../../types/common-types";


export interface IWalletRepositoryInterface{
    createWallet (id:string,userType:'Vendor'|'Customer'):Promise<IWallet>
    getWalletByuser(user:string):Promise<IWallet|null>
    updateWallet(id:string ,amount:number):Promise<boolean>
}