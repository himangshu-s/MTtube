import {ApiError} from "../utils/apiError.js";
import {asyncHandler} from "express-async-handler";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
export const verifyjwt= asyncHandler(async(req,res,next)=>{
// Login creates the token.
//verifyjwt checks the token later whenever the user tries to access a protected route.
try {
    // when a request is amde browser send the cookies with req 
       const token=  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") // a client also sent= Authorization: Bearer eyJhbGciOi...
    // means ya toh cookies se nikal lo ya request header se nikal lo
    
    
    if (!token){
        throw new ApiError(401,"Unauthorised request")
    }
    const decodedToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    // the decoded token gets all the data of that particuar user
    const user= await User.findById(decodedToken?._id).select("-password -refreshToken")
    
    if(!user){
        // TODO: discuss about frontend
            throw new ApiError(401,"Invalid access token")
    }
    // we added a new oroperty user 
    req.user= user;
    /* 
    Why put user inside req?

Because the next controller needs to know:

"Who is making this request?"  */
    next()
    // next() means:
// "I have finished my middleware work. Continue to the next middleware/controller.
} catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token" )
    
}
})