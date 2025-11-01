export enum MessageEnum {


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
  LOGIN_SUCCESS = "Vendor logged in successfully",
  UNAUTHORIZED = "You are not authorized to perform this action",
  PLAN_EXPIRED = "Vendor plan has expired",
  VENDOR__DATA_FETCH_SUCCESS ='Vendor data fetch successfully',
  VENDOR__DATA_FETCH_FAILED ='Error to fetch vedor data',
  VENDOR_UNDER_VERIFICATION = "Your account is under verification. Please wait for admin approval.",
  VENDOR_VERIFICATION_REJECTED = "Your account verification was rejected by admin. Please register again with valid data.",
  VENDOR_VRIFIED = "Vendor vierified",
  VENDOR_DENIED = "Vendor verification rejected",
  

  
  
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
 
}


 
  

