import { CustomerAddressContorller } from "../controllers/address/address-controller";
import { BookingController } from "../controllers/booking/booking-controller";
import { CustomerController } from "../controllers/customer/customer-controller";
import { BookingModel } from "../models/bookingModel";
import { BookingRepository } from "../repositories/bookingRepository";
import { CustomerAddresRepository } from "../repositories/customerAddressRepository";;
import { CustomerRepository } from "../repositories/customerRepository";
import { ServiceRepository } from "../repositories/serviceRepository";
import { StaffRepository } from "../repositories/staffsRepository";
import { BookingService } from "../services/common-services/booking-service";
import { CustomerAddressService } from "../services/customer-services/address-service";
import { CustomerService } from "../services/customer-services/customer-service";


const customerRepositoryInstance = new CustomerRepository()





const customerServiceInstance = new CustomerService(customerRepositoryInstance)
const customerControllerInstance = new CustomerController(customerServiceInstance)


const addressRepositoryInstance = new CustomerAddresRepository()
const AddressServiceInstance = new CustomerAddressService(addressRepositoryInstance)
const AddressControllerInstance = new CustomerAddressContorller(AddressServiceInstance)

// ------------------ bookin di
const bookingRepositoryInstance = new BookingRepository()
const serviceRepositoryInstance = new ServiceRepository()
const staffRepositoryInstance = new StaffRepository()
const bookingServiceInstance = new BookingService(bookingRepositoryInstance,serviceRepositoryInstance,staffRepositoryInstance)
const BookingControllerInstance = new BookingController(bookingServiceInstance)



export {customerControllerInstance,AddressControllerInstance,BookingControllerInstance}
