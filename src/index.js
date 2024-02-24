 //require('dotenv').config({path:'./env'})
 //to maintain consistnecy 
 import dotenv from 'dotenv' 
 
 import connectDB from "./db/index.js";
 
 const PORT=process.env.PORT || 8000;


 dotenv.config({
    path:'./env'
 })
 //app.on()ka code as a assignment
 //promises add karte hai connectDB ko
 connectDB()
 .then(()=>{
   //u must remember ki alternative just in case server host does not work we have 8000 as our local host
   app.listen(PORT,()=>{
      console.log(`Server is running ar port ${PORT}`)
   }) 
})
 
 .catch((err)=>{
   console.log("Mongo db connection failed",err)
 })
 
