import { IWallet } from "../../types/common-types";


export interface IWalletServiceInterface {

    getWalletData (id:string,type:'Vendor'|'Customer'):Promise<IWallet>
    updateWallet (id:string,type:'Vendor'|'Customer',amount:string):Promise<boolean|void>
    
}