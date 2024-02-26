import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
//fs helps us to read write and work on file manipulation
import fs from 'fs'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath)return null
        //upload file on cloudinary
       const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uplaoded successgully
        console.log("File is upladed on cloudinary");
        return response;
    } catch (error) {
        //remove file from server as the operation got falied
        fs.unlinkSync(localFilePath)
        console.error("Corrupted file")
        return null;
    }
}

export {uploadOnCloudinary}