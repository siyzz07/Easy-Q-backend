import { ITransaction, IBooking, IBookingPopulated } from "../../types/common-types";
import { TransactionDTO } from "../../dto/transaction-dto/transaction-dto";
import { format } from "date-fns";

export class TransactionMapper {
    static toDTO(transaction: ITransaction): TransactionDTO {

        const dto: TransactionDTO = {
            id: (transaction as any)._id.toString(), 
            flow: transaction.flow as "debit" | "credit",
            transactionType: transaction.transactionType as "razorpay" | "wallet",
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            
            // Format dates
            date: format(new Date(transaction.createdAt), "MMM dd, yyyy"),
            time: format(new Date(transaction.createdAt), "hh:mm a"),
            bookingId: undefined,
            bookingDate: undefined,
            bookingTime: undefined,
            
        };

      
        if (transaction.bookingId && typeof transaction.bookingId === 'object' && 'bookingId' in transaction.bookingId) {
             const booking = transaction.bookingId as unknown as IBookingPopulated;
             dto.bookingId = booking.bookingId;
             dto.bookingDate = booking.bookingDate;
             dto.bookingTime = booking.bookingTimeStart;
             dto.bookingService = booking.serviceId.serviceName
        }

        return dto;
    }
}
