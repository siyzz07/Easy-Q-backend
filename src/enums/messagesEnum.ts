export enum MessageEnum {

  FORBIDDEN = "Forbidden Access denied",

  // --------------------------------------------------------------------------customer
  CUSTOMER_ALREADY_EXISTS = "Customer already exists",
  CUSTOMER_REGISTERED = "Customer registered successfully",
  CUSTOMER_NOT_FOUND = "Customer not found",
  CUSTOMER_LOGIN_SUCCESS = "Customer logged in successfully",
  CUSTOMER_DATA_FETCH_SUCCESS ='Customer data fetch successfully',
  CUSTOMER_DATA_UPDATION_SUCCESS ='Customer data updated successfully',
  CUSTOMER_DATA_FETCH_FAILED ='Customer data fetching failed',
  CUSTOMER_ALL_DATA_FETCH_SUCCESS ='Customers datas fetch successfully',
  CUSTOMER_BLOCKED ='Customer blocked by admin',
  CUSTOMER_PROFILE_UPDATED ='Customer profile updated',
  CUSTOMER_ADD_ERROR='Error to add customer please try again latter',
  

  
 
  
  EMAIL_SEND_SUCCESS = 'Email send successfully',
  EMAIL_VERIFY_SUCCESS = "Email verified successfully",
  EMAIL_TOKEN_EXPIRED = "Token expired, please register again",
  EMAIL_TOKEN_INVALID = "Invalid token, please register again",
  EMAIL_TOKEN_MISSING = "Token is required ,please register again",
  EMAIL_SERVER_ERROR = "Something went wrong,please register again",
  
  




  //--------------------------------------------------------------------------common

  
  INVALID_CREDENTIALS = "Invalid email or password",
  INVALID_PASSWORD = "Invalid password",
  MISSING_FIELDS = "Required fields are missing",
  LOGOOUT_SUCCESS = 'Logut success',
  SERVER_ERROR = 'Internal server error',
  PASSWROD_CAHNGE_SUCCESS ='Password change successfully',
  PASSWROD_CAHNGE_FAILED ='Unable to change password',
  ACCOUNT_BLOCKED="Your account is blocked",
  SUCCEESS ="success",

  REGISTER_SUCCESS ='Register success pleas verify your email',
  ROLE_NOT_FOUND="Entity role not found",
  ENTITY_ADDEDD_SUCCESSFULY = 'Registration has been successfully completed.',
  LOGIN_SUCCESSFLLY = ' login successfully',
  REFRESH_TOKEN_MISSING = 'Refresh token missing',


  // --------------------------------------------------------------------------vendor
  VENDOR_EXISTS = "Vendor already exists",
  VENDOR_NOT_FOUND = "Vendor not found",
  VENDOR_ADD_ERROR='Error to add vendor please try again latter',
  VENDOR_CREATED = "Vendor created successfully",
  VENDOR_UPDATED = "Vendor updated successfully",
  VENDOR_DELETED = "Vendor deleted successfully",
  VENDOR_REGISTERED = "Vendor registered successfully",
  VENDOR_BLOCKED = "Vendor blocked by admin",
  VENDOR_DATA_UPDATION_SUCCESS ='Vendor data updated successfully',
  VENDOR_DATA_UPDATION_FAILED ='Failed to update vendor data ',
  LOGIN_SUCCESS = "Vendor logged in successfully",
  UNAUTHORIZED = "You are not authorized to perform this action",
  PLAN_EXPIRED = "Vendor plan has expired",
  VENDOR__DATA_FETCH_SUCCESS ='Vendor data fetch successfully',
  VENDOR__DATA_FETCH_FAILED ='Error to fetch vedor data',
  VENDOR_UNDER_VERIFICATION = "Your account is under verification. Please wait for admin approval.",
  VENDOR_VERIFICATION_REJECTED = "Your account verification was rejected by admin. Please register again with valid data.",
  VENDOR_VRIFIED = "Vendor vierified",
  VENDOR_DENIED = "Vendor verification rejected",
  VENDOR_SHOP_IMAGE_ADDED_SUCCESS = 'Image added successfully',
  VENDOR_SHOP_IMAGE_DELETED_SUCCESS = 'Image deleted successfully',
  VENDOR_SHOP_IMAGE_DELETED_FAILED = 'Unable to delete image',
  

  
  
  // --------------------------------------------------------------------------google autth
   GOOGLEAUTH_CANCELLED= "Google sign-in cancelled.",
   GOOGLEAUTH_LOGIN_TRY= "Please login using Google to proceed.",

  // --------------------------------------------------------------------------token
  
  TOKEN_VALID = "Token is valid",
  TOKEN_EXPIRED = "Access token expired",
  TOKEN_REFRESH_EXPIRED = "Refresh token expired, please login again",
  TOKEN_INVALID = "Invalid token",
  TOKEN_MISSING = "Token missing, please login",
  TOKEN_REFRESH_SUCCESS = "Access token refreshed successfully",
  TOKEN_REFRESH_MISSING = "Refresh token missing",





  // --------------------------------------------------------------------------admin
  
  ADMIN_LOGIN_SUCCESS = "Admin logged in successfully.",
  ADMIN_LOGIN_FAILED = "Invalid email or password.",
  ADMIN_NOT_FOUND = "Admin not found.",
  ADMIN_PASSWORD_INCORRECT = "Incorrect password.",
  ADMIN_ALREADY_EXISTS = "Admin already exists",


  // --------------------------------------------------------------------------Shop
  
  SHOP_DATA_FETCH_SUCCESS = "Shops fetched successfully",
  SHOP_DATA_ADDED_SUCCESS = "Shop data added successful",
  SHOP_DATA_ADDED_FAILED = 'Something went wrong ,Cannot added shop data',

  // --------------------------------------------------------------------------Shop
  ADDRESS_ADDED_SUCCESS = "Address added successfully",
  ADDRESS_FETCH_SUCCESS = "Address fetch successfully",
  ADDRESS_EXISTS = "Address already exists",
  ADDRESS_UPDATED_SUCCESS = "Address updated successfully",
  ADDRESS_UPDATED_FAILED = "Uneble to update address",
  ADDRESS_NOT_FOUND = "Address not found",
  ADDRESS_DELETED_SUCCESS = "Address deleted successfully",
  ADDRESS_DELETED_FAILED = "Unable to delete address",
  ADDRESS_INVALID = "Invalid address data",
  ADDRESS_EDIT_SUCCESS = "Address editing success",
  ADDRESS_EDIT_FAILED = "Invalid address data",


  // --------------------------------------------------------------------------service by admin
  SERVICE_ADD_SUCCESS = "Service added successfully.",
  SERVICE_FETCH_SUCCESS = "Service fetch successfully.",
  SERVICE_FETCH_FAILED = "Failde to fetch service.",
  SERVICE_EDIT_SUCCESS = "Service edited successfully.",
  SERVICE_ADD_FAILD = "Failed to add service. Please try again.",
  SERVICE_ALREADY_EXIST = "Service already exists.",
  
  // --------------------------------------------------------------------------staff
  STAFF_ADD_SUCCESS = "Staff added successfully.",
  STAFF_ADD_FAILED = "Failed to add staff.",
  STAFF_ALREADY_EXISTS = "Staff with this name already exists.",
  STAFF_NOT_FOUND = "Staff not found.",
  STAFF_FETCH_SUCCESS = "Staff data fetched successfully.",
  STAFF_FETCH_FAILED = "Failed to fectch staff data.",
  STAFF_UPDATE_SUCCESS = "Staff updated successfully.",
  STAFF_UPDATE_FAILED = "Failed to update staff.",
  STAFF_STATUS_UPDATED = "Staff status updated successfully.",


   // --------------------------------------------------------------------------service by vendor
  VENDOR_SERVICE_ADD_SUCCESS = "Service added successfully.",
  VENDOR_SERVICE_FETCH_SUCCESS = "Service fetch successfully.",
  VENDOR_SERVICE_ADD_FAILD = "Failed to add service. Please try again.",
  VENDOR_SERVICE_ALREADY_EXIST = "Service already exists.",
  VENDOR_SERVICE_EDIT_SUCCESS = "Service edited successfully.",

  // --------------------------------------------------------------------------Booking
  BOOKING_CREATED_SUCCESS = "Booking created successfully.",
  BOOKING_CREATION_FAILED = "Failed to create booking.",
  BOOKING_PREFFER_TIME_SLOT_NOT_AVAILABLE = 'No slots are available within the customer’s preferred time range.. Select a different time, staff, or date.',
  BOOKING_DATA_FETCH_SUCCESS = "Booking data fetched successfully",
  BOOKING_DATA_FETCH_FAILED ='Failed to fetch booking data',
  BOOKING_ID_INVALIED = 'Invalied booking id',
  BOOKING_CANCEL_SUCCESS = 'Booking cancelled successfully',
  BOOKING_AMOUNT_REFUNDED = 'Booking amount refunded successfully',
  BOOKING_RESCHEDULE_LIMIT = "You can reschedule a booking only 1 times. You have already rescheduled it twice.",
  BOOKING_RESCHEDULE_SUCCESS = "Booking rescheduled successfully",
  BOOKING_RESCHEDULE_FAILED = "Failed to reschedule booking",


     // --------------------------------------------------------------------------Favorite
    FAVORITE_ADD_SUCCESS = "Vendor added to favorite list",
    FAVORITE_ADD_FAILED = "Failed to add vendor to favorite list",

    FAVORITE_REMOVE_SUCCESS = "Vendor removed from favorite list",
    FAVORITE_REMOVE_FAILED = "Failed to remove vendor from favorite list",

    FAVORITE_UPDATE_SUCCESS = "Favorite updated successfully",
    FAVORITE_UPDATE_FAILED = "Failed to update favorite",

    FAVORITE_FETCH_SUCCESS = "Favorite fetched successfully",
    FAVORITE_FETCH_FAILED = "Failed to fetch favorite list",

    // --------------------------------------------------------------------------Review
    REVIEW_ADD_SUCCESS = "Review added successfully",
    REVIEW_FETCH_SUCCESS = "Reviews fetched successfully",
    REVIEW_DELETE_SUCCESS = "Review deleted successfully",
    REVIEW_UPDATE_SUCCESS = "Review updated successfully",
    REVIEW_NOT_FOUND = "Review not found",


    // --------------------------------------------------------------------------Wallet
     WALLET_UPDATED = "Wallet updated successfully",
     WALLET_UPDATE_FAILED = "Failed to update wallet",
     WALLET_NOT_FOUND = "Wallet not found",
     WALLET_INSUFFICIENT_BALANCE = "Insufficient wallet balance",
     WALLET_INVALID_AMOUNT = "Invalid wallet amount",
     WALLET_CREATED = "Wallet created successfully",
     WALLET_ALREADY_EXISTS = "Wallet already exists",
     WALLET_FETCH_SUCCESS = "Wallet fetched successfully",

    // --------------------------------------------------------------------------Transaction
    TRANSACTION_PAYMENT_INVALIED = 'Invalied payment ',
    TRANSACTION_FETCH_SUCCESS = 'Transaction fetchess successfully ',
    
    // --------------------------------------------------------------------------Notificaion
    NOTIFICATION_FETCH_SUCCESS = "Notifications fetched successfully",
    NOTIFICATION_FETCH_FAILED = "Failed to fetch notifications",
    
    NOTIFICATION_UPDATED_SUCCESS = "Updated successfully",
    NOTIFICATION_UPDATED_FAILED = "Update failed",
    // --------------------------------------------------------------------------Contract
     CONTRACT_CREATED = "Contract created successfully",
  CONTRACT_UPDATED = "Contract updated successfully",
  CONTRACT_DELETED = "Contract deleted successfully",
  CONTRACT_APPLIED = "Contract applied successfully",
  CONTRACT_ACCEPTED = "Vendor accepted for the contract",
  CONTRACT_REJECTED = "Vendor rejected for the contract",
  CONTRACT_CLOSED = "Contract closed successfully",
  CONTRACT_COMPLETED = "Contract marked as completed",
   CONTRACT_CREATE_FAILED = "Failed to create contract",
  CONTRACT_UPDATE_FAILED = "Failed to update contract",
  CONTRACT_DELETE_FAILED = "Failed to delete contract",
  CONTRACT_NOT_FOUND = "Contract not found",
  CONTRACT_ALREADY_APPLIED = "You have already applied for this contract",


}


// -----------------------------
// Booking Notification Titles
// -----------------------------
export enum BookingMessageTitle {
  // Customer side
  BOOKING_SUCCESS = "Booking Successful",
  BOOKING_FAILED = "Booking Failed",
  BOOKING_CONFIRMED_CUSTOMER = "Booking Confirmed",
  BOOKING_RESCHEDULED = "Booking Rescheduled",

  // Vendor side
  NEW_BOOKING_VENDOR = "New Booking Received",

  // Common
  BOOKING_UPDATED = "Booking Updated",
  BOOKING_CANCELLED = "Booking Cancelled",
}


// -----------------------------
// Booking Notification Contents
// -----------------------------
export enum BookingMessageContent {
  // Customer side
  BOOKING_SUCCESS = "Your booking has been successfully created.",
  BOOKING_FAILED = "There was an issue creating your booking.",
  BOOKING_CONFIRMED_CUSTOMER = "Your booking has been confirmed. Your scheduled time is:",
  BOOKING_RESCHEDULED = "Your booking has been rescheduled. Your updated scheduled time is:",

  // Vendor side
  NEW_BOOKING_VENDOR = "A customer has placed a new booking on time",

  // Common
  BOOKING_UPDATED = "Your booking details have been updated.",
  BOOKING_CANCELLED = "Booking has been cancelled .",
}


export enum BookingMessageContentLong {
  // Customer
  BOOKING_SUCCESS = "Your booking has been successfully created. You can check details on the bookings page.",
  BOOKING_FAILED = "There was an issue creating your booking. Please try again or contact support.",
  BOOKING_CONFIRMED = "Your booking has been confirmed. Your scheduled time is: ",
  
  // Vendor
  NEW_BOOKING_VENDOR = "A customer has placed a new booking request. Please review and confirm the booking in your dashboard.",
  
  // Common
  BOOKING_UPDATED = "Your booking details have been updated. Please check the updated schedule and service information.",
  BOOKING_CANCELLED = "This booking has been cancelled. If this was a mistake, you may create a new booking.",
}


 
  

