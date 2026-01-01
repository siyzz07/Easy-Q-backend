import { NextFunction, Request, Response } from "express";
import { IStaff, IStaffAdd } from "../../types/vendorType";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { IStaffServiceInterface } from "../../interface/staff-interface/staff-service-interface";

export class StaffController {
  private _StaffServices: IStaffServiceInterface;

  constructor(staffService: IStaffServiceInterface) {
    this._StaffServices = staffService;
  }

  //----------------------------------------------- add new Staff

  addStaff = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
      const { userId, ...data }:{userId:string,data:IStaffAdd} = { ...req.body };

        console.log("---------------------------0",req.body);
        
      const result = await this._StaffServices.addNewStaff(userId, data);
      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.STAFF_ADD_SUCCESS });
      }
    } catch (error: unknown) {
      next(error)
    }
  };

 
   //----------------------------------------------- get all staff data
  getStaffsController = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {

     

      const result = await this._StaffServices.getStaffService(req.body.userId);

      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.STAFF_FETCH_SUCCESS, data: result });
      } else {
        throw new Error(MessageEnum.STAFF_FETCH_FAILED);
      }
    } catch (error: unknown) {
      next(error)
    }
  };

  //----------------------------------------------- edit the staff data 
  editStaff = async (req:Request,res:Response,next:NextFunction):Promise<void> =>{
    try{

        const result = await this._StaffServices.editStaff(req.body)
        if(result){
          res
            .status(StatusCodeEnum.OK)
            .json({message:MessageEnum.STAFF_UPDATE_SUCCESS})
        }
        
    }catch(error:unknown){
          next(error)
    } 
  }

  //----------------------------------------------- edit blokc Staff dates
  staffBlockedDate = async (req:Request ,res:Response,next:NextFunction):Promise<void>=>{
    try{

      let result = await this._StaffServices.editStaffBlockDate(req.body)
      if(result){
        res
          .status(StatusCodeEnum.OK)
          .json({message:MessageEnum.STAFF_UPDATE_SUCCESS})
      }
      
    }catch(error:unknown){
      next(error)
    }
  }
}
