import { CustomerAddressContorller } from "../controllers/address/address-controller";
import { BookingController } from "../controllers/booking/booking-controller";
import { CustomerController } from "../controllers/customer/customer-controller";
import { FavoriteController } from "../controllers/favorite/favorite-controller";
import { BookingModel } from "../models/bookingModel";
import { BookingRepository } from "../repositories/bookingRepository";
import { CustomerAddresRepository } from "../repositories/customerAddressRepository";;
import { CustomerRepository } from "../repositories/customerRepository";
import { FavoriteRepository } from "../repositories/favoriteRepository";
import { ServiceRepository } from "../repositories/serviceRepository";
import { StaffRepository } from "../repositories/staffsRepository";
import { BookingService } from "../services/common-services/booking-service";
import { CustomerAddressService } from "../services/customer-services/address-service";
import { CustomerService } from "../services/customer-services/customer-service";
import { FavoriteService } from "../services/customer-services/favorite-service";



/***
 * 
 * 
 * 
 */
//------------------------------- customer di
const customerRepositoryInstance = new CustomerRepository()
const customerServiceInstance = new CustomerService(customerRepositoryInstance)
const customerControllerInstance = new CustomerController(customerServiceInstance)
/**
 * 
 * 
 * 
 */
//- ---------------------------- address di
const addressRepositoryInstance = new CustomerAddresRepository()
const AddressServiceInstance = new CustomerAddressService(addressRepositoryInstance)
const AddressControllerInstance = new CustomerAddressContorller(AddressServiceInstance)

/**
 * 
 * 
 * 
 */
//------------------------------ favorite di
const favoriteRepositoryInstance = new FavoriteRepository()
const favoriteServiceInstance = new FavoriteService(favoriteRepositoryInstance)
const favoriteControllerInstance = new FavoriteController(favoriteServiceInstance)


export {customerControllerInstance,AddressControllerInstance,favoriteControllerInstance}
