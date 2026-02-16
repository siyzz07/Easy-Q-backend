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


      const result = await this._BookingService.addNewbooking(req.body)
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

      const result = await this._BookingService.checkTimeAvailable(checkTimeReqMapper.toDto(req.body))
      if(result){
          res 
            .status(StatusCodeEnum.OK)
            .json({success:true , message:MessageEnum.BOOKING_CREATED_SUCCESS,bookingId:result })
      }else{
        res
          .status(StatusCodeEnum.OK)
          .json({success:false , message:MessageEnum.BOOKING_PREFFER_TIME_SLOT_NOT_AVAILABLE})
      }


    }catch(error:unknown){
      next(error)
    }
  }


  /**
   * 
   *  get bookings of the customer
   * 
   */

  getCustomerBookings = async(req:Request,res:Response,next:NextFunction) :Promise<void> =>{
    try{
      

      console.log('reached cutomer booking controller');
      
      const result = await this._BookingService.customerBooking(req.body.userId,req.query)

      if(result){ 
        res 
          .status(StatusCodeEnum.OK)
          .json({success:true,message:MessageEnum.BOOKING_DATA_FETCH_SUCCESS,data:result.data , pagination:result.pagination})
      }
    }catch(error){
      next(error)
    }
  }

  /**
   * 
   *  get bookings of the vendor
   * 
   */
  getVendorBookings = async (req:Request,res:Response):Promise<void> =>{
    
    const result = await this._BookingService.VendorBooking(req.body.userId,req.query)

    res 
      .status(StatusCodeEnum.OK)
      .json({success:true , message:MessageEnum.BOOKING_DATA_FETCH_SUCCESS ,data:result.data ,pagination:result.pagination})

  }


  /**
   * 
   *  get selected booking data
   * 
   */
  getSelectedBookingData =  async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
      try {

        
        const id = req.params.id
        const role = req.params.role
        const userId = req.body.userId
        const result = await this._BookingService.selectedBookingData(userId,id,role)
        if(result){
          res
            .status(StatusCodeEnum.OK)
            .json({success:true , message:MessageEnum.BOOKING_DATA_FETCH_SUCCESS , data:result})
        }
      } catch (error) {
          next(error)
      }
  }
  


  /**
   * 
   *  cancel booking
   * 
   */
  cancelBooking = async (req:Request,res:Response,next:NextFunction):Promise<void> =>{
    try{
        const {bookingId} = req.params 
        const result = await this._BookingService.cancelBooking(bookingId)
        if(result){
          res
            .status(StatusCodeEnum.OK)
            .json({success:true , message:MessageEnum.BOOKING_CANCEL_SUCCESS})
        }
    }catch(error){
      next(error)
    }

  }


  
  /**
   * 
   *  refund booking
   * 
   */
   refundBooking = async (req:Request,res:Response) :Promise<void> =>{

    const bookingId = req.params.bookingId

    await this._BookingService.refundBookingCash(bookingId)

    res
      .status(StatusCodeEnum.OK)
      .json({success:true , message:MessageEnum.BOOKING_AMOUNT_REFUNDED})
   }

   /**
   * 
   *  booking time reschedule
   * 
   */
  bookingTimeReschedule = async (req:Request,res:Response) :Promise<void> =>{
      
    const response = await this._BookingService.bookingTimeReSchedule(req.body)

    if(response){
      res
        .status(StatusCodeEnum.OK)
        .json({success:true,message:MessageEnum.BOOKING_RESCHEDULE_SUCCESS})
    }
  }

   /**
   * 
   *  update booking status
   * 
   */
  statusUpdate = async (req:Request,res:Response) =>{

    const bookingId = req.params.bookingId

    const result = await this._BookingService.bookingStatusUpdate(bookingId,req.body.status)

    if(result){
       res
        .status(StatusCodeEnum.OK)
        .json({success:true})
    }else{
       res
        .status(StatusCodeEnum.OK)
        .json({success:false})
    }


  }


  /**
   * 
   *  check the customer have any boooking in the shop -check the customer is eligible for review the shop
   * 
   */
  isThereBooking = async (req:Request,res:Response) :Promise<void> =>{

    const vendorId = req.params.vendorId
    const customerId= req.body.userId
    const result = await this._BookingService.bookingCheck({vendorId,customerId})
    res
      .status(StatusCodeEnum.OK)
      .json({success:true , data:result})
    

  }

}
