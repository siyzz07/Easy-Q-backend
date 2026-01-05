"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllerInstance = void 0;
const auth_controller_1 = require("../controllers/auth/auth-controller");
const auth_services_1 = require("../services/auth-services.ts/auth-services");
const repositories_1 = require("./repositories");
const authSerivceInstance = new auth_services_1.AuthService(repositories_1.vendorRepository, repositories_1.customerRepository, repositories_1.adminRepository);
const authControllerInstance = new auth_controller_1.AuthController(authSerivceInstance);
exports.authControllerInstance = authControllerInstance;
