import { BookingResponseDTO, checkTimeDto, CreateBookingDTO, bookingDatasPopulatedDto } from "../../dto/booking-dto/booking-dto";
import { IBooking, IPaginationResponseMeta } from "../../types/common-types";


export interface IBookingServiceInterface {
    addNewbooking(data: CreateBookingDTO): Promise<BookingResponseDTO|void>;
    checkTimeAvailable(data:checkTimeDto):Promise<boolean|string>
    customerBooking(userId:string,query:{page?:string,limit?:string,search?:string}) :Promise<{data:bookingDatasPopulatedDto[] ,pagination:IPaginationResponseMeta}>
    VendorBooking(userId:string,query:{page?:string,limit?:string,search?:string,date?:string}) :Promise<{data:bookingDatasPopulatedDto[] ,pagination:IPaginationResponseMeta}>
    selectedBookingData  (userId:string,id:string,role:string) :Promise <bookingDatasPopulatedDto>
    cancelBooking(bookingId:string):Promise<IBooking|void>
    refundBookingCash(bookingId:string):Promise<IBooking|void>
    bookingCheck(data:{vendorId:string;customerId:string}):Promise<boolean>
    bookingTimeReSchedule (data:{staffId:string,timePreffer:string,date:string,bookingId:string,userId:string}):Promise<boolean|void>
    bookingStatusUpdate (bookingId:string,status:string) :Promise<boolean>
}

