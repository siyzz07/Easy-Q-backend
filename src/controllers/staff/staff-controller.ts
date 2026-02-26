import { NextFunction, Request, Response } from "express";
import {  IStaffAdd } from "../../types/vendorType";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { IStaffService } from "../../interface/staff-interface/staff-service-interface";

export class StaffController {
  private _StaffServices: IStaffService;

  constructor(staffService: IStaffService) {
    this._StaffServices = staffService;
  }

  //----------------------------------------------- add new Staff

  addStaff = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
      const { userId, ...data }:{userId:string} & IStaffAdd = { ...req.body };
        
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

      

      const result = await this._StaffServices.getStaffService(req.body.userId,req.query);

      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.STAFF_FETCH_SUCCESS, data: result.data ,pagination:result.pagination });
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

      const result = await this._StaffServices.editStaffBlockDate(req.body)
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
