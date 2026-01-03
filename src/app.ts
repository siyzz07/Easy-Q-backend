import express from 'express'
import customerRoute from './routes/customerRoutes'
import cors from 'cors'
import morgan from "morgan";
import logger from "./utils/logger";
import vendorRoute from './routes/vendorRoutes'
import cookieParser from "cookie-parser";
import adminRoute from './routes/adminRoutes'
import { errorHandler } from './middlewares/errorHandler';
import { ErrorResponse } from './utils/errorResponse';
import authRoute from './routes/authRoutes';
import bookingRoute from './routes/bookingRoute';
import { morganLogger } from './middlewares/morganLogger';

const app = express()


app.use(express.json())
app.use(cookieParser());

console.log(process.env.BASE_URL);


app.use(cors({
    origin:[process.env.BASE_URL as string],
    methods:["GET", "POST", "PUT", "DELETE","OPTIONS"],
    credentials:true
}))
 



// app.use(
//   morgan("tiny", {
//     stream: {
//       write: (message) => logger.info(message.trim()),
//     },
//   })
// );

app.use(morganLogger)


app.use('/api/customer',customerRoute)
app.use('/api/vendor',vendorRoute)
app.use('/api/admin',adminRoute)
app.use('/api/auth',authRoute)
app.use('/api/booking',bookingRoute)

app.use(errorHandler)


export default app

