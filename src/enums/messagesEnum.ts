export enum MessageEnum {


  // --------------------------------------------------------------------------customer
  CUSTOMER_ALREADY_EXISTS = "Customer already exists",
  CUSTOMER_REGISTERED = "Customer registered successfully",
  CUSTOMER_NOT_FOUND = "Customer not found",
  CUSTOMER_LOGIN_SUCCESS = "Customer logged in successfully",
 
  
  EMAIL_SEND_SUCCESS = 'Email send successfully',
  EMAIL_VERIFY_SUCCESS = "Email verified successfully",
  EMAIL_TOKEN_EXPIRED = "Token expired, please register again",
  EMAIL_TOKEN_INVALID = "Invalid token, please register again",
  EMAIL_TOKEN_MISSING = "Token is required ,please register again",
  EMAIL_SERVER_ERROR = "Something went wrong,please register again",
  
  




  //--------------------------------------------------------------------------common

  
  INVALID_CREDENTIALS = "Invalid email or password",
  MISSING_FIELDS = "Required fields are missing",
  LOGOOUT_SUCCESS = 'Logut success',
  SERVER_ERROR = 'Internal server error',
  PASSWROD_CAHNGE_SUCCESS ='Password change successfully',
  
  
  
  // --------------------------------------------------------------------------vendor
  VENDOR_EXISTS = "Vendor already exists",
  VENDOR_NOT_FOUND = "Vendor not found",
  VENDOR_CREATED = "Vendor created successfully",
  VENDOR_UPDATED = "Vendor updated successfully",
  VENDOR_DELETED = "Vendor deleted successfully",
  VENDOR_REGISTERED = "Vendor registered successfully",
  LOGIN_SUCCESS = "Vendor logged in successfully",
  UNAUTHORIZED = "You are not authorized to perform this action",
  PLAN_EXPIRED = "Vendor plan has expired",
  

  
  
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
  ADMIN_NOT_FOUND = "User not found.",
  ADMIN_PASSWORD_INCORRECT = "Incorrect password.",


  // --------------------------------------------------------------------------Shop

  SHOP_DATA_FETCH_SUCCESS = "Shops fetched successfully",
  SHOP_DATA_ADDED_SUCCESS = "Shop data added successful",
  SHOP_DATA_ADDED_FAILED = 'Something went wrong ,Cannot added shop data',
}

