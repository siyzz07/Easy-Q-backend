import express from 'express'
import customerRoute from './routes/customerRoutes'
import cors from 'cors'
import vendorRoute from './routes/vendorRoutes'
import cookieParser from "cookie-parser";
import adminRoute from './routes/adminRoutes'
import { errorHandler } from './middlewares/errorHandler';
import authRoute from './routes/authRoutes';
import bookingRoute from './routes/bookingRoute';
import { morganLogger } from './middlewares/morganLogger';
import paymentRoute from './routes/transacationRoutes';
import reviewRoute from './routes/reviewRoutes';
import transactionRoute from './routes/transacationRoutes';
import walletRoutes from './routes/walletRoutes';
import notificaionRoute from './routes/notificaionRoutes';
import contractRoute from './routes/contractRoutes';
import chatRoute from './routes/chatRoute';


const app = express()


app.use(express.json())
app.use(cookieParser());

console.log(process.env.BASE_URL);


app.use(cors({
    origin:[process.env.BASE_URL as string],
    methods:["GET", "POST", "PUT", "DELETE","OPTIONS",'PATCH'],
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
app.use('/api/payment',paymentRoute)
app.use('/api/review',reviewRoute)
app.use('/api/transaction',transactionRoute)
app.use('/api/wallet',walletRoutes)
app.use('/api/notification',notificaionRoute)
app.use('/api/contract',contractRoute)
app.use('/api/chat',chatRoute)



app.use(errorHandler)


export default app

