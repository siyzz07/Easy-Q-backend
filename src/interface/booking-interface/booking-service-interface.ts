import { BookingResponseDTO, checkTimeDto, CreateBookingDTO } from "../../dto/booking-dto/booking-dto";
import { IBooking } from "../../types/common-types";


export interface IBookingServiceInterface {
    addNewbooking(data: CreateBookingDTO): Promise<BookingResponseDTO|void>;
    checkTimeAvailable(data:checkTimeDto):Promise<boolean|string>
    customerBooking(userId:string) :Promise<IBooking[]>
    selectedBookingData  (id:string) :Promise <IBooking[]>
}

