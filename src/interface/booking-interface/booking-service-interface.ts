import { BookingResponseDTO, checkTimeDto, CreateBookingDTO } from "../../dto/booking-dto/booking-dto";
import { IBooking, IBookingPopulated, IPaginationResponseMeta } from "../../types/common-types";


export interface IBookingServiceInterface {
    addNewbooking(data: CreateBookingDTO): Promise<BookingResponseDTO|void>;
    checkTimeAvailable(data:checkTimeDto):Promise<boolean|string>
    customerBooking(userId:string,query:{page?:string,limit?:string,search?:string}) :Promise<{data:IBookingPopulated[] ,pagination:IPaginationResponseMeta}>
    selectedBookingData  (id:string) :Promise <IBookingPopulated>
    cancelBooking(bookingId:string):Promise<IBooking|void>
}

