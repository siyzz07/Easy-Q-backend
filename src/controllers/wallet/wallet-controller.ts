import { Request, Response } from "express";
import { IWalletServiceInterface } from "../../interface/wallet-interface/wallet-service-interface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

export class WalletController {

    private _WalletService :IWalletServiceInterface

    constructor (walletService:IWalletServiceInterface){
        this._WalletService=walletService
    }

    /**
     * 
     * 
     * wallet controler for the customer
     * 
     */
    //---------- get wallet data
    getCustomerWalletData = async (req:Request,res:Response):Promise<void>=>{
    
        const result = await this._WalletService.getWalletData(req.body.userId,'Customer')
        
        res
            .status(StatusCodeEnum.OK)
            .json({success:true , message:MessageEnum.WALLET_FETCH_SUCCESS ,data:result})


    }



    /**
     * 
     * 
     * wallet controler for the Vendor
     * 
     */
    //--------------- get vendor wallet data
        getVendorWalletData = async (req:Request,res:Response):Promise<void>=>{
        
        const result = await this._WalletService.getWalletData(req.body.userId,'Vendor')
        
        res
            .status(StatusCodeEnum.OK)
            .json({success:true , message:MessageEnum.WALLET_FETCH_SUCCESS ,data:result})


    }
}