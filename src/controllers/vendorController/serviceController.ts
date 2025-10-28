import { Request, Response } from "express";
import { IServiceInterface } from "../../interface/serviceInterface/vendorServiceInterface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

export class VendorServiceController {
  private _Service: IServiceInterface;

  constructor(service: IServiceInterface) {
    this._Service = service;
  }

  // ------------------------------- add a new service for a shop
  addNewService = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._Service.addNewService(req.body);
      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.VENDOR_SERVICE_ADD_SUCCESS });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    }
  };

  // ------------------------------- get the services of the shop
  getSerivces = async (req: Request, res: Response): Promise<void> => {
    try {
      let result = await this._Service.getAllService(req.body.userId);
      res
        .status(StatusCodeEnum.OK)
        .json({
          message: MessageEnum.VENDOR_SERVICE_FETCH_SUCCESS,
          data: result,
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json({ message: error .message });
      }
    }
  };

  // ------------------------------- get the services of the shop
  editService = async (req:Request,res:Response) :Promise<void> =>{
    try{

      let result = await this._Service.editService(req.body)
      if(result){
        res
          .status(StatusCodeEnum.OK)
          .json({message:MessageEnum.VENDOR_SERVICE_EDIT_SUCCESS})
      }
      
    }catch(error:unknown){

    }
  }
}
