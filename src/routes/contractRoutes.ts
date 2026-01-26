import express from "express";
import { contractControllerInstance } from "../di/contractDi";
import { isCustomer, isVendorOrCustomer, verifyToken } from "../middlewares/authTokenVerify";
// import { validate } from "../middlewares/validate"; // Assuming validation is needed later

const contractRoute = express.Router();

contractRoute.post("/add-contract", verifyToken,isVendorOrCustomer, contractControllerInstance.addContract);
contractRoute.put("/edit/:contractId", verifyToken, contractControllerInstance.editContract);
contractRoute.get("/:contractId", verifyToken, contractControllerInstance.getContract);
contractRoute.get("/", verifyToken, contractControllerInstance.getContracts);

contractRoute.get('/customer/contracts', verifyToken ,isCustomer,contractControllerInstance.getCustomerContract)

export default contractRoute;
