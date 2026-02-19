import { NextFunction, Request, Response } from "express";
import { IFavoriteService } from "../../interface/favorite-interface/favorite-service-interface";
import { favoriteUpdataReqMapper, getFavoriteReqMapper } from "../../mappers/favorite-mapper/favorite-mapper";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";


export class FavoriteController {

    private _favoriteService :IFavoriteService

    constructor(favoriteservice:IFavoriteService){
        this._favoriteService=favoriteservice
    }

    //----------------------- add to favorite
    updateFavorite = async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        try{
                const result = await this._favoriteService.favoriteUpdate(favoriteUpdataReqMapper.toDto(req.body))
                res
                    .status(StatusCodeEnum.OK)
                    .json({message:result,success:true})

        }catch(error:unknown){

            next(error)
        }
    }

    //----------------------- get customer favorite
    getFavorites = async (req:Request,res:Response,next:NextFunction) :Promise <void> =>{
        try{

            
            const result = await this._favoriteService.getFavorite(getFavoriteReqMapper.toDto(req.body))
            res
                .status(StatusCodeEnum.OK)
                .json({success:true,Message:MessageEnum.FAVORITE_FETCH_SUCCESS,data:result})

        }catch(error:unknown){
            next(error)
        }
    }

    //----------------------- get favorite shopes
    getFavoriteShopes = async (req:Request,res:Response,next:NextFunction):Promise<void> =>{
        try{
            const result = await this._favoriteService.getFavoriteShopes(req.body)
            res
                .status(StatusCodeEnum.OK)
                .json({success:true,message:MessageEnum.FAVORITE_FETCH_SUCCESS,data:result})

        }catch(error:unknown){
            next(error)
        }
    }
}