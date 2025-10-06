import { AuthController } from "../controllers/vendorController/authController";
import VendorShopController from "../controllers/vendorController/shopController";
import { VendorRepository } from "../repositories/vendorRepository";
import { VendorAuthService } from "../services/venderServices/authService";
import VendorShopService from "../services/venderServices/shopService";




const vendorRepositoryInstance = new VendorRepository()

const vendorAuthServiceInstance = new VendorAuthService(vendorRepositoryInstance)
const vendorAuthControllerInstance = new AuthController(vendorAuthServiceInstance)



const vendorShopServiceInstance = new VendorShopService(vendorRepositoryInstance)
const vendorShopControllerInstance = new VendorShopController(vendorShopServiceInstance)

export {vendorAuthControllerInstance,vendorShopControllerInstance}