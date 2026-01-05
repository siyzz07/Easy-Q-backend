"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRepository = exports.vendorRepository = exports.staffRepository = exports.vendorServiceControllerInstance = exports.staffControllerInstance = exports.vendorControllerInstance = void 0;
const staff_controller_1 = require("../controllers/staff/staff-controller");
const service_controller_1 = require("../controllers/service/service-controller");
const vendor_controller_1 = __importDefault(require("../controllers/vendor/vendor-controller"));
const staff_service_1 = require("../services/vender-services/staff-service");
const vendor_service_1 = __importDefault(require("../services/vender-services/vendor-service"));
const service_service_1 = require("../services/vender-services/service-service");
const repositories_1 = require("./repositories");
Object.defineProperty(exports, "serviceRepository", { enumerable: true, get: function () { return repositories_1.serviceRepository; } });
Object.defineProperty(exports, "staffRepository", { enumerable: true, get: function () { return repositories_1.staffRepository; } });
Object.defineProperty(exports, "vendorRepository", { enumerable: true, get: function () { return repositories_1.vendorRepository; } });
//----------------------------------------------------------- vendor shop like get shop dat updatad data etc...
const vendorShopServiceInstance = new vendor_service_1.default(repositories_1.vendorRepository, repositories_1.staffRepository, repositories_1.serviceTypesRepository, repositories_1.serviceRepository);
const vendorControllerInstance = new vendor_controller_1.default(vendorShopServiceInstance);
exports.vendorControllerInstance = vendorControllerInstance;
//----------------------------------------------------------- staff
const staffServiceInstance = new staff_service_1.StaffService(repositories_1.staffRepository);
const staffControllerInstance = new staff_controller_1.StaffController(staffServiceInstance);
exports.staffControllerInstance = staffControllerInstance;
//------------------------------------------------------------ Service
const vendorServiceServiceInstance = new service_service_1.VendorServiceService(repositories_1.serviceRepository);
const vendorServiceControllerInstance = new service_controller_1.VendorServiceController(vendorServiceServiceInstance);
exports.vendorServiceControllerInstance = vendorServiceControllerInstance;
