
export interface TransactionDTO {
    id: string;
    flow: "debit" | "credit";
    transactionType: "razorpay" | "wallet";
    amount: number;
    status: string;
    createdAt: Date;
    
   
    date: string;      
    time: string;       
    
  
    bookingId?: string;
    bookingDate?: string; 
    bookingTime?: string; 
    bookingService?: string; 
}
