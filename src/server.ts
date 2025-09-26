import { log } from "console";
import app from "./app";
import dotenv  from 'dotenv'



dotenv.config({debug:false})


const PORT:string = process.env.PORT||"7001"


app.listen(PORT,()=>{
    console.log(`Server running or port ${PORT} ` );
    
})

