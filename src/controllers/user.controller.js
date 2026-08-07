import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
const registerUser= asyncHandler(async(req, res)=>{
  // get user details from frontend. 
  // validation - not empty
  // check if user already exists: username , email
  // check for images , check for avatar
  // upload them to cloudinary, avatar
  // create user object-create entry in db
  //  remove passw0rd and refresht0ken field from response 
  //  chcek for user creation - means null ressposnse aya hai kya like things
  // return  response
/* if the data from the frontend is coming from a form or json , them the data will be avaioable in the body
whereas , for the urls , we will handke it dofferently.
*/

 const {fullName, email, username, password}=req.body // This is called object destructuring in JavaScript.
/*
 if(fullName== ""){
   throw new ApiError(400, "fullname is required")
 }
*/
 // okay the above check is on;y for one, here we have to check eacha dn every one one by one which is not a very good practice, what we can do is
// we can use map too but we have to retunr many more thung in map
 if(
    [fullName, email, username, password].some((field)=>
    field?.trim()==="")   
 ){
     throw new ApiError(400, " all fields are required")
 }
})


export  {registerUser}