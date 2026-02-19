import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { IWalletRepository } from "../../interface/wallet-interface/wallet-repository-interface";
import { IWalletService } from "../../interface/wallet-interface/wallet-service-interface";
import { IWallet } from "../../types/common-types";
import { ErrorResponse } from "../../utils/errorResponse";
import logger from "../../utils/logger";


export class WalletService implements IWalletService {

    private _WalletRepository :IWalletRepository

    constructor (walletRepository:IWalletRepository){
        this._WalletRepository = walletRepository
    }

    // --------------------------- get wallet data

    getWalletData = async (id: string,type:'Vendor'|'Customer'): Promise<IWallet> =>{


        const data = await this._WalletRepository.getWalletByuser(id)
        if(!data){
           return  await this._WalletRepository.createWallet(id,type)
        }else{
            logger.info(MessageEnum.WALLET_FETCH_SUCCESS)
            return  data
        }

        

    }

 // --------------------------- update wallet data
    updateWallet = async(id: string, type: "Vendor" | "Customer", amount: number): Promise<boolean|void> => {
        
        
        const data = await this._WalletRepository.getWalletByuser(id)
        if(!data){
            await this._WalletRepository.createWallet(id,type)
        }

        const isUpdated = await this._WalletRepository.updateWallet(id,Number(amount))

        if(isUpdated){
            logger.info('wallet updatedd succcessfully')
            return true
        }else{
            logger.error(MessageEnum.WALLET_UPDATE_FAILED)
            throw new ErrorResponse(MessageEnum.WALLET_UPDATE_FAILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
        }
        

    }


}