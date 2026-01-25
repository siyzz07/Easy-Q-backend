import { AdminRepository } from "../repositories/adminRepository";
import { BookingRepository } from "../repositories/bookingRepository";
import { CustomerAddresRepository } from "../repositories/customerAddressRepository";
import { CustomerRepository } from "../repositories/customerRepository";
import { FavoriteRepository } from "../repositories/favoriteRepository";
import { NotificationRepository } from "../repositories/notificationRepository";
import { ReviewRepository } from "../repositories/reviewRepository";
import { ServiceRepository } from "../repositories/serviceRepository";
import { ServiceTypes } from "../repositories/ServiceTypesRepository";
import { StaffRepository } from "../repositories/staffsRepository";
import { TransactionRepository } from "../repositories/transactionRepository";
import { VendorRepository } from "../repositories/vendorRepository";
import { WalletRepository } from "../repositories/walletRepository";
import ContractRepository from "../repositories/contractRepository";


// Instantiate all Rep ositories ONCE
export const adminRepository = new AdminRepository();
export const bookingRepository = new BookingRepository();
export const customerRepository = new CustomerRepository();
export const serviceRepository = new ServiceRepository();
export const staffRepository = new StaffRepository();
export const vendorRepository = new VendorRepository();
export const notificationRepository = new NotificationRepository();
export const serviceTypesRepository = new ServiceTypes();
export const addressRepository = new CustomerAddresRepository();
export const favoriteRepository = new FavoriteRepository();
export const reviewRepository = new ReviewRepository()
export const transactionRepository = new TransactionRepository()
export const walletRepository = new WalletRepository()
export const contractRepository = new ContractRepository();

