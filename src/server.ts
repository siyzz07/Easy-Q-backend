
import dotenv  from 'dotenv'
dotenv.config({debug:false})


import app from "./app";
import dbConfig from "./config/dbConfig";





const PORT:string = process.env.PORT||"7001"

dbConfig()


app.listen(PORT,()=>{
    console.log(`Server running or port ${PORT} ` );
    
})

