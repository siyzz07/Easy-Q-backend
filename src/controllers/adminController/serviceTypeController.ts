import { NextFunction, Request, Response } from "express";
import { IShopTypeServiceInterface } from "../../interface/serviceInterface/adminServiceInterface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

export class ServiceTypeController {
  private _ServiceTypeService: IShopTypeServiceInterface;

  constructor(serviceTypes: IShopTypeServiceInterface) {
    this._ServiceTypeService = serviceTypes;
  }




  //--------------------------------------------------------------------------add new service type controller
  addServiceType = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
      const result = await this._ServiceTypeService.addServiceType(req.body);

      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.SERVICE_ADD_SUCCESS });
      }
    } catch (error: unknown) {
        next(error)
    }
  };

  //-------------------------------------------------------------------------- get services
  getServiceTypes = async (req: Request, res: Response): Promise<void> => {
    try {
      
      
      const result = await this._ServiceTypeService.getServices()
      
      res
      .status(StatusCodeEnum.OK)
      .json({message:MessageEnum.SERVICE_FETCH_SUCCESS,data:result})
    } catch (error: unknown) {
      if(error instanceof Error){
        res
        .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
        .json({message:MessageEnum.SERVER_ERROR})
      }
    }
  };

  //--------------------------------------------------------------------------edit services
  editServiceType = async (req:Request,res:Response) :Promise<void> =>{
    try{
        console.log( req.body);
        const result = await this._ServiceTypeService.editServiceType(req.body)
        console.log('ppp',result);
        
        if( result){
          res
            .status(StatusCodeEnum.OK)
            .json({message:MessageEnum.SERVICE_EDIT_SUCCESS})
        }
    }catch(error : unknown){
      


    }
  }
  
}
