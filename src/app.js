import express from "express";
import cors from 'cors'
import jwt from "jsonwebtoken";

// Now you can use jwt.sign(), jwt.verify(), etc.


import bcrypt from 'bcrypt'
import cookieParser from "cookie-parser";

const app=express()
//middleware ke liye use hota hai "use"
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
//ab hum uri data jho bejegi usko handle karnege,like koi uri forms bhejti hia koi body koi json
app.use(express.json({limit:"16 kb"}))
app.use(express.urlencoded())
//incase muje koi photo ya favicon type stored rakhna hai tho yeh use karunga
app.use(express.static("public"))
//cookie access kar paou aur set kar paou
app.use(cookieParser())

//after all middleware we setup th routes
//routes niche import karunga mai meri marzi bc bkl
import userRouter from './routes/user.routes.js'
app.use("/api/v1/users/",userRouter)

export {app}