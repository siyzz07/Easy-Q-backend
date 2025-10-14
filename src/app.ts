import express from 'express'
import customerRoute from './routes/customerRoutes'
import cors from 'cors'

import vendorRoute from './routes/vendorRoutes'
import cookieParser from "cookie-parser";
import adminRoute from './routes/adminRoutes'

const app = express()


app.use(express.json())
app.use(cookieParser());

app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET", "POST", "PUT", "DELETE","OPTIONS"],
    credentials:true
}))






app.use('/api/customer',customerRoute)
app.use('/api/vendor',vendorRoute)
app.use('/api/admin',adminRoute)



export default app