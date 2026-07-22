import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,  
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudanary= async(localFilePath)=>{
  // here we need try catch cuz thwere can be error in uploadinmg , so to handle that try catch.
  try{
if(!localFilePath) return null; // means if the fil path is a not present or a path m then return null
// the next step is uplaod the file in the cloudanary
const response = await cloudinary.uploader.upload(localFilePath,{  // it will deffinately take time to upload, so use await. 
  resource_type:"auto" // these are the methods or properties we have to read it from the documentation.
})
// file upload succesfull
console.log("fileis uplaoded on cloudinary");



  }catch{

  }

}
