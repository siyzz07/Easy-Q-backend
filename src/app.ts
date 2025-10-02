import express from 'express'
import customerRoute from './routes/customerRoutes'
import cors from 'cors'
import { log } from 'node:console'


const app = express()


app.use(express.json())

app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET", "POST", "PUT", "DELETE","OPTIONS"],
    credentials:true
}))






app.use('/api/customer',customerRoute)



export default app