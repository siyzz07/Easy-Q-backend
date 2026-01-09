import { BookingResponseDTO, checkTimeDto, CreateBookingDTO, bookingDatasPopulatedDto } from "../../dto/booking-dto/booking-dto";
import { IBooking, IBookingPopulated, IPaginationResponseMeta } from "../../types/common-types";


export interface IBookingServiceInterface {
    addNewbooking(data: CreateBookingDTO): Promise<BookingResponseDTO|void>;
    checkTimeAvailable(data:checkTimeDto):Promise<boolean|string>
    customerBooking(userId:string,query:{page?:string,limit?:string,search?:string}) :Promise<{data:bookingDatasPopulatedDto[] ,pagination:IPaginationResponseMeta}>
    selectedBookingData  (id:string) :Promise <bookingDatasPopulatedDto>
    cancelBooking(bookingId:string):Promise<IBooking|void>
}

