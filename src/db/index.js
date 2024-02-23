import mongoose from "mongoose";
import DB_NAME from "../constants.js"

const connectDB=async()=>{
    try {
        //async await is a must because dn_name is in another continent
        //isko ek variable me store karahu for later use
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        //slowly read and understand connection instance me kya kya properties hoti hai
        console.log(`\n MongoDB connected !! DB_HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("MongoDb is in error bc",error);
        //process is a method in node,understand in docx
        process.exit(1)
    }
}
export default connectDB