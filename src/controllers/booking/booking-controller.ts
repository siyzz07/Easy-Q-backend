import { NextFunction, Request, Response } from "express";
import { IBookingServiceInterface } from "../../interface/booking-interface/booking-service-interface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { checkTimeReqMapper } from "../../mappers/booking-mapper/booking-mapper";

export class BookingController {



  private _BookingService:IBookingServiceInterface

  constructor(bookingService:IBookingServiceInterface){
    this._BookingService = bookingService
  }


/**
 * 
 * add new booking
 * 
 */
    
  addNewBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try{

      console.log('req.body :>> ', req.body);

      let result = await this._BookingService.addNewbooking(req.body)
      
      if(result){
        res
          .status(StatusCodeEnum.CREATED)
          .json({message:MessageEnum.BOOKING_CREATED_SUCCESS,data:result  })
      }

    }catch(error:unknown){
      next(error)
    }
  };

  /**
   * 
   *  check the time is available or not
   * 
   */
  bookAvailableTime = async (req:Request ,res:Response,next:NextFunction) :Promise<void> =>{
    try{

      let result = await this._BookingService.checkTimeAvailable(checkTimeReqMapper.toDto(req.body))
      if(result){

      }else{
        res
          .json({success:false , message:MessageEnum.BOOKING_PREFFER_TIME_SLOT_NOT_AVAILABLE})
      }


    }catch(error:unknown){
      next(error)
    }
  }
}
