import express from "express";
import { contractControllerInstance } from "../di/contractDi";
import { isCustomer, isVendor, isVendorOrCustomer, verifyToken } from "../middlewares/authTokenVerify";


const contractRoute = express.Router();

contractRoute.post("/add-contract", verifyToken,isVendorOrCustomer, contractControllerInstance.addContract);
contractRoute.put("/edit/:contractId", verifyToken, contractControllerInstance.editContract);
contractRoute.get("/get-contract/:contractId", verifyToken, contractControllerInstance.getContract);
contractRoute.get("/", verifyToken, contractControllerInstance.getContracts);


contractRoute.get('/customer/contracts', verifyToken ,isCustomer,contractControllerInstance.getCustomerContract)
contractRoute.get('/vendor/works',verifyToken,isVendor,contractControllerInstance.getWorks)
contractRoute.patch('/apply/:contractId',verifyToken,isVendor,contractControllerInstance.applyContract)
contractRoute.patch('/applied-request',verifyToken,isCustomer,contractControllerInstance.updateVendorContractRequest)
contractRoute.get('/vendor/contracts',verifyToken,isVendor,contractControllerInstance.getVendorContracts)
contractRoute.get('/vendor/applied-contracts',verifyToken,isVendor,contractControllerInstance.getVendorAppliedContracts)
contractRoute.delete(`/room/vendor-remove/:contractId/:vendorId`,verifyToken,isCustomer ,contractControllerInstance.removeVendorFromContract)

export default contractRoute;
