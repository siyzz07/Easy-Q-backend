import mongoose from 'mongoose'
import { Error } from 'mongoose'



const dbConfig = async (): Promise<void> => {

    try{
        const MONGODB_URL:string = process.env.MONGODB_URL||""
        await mongoose.connect(MONGODB_URL)
        console.log("database connected ...")   
   
    }catch(error:unknown){
        if(error instanceof Error){
            console.log(`error to connect DB ${error.message}`);
            
       }else{
            console.log(`db connection error ${error}`);  
       }
        
    }



}

export default dbConfig