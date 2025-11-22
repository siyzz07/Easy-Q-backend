import { BookingResponseDTO, CreateBookingDTO } from "../../dto/booking-dto/booking-dto";
import { IBooking } from "../../types/common-types";


export interface IBookingServiceInterface {
    addNewbooking(data: CreateBookingDTO): Promise<BookingResponseDTO|void>;
}