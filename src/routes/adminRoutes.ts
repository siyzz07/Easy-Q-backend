import express from "express";
import { adminController, adminControllerInstance } from "../di/adminDi";
import { verifyToken } from "../middlewares/authTokenVerify";

const adminRoute = express.Router();

adminRoute.post("/auth/login", adminControllerInstance.loginAdmin);
adminRoute.post("/auth/refresh-token", adminControllerInstance.refreshToken);
adminRoute.post("/logout", adminControllerInstance.logout);

//----------------------------------------------------- customer data
adminRoute.get("/data/customers", verifyToken, adminController.getUserDatas);
adminRoute.post(
  "/data/block-customer",
  verifyToken,
  adminController.blockCustomer
);

//----------------------------------------------------- vendors data
adminRoute.get("/data/vendors", verifyToken, adminController.geVendorsDatas);
adminRoute.post("/data/block-vendor", verifyToken, adminController.blockVendor);






export default adminRoute;
