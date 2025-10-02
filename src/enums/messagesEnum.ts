export enum MessageEnum {


  // --------------------------------------------------------------------------customer
  CUSTOMER_ALREADY_EXISTS = "Customer already exists",
  CUSTOMER_REGISTERED = "Customer registered successfully",
  CUSTOMER_NOT_FOUND = "Customer not found",
  INVALID_CREDENTIALS = "Invalid email or password",


  EMAIL_VERIFY_SUCCESS = "Email verified successfully",
  EMAIL_TOKEN_EXPIRED = "Token expired, please register again",
  EMAIL_TOKEN_INVALID = "Invalid token, please register again",
  EMAIL_TOKEN_MISSING = "Token is required ,please register again",
  EMAIL_SERVER_ERROR = "Something went wrong,please register again",
  
}