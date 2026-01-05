"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingMessageContentLong = exports.BookingMessageContent = exports.BookingMessageTitle = exports.MessageEnum = void 0;
var MessageEnum;
(function (MessageEnum) {
    MessageEnum["FORBIDDEN"] = "Forbidden Access denied";
    // --------------------------------------------------------------------------customer
    MessageEnum["CUSTOMER_ALREADY_EXISTS"] = "Customer already exists";
    MessageEnum["CUSTOMER_REGISTERED"] = "Customer registered successfully";
    MessageEnum["CUSTOMER_NOT_FOUND"] = "Customer not found";
    MessageEnum["CUSTOMER_LOGIN_SUCCESS"] = "Customer logged in successfully";
    MessageEnum["CUSTOMER_DATA_FETCH_SUCCESS"] = "Customer data fetch successfully";
    MessageEnum["CUSTOMER_DATA_UPDATION_SUCCESS"] = "Customer data updated successfully";
    MessageEnum["CUSTOMER_DATA_FETCH_FAILED"] = "Customer data fetching failed";
    MessageEnum["CUSTOMER_ALL_DATA_FETCH_SUCCESS"] = "Customers datas fetch successfully";
    MessageEnum["CUSTOMER_BLOCKED"] = "Customer blocked by admin";
    MessageEnum["CUSTOMER_PROFILE_UPDATED"] = "Customer profile updated";
    MessageEnum["CUSTOMER_ADD_ERROR"] = "Error to add customer please try again latter";
    MessageEnum["EMAIL_SEND_SUCCESS"] = "Email send successfully";
    MessageEnum["EMAIL_VERIFY_SUCCESS"] = "Email verified successfully";
    MessageEnum["EMAIL_TOKEN_EXPIRED"] = "Token expired, please register again";
    MessageEnum["EMAIL_TOKEN_INVALID"] = "Invalid token, please register again";
    MessageEnum["EMAIL_TOKEN_MISSING"] = "Token is required ,please register again";
    MessageEnum["EMAIL_SERVER_ERROR"] = "Something went wrong,please register again";
    //--------------------------------------------------------------------------common
    MessageEnum["INVALID_CREDENTIALS"] = "Invalid email or password";
    MessageEnum["INVALID_PASSWORD"] = "Invalid password";
    MessageEnum["MISSING_FIELDS"] = "Required fields are missing";
    MessageEnum["LOGOOUT_SUCCESS"] = "Logut success";
    MessageEnum["SERVER_ERROR"] = "Internal server error";
    MessageEnum["PASSWROD_CAHNGE_SUCCESS"] = "Password change successfully";
    MessageEnum["PASSWROD_CAHNGE_FAILED"] = "Unable to change password";
    MessageEnum["ACCOUNT_BLOCKED"] = "Your account is blocked";
    MessageEnum["SUCCEESS"] = "success";
    MessageEnum["REGISTER_SUCCESS"] = "Register success pleas verify your email";
    MessageEnum["ROLE_NOT_FOUND"] = "Entity role not found";
    MessageEnum["ENTITY_ADDEDD_SUCCESSFULY"] = "Registration has been successfully completed.";
    MessageEnum["LOGIN_SUCCESSFLLY"] = " login successfully";
    MessageEnum["REFRESH_TOKEN_MISSING"] = "Refresh token missing";
    // --------------------------------------------------------------------------vendor
    MessageEnum["VENDOR_EXISTS"] = "Vendor already exists";
    MessageEnum["VENDOR_NOT_FOUND"] = "Vendor not found";
    MessageEnum["VENDOR_ADD_ERROR"] = "Error to add vendor please try again latter";
    MessageEnum["VENDOR_CREATED"] = "Vendor created successfully";
    MessageEnum["VENDOR_UPDATED"] = "Vendor updated successfully";
    MessageEnum["VENDOR_DELETED"] = "Vendor deleted successfully";
    MessageEnum["VENDOR_REGISTERED"] = "Vendor registered successfully";
    MessageEnum["VENDOR_BLOCKED"] = "Vendor blocked by admin";
    MessageEnum["VENDOR_DATA_UPDATION_SUCCESS"] = "Vendor data updated successfully";
    MessageEnum["VENDOR_DATA_UPDATION_FAILED"] = "Failed to update vendor data ";
    MessageEnum["LOGIN_SUCCESS"] = "Vendor logged in successfully";
    MessageEnum["UNAUTHORIZED"] = "You are not authorized to perform this action";
    MessageEnum["PLAN_EXPIRED"] = "Vendor plan has expired";
    MessageEnum["VENDOR__DATA_FETCH_SUCCESS"] = "Vendor data fetch successfully";
    MessageEnum["VENDOR__DATA_FETCH_FAILED"] = "Error to fetch vedor data";
    MessageEnum["VENDOR_UNDER_VERIFICATION"] = "Your account is under verification. Please wait for admin approval.";
    MessageEnum["VENDOR_VERIFICATION_REJECTED"] = "Your account verification was rejected by admin. Please register again with valid data.";
    MessageEnum["VENDOR_VRIFIED"] = "Vendor vierified";
    MessageEnum["VENDOR_DENIED"] = "Vendor verification rejected";
    MessageEnum["VENDOR_SHOP_IMAGE_ADDED_SUCCESS"] = "Image added successfully";
    MessageEnum["VENDOR_SHOP_IMAGE_DELETED_SUCCESS"] = "Image deleted successfully";
    MessageEnum["VENDOR_SHOP_IMAGE_DELETED_FAILED"] = "Unable to delete image";
    // --------------------------------------------------------------------------token
    MessageEnum["TOKEN_VALID"] = "Token is valid";
    MessageEnum["TOKEN_EXPIRED"] = "Access token expired";
    MessageEnum["TOKEN_REFRESH_EXPIRED"] = "Refresh token expired, please login again";
    MessageEnum["TOKEN_INVALID"] = "Invalid token";
    MessageEnum["TOKEN_MISSING"] = "Token missing, please login";
    MessageEnum["TOKEN_REFRESH_SUCCESS"] = "Access token refreshed successfully";
    MessageEnum["TOKEN_REFRESH_MISSING"] = "Refresh token missing";
    // --------------------------------------------------------------------------admin
    MessageEnum["ADMIN_LOGIN_SUCCESS"] = "Admin logged in successfully.";
    MessageEnum["ADMIN_LOGIN_FAILED"] = "Invalid email or password.";
    MessageEnum["ADMIN_NOT_FOUND"] = "Admin not found.";
    MessageEnum["ADMIN_PASSWORD_INCORRECT"] = "Incorrect password.";
    // --------------------------------------------------------------------------Shop
    MessageEnum["SHOP_DATA_FETCH_SUCCESS"] = "Shops fetched successfully";
    MessageEnum["SHOP_DATA_ADDED_SUCCESS"] = "Shop data added successful";
    MessageEnum["SHOP_DATA_ADDED_FAILED"] = "Something went wrong ,Cannot added shop data";
    // --------------------------------------------------------------------------Shop
    MessageEnum["ADDRESS_ADDED_SUCCESS"] = "Address added successfully";
    MessageEnum["ADDRESS_FETCH_SUCCESS"] = "Address fetch successfully";
    MessageEnum["ADDRESS_EXISTS"] = "Address already exists";
    MessageEnum["ADDRESS_UPDATED_SUCCESS"] = "Address updated successfully";
    MessageEnum["ADDRESS_UPDATED_FAILED"] = "Uneble to update address";
    MessageEnum["ADDRESS_NOT_FOUND"] = "Address not found";
    MessageEnum["ADDRESS_DELETED_SUCCESS"] = "Address deleted successfully";
    MessageEnum["ADDRESS_DELETED_FAILED"] = "Unable to delete address";
    MessageEnum["ADDRESS_INVALID"] = "Invalid address data";
    MessageEnum["ADDRESS_EDIT_SUCCESS"] = "Address editing success";
    MessageEnum["ADDRESS_EDIT_FAILED"] = "Invalid address data";
    // --------------------------------------------------------------------------service by admin
    MessageEnum["SERVICE_ADD_SUCCESS"] = "Service added successfully.";
    MessageEnum["SERVICE_FETCH_SUCCESS"] = "Service fetch successfully.";
    MessageEnum["SERVICE_FETCH_FAILED"] = "Failde to fetch service.";
    MessageEnum["SERVICE_EDIT_SUCCESS"] = "Service edited successfully.";
    MessageEnum["SERVICE_ADD_FAILD"] = "Failed to add service. Please try again.";
    MessageEnum["SERVICE_ALREADY_EXIST"] = "Service already exists.";
    // --------------------------------------------------------------------------staff
    MessageEnum["STAFF_ADD_SUCCESS"] = "Staff added successfully.";
    MessageEnum["STAFF_ADD_FAILED"] = "Failed to add staff.";
    MessageEnum["STAFF_ALREADY_EXISTS"] = "Staff with this name already exists.";
    MessageEnum["STAFF_NOT_FOUND"] = "Staff not found.";
    MessageEnum["STAFF_FETCH_SUCCESS"] = "Staff data fetched successfully.";
    MessageEnum["STAFF_FETCH_FAILED"] = "Failed to fectch staff data.";
    MessageEnum["STAFF_UPDATE_SUCCESS"] = "Staff updated successfully.";
    MessageEnum["STAFF_UPDATE_FAILED"] = "Failed to update staff.";
    MessageEnum["STAFF_STATUS_UPDATED"] = "Staff status updated successfully.";
    // --------------------------------------------------------------------------service by vendor
    MessageEnum["VENDOR_SERVICE_ADD_SUCCESS"] = "Service added successfully.";
    MessageEnum["VENDOR_SERVICE_FETCH_SUCCESS"] = "Service fetch successfully.";
    MessageEnum["VENDOR_SERVICE_ADD_FAILD"] = "Failed to add service. Please try again.";
    MessageEnum["VENDOR_SERVICE_ALREADY_EXIST"] = "Service already exists.";
    MessageEnum["VENDOR_SERVICE_EDIT_SUCCESS"] = "Service edited successfully.";
    // --------------------------------------------------------------------------Booking
    MessageEnum["BOOKING_CREATED_SUCCESS"] = "Booking created successfully.";
    MessageEnum["BOOKING_CREATION_FAILED"] = "Failed to create booking.";
    MessageEnum["BOOKING_PREFFER_TIME_SLOT_NOT_AVAILABLE"] = "No slots are available within the customer\u2019s preferred time range.. Select a different time, staff, or date.";
    MessageEnum["BOOKING_DATA_FETCH_SUCCESS"] = "Booking data fetched successfully";
    MessageEnum["BOOKING_DATA_FETCH_FAILED"] = "Failed to fetch booking data";
    MessageEnum["BOOKING_ID_INVALIED"] = "Invalied booking id";
    // --------------------------------------------------------------------------Favorite
    MessageEnum["FAVORITE_ADD_SUCCESS"] = "Vendor added to favorite list";
    MessageEnum["FAVORITE_ADD_FAILED"] = "Failed to add vendor to favorite list";
    MessageEnum["FAVORITE_REMOVE_SUCCESS"] = "Vendor removed from favorite list";
    MessageEnum["FAVORITE_REMOVE_FAILED"] = "Failed to remove vendor from favorite list";
    MessageEnum["FAVORITE_UPDATE_SUCCESS"] = "Favorite updated successfully";
    MessageEnum["FAVORITE_UPDATE_FAILED"] = "Failed to update favorite";
    MessageEnum["FAVORITE_FETCH_SUCCESS"] = "Favorite fetched successfully";
    MessageEnum["FAVORITE_FETCH_FAILED"] = "Failed to fetch favorite list";
})(MessageEnum || (exports.MessageEnum = MessageEnum = {}));
// -----------------------------
// Booking Notification Titles
// -----------------------------
var BookingMessageTitle;
(function (BookingMessageTitle) {
    // Customer side
    BookingMessageTitle["BOOKING_SUCCESS"] = "Booking Successful";
    BookingMessageTitle["BOOKING_FAILED"] = "Booking Failed";
    BookingMessageTitle["BOOKING_CONFIRMED_CUSTOMER"] = "Booking Confirmed";
    // Vendor side
    BookingMessageTitle["NEW_BOOKING_VENDOR"] = "New Booking Received";
    // Common
    BookingMessageTitle["BOOKING_UPDATED"] = "Booking Updated";
    BookingMessageTitle["BOOKING_CANCELLED"] = "Booking Cancelled";
})(BookingMessageTitle || (exports.BookingMessageTitle = BookingMessageTitle = {}));
// -----------------------------
// Booking Notification Contents
// -----------------------------
var BookingMessageContent;
(function (BookingMessageContent) {
    // Customer side
    BookingMessageContent["BOOKING_SUCCESS"] = "Your booking has been successfully created.";
    BookingMessageContent["BOOKING_FAILED"] = "There was an issue creating your booking.";
    BookingMessageContent["BOOKING_CONFIRMED_CUSTOMER"] = "Your booking has been confirmed. Your scheduled time is:";
    // Vendor side
    BookingMessageContent["NEW_BOOKING_VENDOR"] = "You have a new booking";
    // Common
    BookingMessageContent["BOOKING_UPDATED"] = "Your booking details have been updated.";
    BookingMessageContent["BOOKING_CANCELLED"] = "This booking has been cancelled.";
})(BookingMessageContent || (exports.BookingMessageContent = BookingMessageContent = {}));
var BookingMessageContentLong;
(function (BookingMessageContentLong) {
    // Customer
    BookingMessageContentLong["BOOKING_SUCCESS"] = "Your booking has been successfully created. You can check details on the bookings page.";
    BookingMessageContentLong["BOOKING_FAILED"] = "There was an issue creating your booking. Please try again or contact support.";
    BookingMessageContentLong["BOOKING_CONFIRMED"] = "Your booking has been confirmed. Your scheduled time is: ";
    // Vendor
    BookingMessageContentLong["NEW_BOOKING_VENDOR"] = "A customer has placed a new booking request. Please review and confirm the booking in your dashboard.";
    // Common
    BookingMessageContentLong["BOOKING_UPDATED"] = "Your booking details have been updated. Please check the updated schedule and service information.";
    BookingMessageContentLong["BOOKING_CANCELLED"] = "This booking has been cancelled. If this was a mistake, you may create a new booking.";
})(BookingMessageContentLong || (exports.BookingMessageContentLong = BookingMessageContentLong = {}));
