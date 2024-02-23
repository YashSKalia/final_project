 //require('dotenv').config({path:'./env'})
 //to maintain consistnecy 
 import dotenv from 'dotenv' 
 
 import connectDB from "./db/index.js";


 dotenv.config({
    path:'./env'
 })
 connectDB()
 
