import { NextFunction, Request, Response } from "express";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { IServiceInterface } from "../../interface/service-interface/service-service-interface";

export class VendorServiceController {
  private _Service: IServiceInterface;

  constructor(service: IServiceInterface) {
    this._Service = service;
  }

  // ------------------------------- add a new service of a vendor
  addNewService = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
      const result = await this._Service.addNewService(req.body);
      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.VENDOR_SERVICE_ADD_SUCCESS });
      }
    } catch (error: unknown) {
      next(error)
    }
  };

  // ------------------------------- get  services of the shop / DD
  getSerivces = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
      const result = await this._Service.getAllService(req.body.userId,req.query);
      res
        .status(StatusCodeEnum.OK)
        .json({
          message: MessageEnum.VENDOR_SERVICE_FETCH_SUCCESS,
          data: result.data,
          pagination:result.pagination
        });
    } catch (error: unknown) {
      next(error)
    }
  };

  // ------------------------------- edit  services of a shop
  editService = async (req:Request,res:Response,next:NextFunction) :Promise<void> =>{
    try{

      const result = await this._Service.editService(req.body)
      if(result){
        res
          .status(StatusCodeEnum.OK)
          .json({message:MessageEnum.VENDOR_SERVICE_EDIT_SUCCESS})
      }
      
    }catch(error:unknown){
        next(error)
    }
  }


//------------------------- get shop services / DD
  getShopServices = async (req:Request,res:Response,next:NextFunction) :Promise<void> =>{
      try{
      
          const shopId = req.params.shopId
       const result = await this._Service.getEachVendorServices(shopId)
       if(result){
        res
          .status(StatusCodeEnum.OK)
          .json({message:MessageEnum.SERVICE_FETCH_SUCCESS,data:result})
       }
       
        
      }catch(error:unknown){
  
          next(error)
      }
    }  


  // ------------------------------- get selected response
  getSelectedService = async(req:Request,res:Response,next:NextFunction) :Promise<void> =>{
    try{

      const {id} = req.query
      const reuslt = await this._Service.getSelectedSerivce(id as string)
      if(reuslt){
        res
          .status(StatusCodeEnum.OK)
          .json({message:MessageEnum.SERVICE_FETCH_SUCCESS,data:reuslt})
      }
        

    }catch(error:unknown){
      next(error)
    }
  }
  // ------------------------------- get selected service 
  getSelectedServicePopulated = async(req:Request,res:Response,next:NextFunction) :Promise<void> =>{
    try{

      const {id} = req.query
      console.log(id)
      const reuslt = await this._Service.getSelectedSerivcePopulated(id as string)
      if(reuslt){
        res
          .status(StatusCodeEnum.OK)
          .json({message:MessageEnum.SERVICE_FETCH_SUCCESS,data:reuslt})
      }
        

    }catch(error:unknown){
      next(error)
    }
  }

  
}
