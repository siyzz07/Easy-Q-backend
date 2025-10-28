import { Request, Response } from "express";
import { IStaffServiceInterface } from "../../interface/serviceInterface/vendorServiceInterface";
import { IStaff, IStaffAdd } from "../../types/vendorType";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

export class StaffController {
  private _StaffServices: IStaffServiceInterface;

  constructor(staffService: IStaffServiceInterface) {
    this._StaffServices = staffService;
  }

  //----------------------------------------------- add new Staff

  addStaff = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, ...data }: { userId: string } = { ...req.body };

      const result = await this._StaffServices.addNewStaff(userId, data);
      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.STAFF_ADD_SUCCESS });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {

        if(error.message == MessageEnum.STAFF_ALREADY_EXISTS){
              res
                .status(StatusCodeEnum.CONFLICT)
                .json({message:MessageEnum.STAFF_ALREADY_EXISTS})
        }else{
        res
          .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
        }
      }
    }
  };

 
   //----------------------------------------------- get all staff data
  getStaffsController = async (req: Request, res: Response): Promise<void> => {
    try {
      let result = await this._StaffServices.getStaffService(req.body.userId);

      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.STAFF_FETCH_SUCCESS, data: result });
      } else {
        throw new Error(MessageEnum.STAFF_FETCH_FAILED);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json({ message: MessageEnum.STAFF_FETCH_FAILED });
      }
    }
  };

  //----------------------------------------------- edit the staff data 
  editStaff = async (req:Request,res:Response):Promise<void> =>{
    try{

        let result = await this._StaffServices.editStaff(req.body)
        if(result){
          res
            .status(StatusCodeEnum.OK)
            .json({message:MessageEnum.STAFF_UPDATE_SUCCESS})
        }
        
    }catch(error:unknown){
          if(error instanceof Error){

            if(error.message == MessageEnum.STAFF_ALREADY_EXISTS){
              res.status(StatusCodeEnum.CONFLICT)
              .json({message:MessageEnum.STAFF_ALREADY_EXISTS})
            }else{ 
              res
              .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
              .json({message:MessageEnum.SERVER_ERROR})
            }
          }
    } 
  }
}
