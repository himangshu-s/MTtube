import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"





const  connectDB= async()=>{
    try {
        // so mongoose actually returns and object whuich is we havae witten here conne3ctionInstance
        // tho its not necessary to take the variable
console.log("URI:", `${process.env.MONGODB_URI}/${DB_NAME}`); 
   const connectionInstance= await mongoose .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`mongodb connected ${connectionInstance.connection.host}`);
}
     catch(error){
    console.log("MONGODB CONNECTION ERROR", error);
    process.exit(1);
    // so node.js gives us the process acess, means thuis is the process we are currently executing and iots the refference of the process and we are niow exitying from thus process.
    // we u can use throw there to handle the error. 

    }
}
export default connectDB;