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

const app = express()


app.use(express.json())
app.use(cookieParser());

app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET", "POST", "PUT", "DELETE","OPTIONS"],
    credentials:true
}))




app.use(
  morgan("tiny", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);




app.use('/api/customer',customerRoute)
app.use('/api/vendor',vendorRoute)
app.use('/api/admin',adminRoute)

app.use(errorHandler)


export default app