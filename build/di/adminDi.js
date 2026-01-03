"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepository = exports.serviceTypesControllerInstence = exports.adminController = void 0;
const admin_controller_1 = require("../controllers/admin/admin-controller");
const service_types_controller_1 = require("../controllers/service-types/service-types-controller");
const admin_service_1 = require("../services/admin-services/admin-service");
const svervice_types_vendor_service_1 = require("../services/admin-services/svervice-types-vendor-service");
const repositories_1 = require("./repositories");
Object.defineProperty(exports, "adminRepository", { enumerable: true, get: function () { return repositories_1.adminRepository; } });
//---------------------------------------------------------------- admin serice liek get vendors get customer updata and etc..
const adminService = new admin_service_1.AdminService(repositories_1.adminRepository, repositories_1.customerRepository, repositories_1.vendorRepository);
const adminController = new admin_controller_1.AdminController(adminService);
exports.adminController = adminController;
//---------------------------------------------------------------- service types for vendor 
const serviceTypesServiceInstance = new svervice_types_vendor_service_1.ServiceTypesService(repositories_1.serviceTypesRepository);
const serviceTypesControllerInstence = new service_types_controller_1.ServiceTypeController(serviceTypesServiceInstance);
exports.serviceTypesControllerInstence = serviceTypesControllerInstence;
