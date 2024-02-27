import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
const registerUser=asyncHandler(async (req,res)=>{
   //get user details from frontend
   //validation-not empty
   //check if user already exists:username,email
   //check for images on cloudinary,check for avatar
   //upload them to cloudinary,avatar
   //create user object-create entry in db
   //remove password and refersh token field from response
   //check for user creation
   //return response
   


   //raw data(first step calling)
   const { fullName, email, username, password } = req.body;
   const variables = [fullName, email, username, password];
   
   variables.forEach((variable, index) => {
       if (variable === "") {
           let fieldName;
           switch (index) {
               case 0:
                   fieldName = "Fullname";
                   break;
               case 1:
                   fieldName = "Email";
                   break;
               case 2:
                   fieldName = "Username";
                   break;
               case 3:
                   fieldName = "Password";
                   break;
               default:
                   fieldName = "Field";
                   break;
           }
           throw new ApiError(400, `${fieldName} is required.`);
       }
   });
   //now we need to check if user already exists
   const existedUser = await User.findOne({ username });
   if (existedUser) {
       throw new ApiError(409, "User with username already exists");
   }
   const avatarLocalPath=req.files?.avatar[0]?.path;
   const coverImageLocalPath=req.files?.coverImage[0]?.path;
   if(!avatarLocalPath){
      throw new ApiError(400,"Avatar file is required");
   }
   //now we need to upload on cloudinary
   const avatar=await uploadOnCloudinary(avatarLocalPath)
   const coverImage=await uploadOnCloudinary(coverImageLocalPath)
   if(!avatar){
      throw new ApiError(400,"Avatar file is required");
   }
   //create user object and create entry in database
   const user=await User.create({
      fullName,
      avatar:avatar.url,
      coverImage:coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()


   })
   //check if user is created or no
   const createdUser=await User.findById(user._id).select(
      "-password -refreshToken"
   )
   //our main task was to return a response in the user controller and this is it:
   
   if(!createdUser){
      throw new ApiError(500,"Something wrong went while registring the user")
   }
   return res.status(201).json(
      new ApiResponse(200,createdUser,"User registerd Successfully")
   )


   
})
export {registerUser}