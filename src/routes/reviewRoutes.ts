
import express  from "express";
import { reviewControllerInstance } from "../di/commonDi";
import { isCustomer, isVendorOrCustomer, verifyToken } from "../middlewares/authTokenVerify";

const reviewRoute = express.Router();

reviewRoute.post("/new-review",verifyToken,isCustomer,reviewControllerInstance.addNewReview)
reviewRoute.get('/vendor-reviews/:vendorId',verifyToken,isVendorOrCustomer,reviewControllerInstance.getReviews)
reviewRoute.put('/update-review/:reviewId',verifyToken,isCustomer,reviewControllerInstance.editReview)
reviewRoute.delete('/delete-review/:reviewId',verifyToken,isCustomer,reviewControllerInstance.deleteReview)

export default reviewRoute;
