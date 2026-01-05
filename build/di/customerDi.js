"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRepository = exports.favoriteControllerInstance = exports.AddressControllerInstance = exports.customerControllerInstance = void 0;
const address_controller_1 = require("../controllers/address/address-controller");
const customer_controller_1 = require("../controllers/customer/customer-controller");
const favorite_controller_1 = require("../controllers/favorite/favorite-controller");
const address_service_1 = require("../services/customer-services/address-service");
const customer_service_1 = require("../services/customer-services/customer-service");
const favorite_service_1 = require("../services/customer-services/favorite-service");
const repositories_1 = require("./repositories");
Object.defineProperty(exports, "customerRepository", { enumerable: true, get: function () { return repositories_1.customerRepository; } });
//------------------------------- customer di
const customerServiceInstance = new customer_service_1.CustomerService(repositories_1.customerRepository);
const customerControllerInstance = new customer_controller_1.CustomerController(customerServiceInstance);
exports.customerControllerInstance = customerControllerInstance;
//- ---------------------------- address di
const AddressServiceInstance = new address_service_1.CustomerAddressService(repositories_1.addressRepository);
const AddressControllerInstance = new address_controller_1.CustomerAddressContorller(AddressServiceInstance);
exports.AddressControllerInstance = AddressControllerInstance;
//------------------------------ favorite di
const favoriteServiceInstance = new favorite_service_1.FavoriteService(repositories_1.favoriteRepository);
const favoriteControllerInstance = new favorite_controller_1.FavoriteController(favoriteServiceInstance);
exports.favoriteControllerInstance = favoriteControllerInstance;
