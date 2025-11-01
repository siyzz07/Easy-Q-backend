import { Request, Response } from "express";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { ICustomerServiceInterface } from "../../interface/serviceInterface/customerServiceInterface";
import { MessageEnum } from "../../enums/messagesEnum";
import { log } from "console";

export class CustomerController {
  private _customerService: ICustomerServiceInterface;

  constructor(customerservice: ICustomerServiceInterface) {
    this._customerService = customerservice;
  }

  //--------------------------------------------------------------------------get vendors data
  getShopsData = async (req: Request, res: Response): Promise<void> => {
    try {
      const shops = await this._customerService.getVendorsData();
      const activeShops = (shops || []).filter((shop) => shop.hasShop === true);
      res.status(StatusCodeEnum.OK).json({
        success: true,
        message: MessageEnum.SHOP_DATA_FETCH_SUCCESS,
        data: activeShops,
      });
    } catch (error: unknown) {
      console.error("Error fetching shops:", error);

      if (error instanceof Error) {
        res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: MessageEnum.SHOP_DATA_ADDED_FAILED,
          error: error.message,
          data: [],
        });
      } else {
        res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: MessageEnum.SERVER_ERROR,
          data: [],
        });
      }
    }
  };

  //--------------------------------------------------------------------------get customer data
  getCustomerData = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.body.userId;

      const response = await this._customerService.getCustomerData(id);
      if (response) {
        res.status(StatusCodeEnum.OK).json({
          message: MessageEnum.CUSTOMER_DATA_FETCH_SUCCESS,
          data: response,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.CUSTOMER_DATA_FETCH_FAILED) {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json({ message: MessageEnum.SERVER_ERROR });
        }
      }
    }
  };

  //------------------------------------------------- upadte profile
  editProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: {
        name: string;
        email: string;
        phone: string;
        userId: string;
      } = req.body;

      const result = await this._customerService.editProfile(data);
      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.CUSTOMER_PROFILE_UPDATED });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json({ message: MessageEnum.SERVER_ERROR });
      }
      console.log("error to update customer profile", error);
    }
  };

  //-------------------------------------------------chage password in profile
  changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._customerService.updatePasswordInProfile(
        req.body
      );
      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.PASSWROD_CAHNGE_SUCCESS });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message) {
          res
            .status(StatusCodeEnum.BAD_REQUEST)
            .json({ message: error.message });
        }
      }
    }
  };

  //-------------------------------------------------get Each  shopdata
  shopDataEach = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;

      const result = await this._customerService.getEachVendorData(id);
      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.VENDOR__DATA_FETCH_SUCCESS ,data:result});
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.VENDOR__DATA_FETCH_FAILED) {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
        } else {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
        }
      }
    }
  };

  //-------------------------------------------------get Each shop service
  getShopServices = async (req:Request,res:Response) :Promise<void> =>{
    try{

        const shopId = req.params.shopId
     const result = await this._customerService.getEachVendorServices(shopId)
     if(result){
      res
        .status(StatusCodeEnum.OK)
        .json({message:MessageEnum.SERVICE_FETCH_SUCCESS,data:result})
     }
     
      
    }catch(error:unknown){

        if(error instanceof Error){
          res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json({message:MessageEnum.SERVER_ERROR})
        }
        console.log('error to fect the service type of a vendor');
        
    }
  }  
}
