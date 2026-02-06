

export const enum NotificationCategoryEnum {
  BOOKING = "booking",
  CONTRACT = "contract",
  MESSAGE = "message",
}


export enum BookingNotificationTypeEnum {
  BOOKING_COMPLETED = "booking_completed",
  BOOKING_CANCELLED = "booking_cancelled",
  BOOKING_RESCHEDULED = "booking_rescheduled",
  BOOKING_NEW ='new_booking'
}



export enum ContractNotificationTypeEnum{
  CONTRACT_APPLIED = "contract_applied",
  CONTRACT_APPROVED = "contract_approved",
  CONTRACT_REJECTED = "contract_rejected",
  CONTRACT_CANCELLED = "contract_cancelled",

}