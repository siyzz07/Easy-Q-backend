import { NextFunction, Request, Response } from "express";
import { IBookingServiceInterface } from "../../interface/booking-interface/booking-service-interface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

export class BookingController {



  private _BookingService:IBookingServiceInterface

  constructor(bookingService:IBookingServiceInterface){
    this._BookingService = bookingService
  }

    
  addNewBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try{

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
}
