import { CustomerAddressContorller } from "../controllers/address/address-controller";
import { CustomerController } from "../controllers/customer/customer-controller";
import { FavoriteController } from "../controllers/favorite/favorite-controller";
import { CustomerAddressService } from "../services/customer-services/address-service";
import { CustomerService } from "../services/customer-services/customer-service";
import { FavoriteService } from "../services/customer-services/favorite-service";
import { 
    addressRepository, 
    customerRepository, 
    favoriteRepository 
} from "./repositoriesDi";

//------------------------------- customer di
const customerServiceInstance = new CustomerService(customerRepository)
const customerControllerInstance = new CustomerController(customerServiceInstance)

//- ---------------------------- address di
const AddressServiceInstance = new CustomerAddressService(addressRepository)
const AddressControllerInstance = new CustomerAddressContorller(AddressServiceInstance)

//------------------------------ favorite di
const favoriteServiceInstance = new FavoriteService(favoriteRepository)
const favoriteControllerInstance = new FavoriteController(favoriteServiceInstance)

export { customerControllerInstance, AddressControllerInstance, favoriteControllerInstance, customerRepository }
