import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudanary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
// well this is coming from the secodn steo mean from the login page part. 
// since we will use the access token thing many times , so we make an methode for this amd whenever we neeed to gemerate access token ,we just call it

const generateAccessAndrefreshTokens= async(userId)=>{
  try{
    const user= await User.findById(userId)
    const accessToken= user.generateAccessToken()
   const refreshToken= user.generateRefreshToken()

   // now we need to store the refreshtoken in the databses
   // the user is a object document, so till now the refreshtoken is null , so we updated the refreshtoken  in the memory only for now.
   user.refreshToken= refreshToken
  // user.save()
   // but when we call ssave, since its mongoose , so the other properties try to get sav etoo , like the password , b ut we dnt have passwprd here right, so what we do is
 await  user.save({validateBeforeSave:false}) // saves the user document in mongoose 

 return {accessToken, refreshToken}
  }
  catch(error){

throw new ApiError(500, "somethng went wrong while generating refresh and acces token")
  }
}

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
    // .some() checks whether at least one element in an array satisfies a condition. 
 ){
     throw new ApiError(400, " all fields are required")
 }

// now we javae to check whether the user is already there or not
const existedUser= await User.findOne({
  $or:[{username},{email}] // its a operator , we can use operator by using $
})
if(existedUser){
  throw new ApiError(400, "user already exists")
}
// chcek for images 
// so we know that req.body gives us all the data frommbackend, but since we add a middleweare mukter for the 
// files, then it added files in the req object. so we can access it by req.files
// ?. This is called optional chaining.
console.log(req.files);
const avatarLocalPath=req.files?.avatar[0]?.path;  // avatar is the array and avatar[0] means the first avatar in the avatar array
// const coverImageLocalPath=req.files?.coverImage[0]?.path;  // cuz yhan pe hum expect kr rhe hai ki agr req.files hai toh usme coverImage hoga hi hoga, what if nhi hua, toh kya hoga, thats why it should be handledd prpperly
// coverImage is not necessary , but if someday we dmt send coverimage then it will throw error, its not a backend probloem, its javascript. so since it dnt have thorw error, so we will use classic if else for this
let coverImageLocalPath ;
// first req.files aya hai ki nhi , then array hai ki nhi9 yeh , and lsst mai array ka size more than 0 hai ki nhi. 
if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >0){
  coverImageLocalPath= req.files.coverImage[0].path
}
// yhan pe then agr coverImage nhi hua toh cloudinary apne se ek nempty string de deti hai. 
// dcheck if avatar properly aya hai ki nhi
if(!avatarLocalPath){
  throw new ApiError(400, "avatar is required")
}

// now upload into the cloudanary
const avatar= await uploadOnCloudanary(avatarLocalPath)
const coverImage= await uploadOnCloudanary(coverImageLocalPath)
// again check for avatar cuz avatar required filed hai and agar avatar nhi gya toh database fatega
if(!avatar){
  throw new ApiError(400,"Avatar is required")
}

// now make an object and database mai entry mar do
// create is a methode that takes object
const user= await User.create({ // since creation takes time, so await
  fullName,
  avatar: avatar.url,
  // now we didn't checkmcoverimage aya upload hua hai ki nhi cuz its not compulsory , but if kisi reason ki wajh se nhi hua 
  // and we try to upload dit in the databases , the code fatega, so if upload hua then upload in databse otherwise empty string
  coverImage: coverImage?.url|| "",
  email,
  password,
  username:username.toLowerCase()
})
// hum isme trying to check whether the user really created or not
// agar sahi mai user create huahai , toh mongodb automatically har ek data ke sath el _id generate krta hai. \

const createdUser= await User.findById(user._id).select(
  "-password -refreshToken"  // yhan pe hum likhtebhai jo jo hum e nhi chahiye database mai
) // it means When returning this user object to the client, don't include the password and refresh token."
// Your database still contains them


// now u will handle is user not created properly
if(!createdUser){
  throw new ApiError(500, "somethung went wrong while registering the user")}
// now return a response
return res.status(201).json(
  new ApiResponse(200, createdUser, "User registered successfully")
)/*  201 is the actual http status , and by using new we are creatimf a new object based on ApiResponse class, 
200 is the statuscode, createdUser is the data, then message and then success= true

*/

})

const loginUser=asyncHandler(async(req, res)=>{
  /* algo=>
  req body-> data
  //chcek username and email
  fimd the user
  password check
  generate access tokena nd refresh token
   send cookies
  */ 

   const {username, email, password}=req.body 
   if(!username && !email){
    throw new ApiError(400,"username or email is required")
   }
// In Mongoose, findOne() searches your MongoDB collection and returns the first document that matches your condition.
/* if findOne() finds a user, user contains that user's all data from MongoDB. The properties are not empty.
now we can do user.username , user.fullName etc

Here:

User → your Mongoose model
user → the actual user document found in MongoDB
*/ 
  const user = await User.findOne({
    $or: [{username}, {email}] // this methofe is to write object in by using or

   })
   if(!user){
    throw new ApiError(404, "user not found")
   }

  const isPasswordValid= await user.isPasswordCorrect(password)

  if(!isPasswordValid){
    throw new ApiError(401, "passwrd is incorrect")
  }
  const {accessToken, refreshToken}= await generateAccessAndrefreshTokens(user._id)
// after the mongoose model got updated
// This is fetching the user information that you want to send back as user data, not the token itself. 
  const loggedInUser= await User.findById(user._id).select("-password, -refreshToken")
  // now send tokens via cookies
 const options={
  httpOnly:true,
secure:true
// when we do both true , now user can only see the cookies , but cant modify it , only backend can modify it
 }

 return res.status(200).cookie("accessToken",accessToken, options)
 .cookie("refreshToken", refreshToken, options)
 .json(
  new ApiResponse(200,{ user: loggedInUser, acesstoken, refreshToken}, "user logged in successfully")
 )

}
)


// now we will see how to log out
const logoutUser= asyncHandler(async(req, res)=>{
  // we have to ckear the cookies , and also remember we have to reset the refreshtoken in the database , cuz next time log in , the token willbe different.
  // so now here  even if we want the databse data , web dnt have access tot he User cuz we dnt have the userid kind of thung just like abive , so here we need middlewere
  User.findByIdAndUpdate(
    req.user._id, 
    {
      $set:{
        refreshToken:undefined
      }
    },
    {
      new: true
    }
  )

  const options={
    httpOnly:true,
    secure:true,
    
  }
  return res.status(200)
  .clearCookie("accessToken", options)
  .clearCookie("accessToken", options)
  .json(new ApiResponse(200, {}, "user logged out successfully"))
})






const refreshAccessToken= asyncHandler(async(req, res)=>{
   const incomingRefreshToken= req.cookies.refreshtoken ||  req.body // req.body is for mobile let say someone is using the web in phone.
   if (!incomingRefreshToken){
    throw new ApiError(401, "unauthorised request ")
   }
try {
  const decodedToken= jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
  // now since its decoded now and win the generation of the refreshtoken, we only add one thing thatbis _id , so now we can find the user bgy us8ng _id using a mongodb query
  const user= await User.findById(decodedToken?._id)
  if(!user){
    throw new ApiError(401, "invalid access token")
  }
  if(incomingRefreshToken !=user?.refreshToken){
    throw new ApiError(401, "refreshtoken is expired or used")
  }
  /* jwt.verify() only checks whether the refresh token is genuine and valid—meaning it was created using your REFRESH_TOKEN_SECRET and has not expired. It does not check whether that token is the currently stored/active refresh token in your database. For example, suppose the server creates Token A and stores Token A in MongoDB. Later, when the user refreshes, the server creates Token B and replaces Token A with Token B in the database. Token A may still be a genuine, non-expired JWT, so jwt.verify(Token A, secret) can succeed. But Token A is no longer the active token because the database now contains Token B. Therefore, if (incomingRefreshToken != user.refreshToken) compares the incoming token with the database to make sure it is still the latest active refresh token. In short, jwt.verify() checks "Is this a genuine, non-expired token?" while the database comparison checks "Is this still the active token for this user?"
   */
  
  
  const options={
    httpOnly:true,
    secure:true
  }
  const {accessToken,newrefreshToken}= await generateAccessAndrefreshTokens(user._id)
  return res.status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", newrefreshToken, options)
  .json(new ApiResponse(200, {accessToken, newrefreshToken}, "access token refreshed successfully"))
} catch (error) {
  throw new ApiError(401, error?.message || "Invalid refresh token")
  
}

  })


  const changCurrentpassword= asyncHandler(async(req,res)=>{
    // look yhan  hume yeh headche nhi lena ki user logged in hai ki nhi , yeh sb cuz uske liye hum middleware lga denge auth,middleware wala. 
     const {oldPassword, newPassword}= req.body

// so since hum middleware lagayenge m since iss controller me aane se phle woh middleware mai jayega , so waha we have req.user=user, means user ka ccess iss co0ntroller kempass bhi hoga and waha se we can find _id

     const user= await User.findById(req.user?._id)
const isPasswordCorrect= await user.isPasswordCorrect(oldPassword)


if(!isPasswordCorrect){
  throw new ApiError(401, "invalid old password")
}
  // now we have to set the new password. 
  user.password=newPassword
  await user.save({validateBeforeSave: false})
return res.status(200).json(new ApiResponse(200, {}, "password changed successfully"))

  })
// let say we need current user , now if we are logged in , then we know that the wuth middlewere has run and there we injected req.user=user, so fromhere we can get the current user.
  const getCurrentUser= asynchandler(async(req,res)=>{
    return res
    .status(200)
    .json(200, req.user,"current user fetched successfully")

  })

  const updateAccountDetails=asyncHandler(async(req, res)=>{
    const{fullName, email}=req.body
    
    if(!fullName && !email){
      throw new ApiError(400, "fullName or email is required")

    }
    const user= User.findByIdAndUpdate(req.user?._id, {
       $set:{
        fullName: fullName,
        email: email
       }
    },
    {new: true}
    ).select("-password")

    return res.status(200).json(new ApiResponse(200, user, "user details updated successfully"))
  })



  const updateUserAvatar =asyncHandler(async(req,res)=>{
    const avatarLocalPath= req.file?.path // we are not taking files here cuz , this time we are nit taking an array , we are only takjng a file , so .file
if(!avatarLocalPath){
  throw new ApiError(400, "avatar is required")
}

const avatar= uploadOnCloudanary(avatarLocalPath)

if(!avatar.url){
  throw new ApiError(500, "something went wrong while uploading avatar")
}
// now update 
const user = await User.findByIdAndUpdate(req.user?._id,{
// we are just updating the object
$set:{
  avatar:avatar.url
}
},
{
  new:true
}).select("-password")
 


return res
.status(200)
.json(
  new ApiResponse(200, user, "user cover image updated successfully")
)
 
  })


  const updateUserCoverImage =asyncHandler(async(req,res)=>{
    const coverImageLocalPath= req.file?.path // we are not taking files here cuz , this time we are nit taking an array , we are only takjng a file , so .file
if(!coverImageLocalPath){
  throw new ApiError(400, "cover image is required")
}

const coverImage= uploadOnCloudanary(coverImageLocalPathLocalPath)

if(!coverImage.url){
  throw new ApiError(500, "something went wrong while uploading avatar")
}
// now update 
const user = await User.findByIdAndUpdate(req.user?._id,{
// we are just updating the object
$set:{
  coverImage:coverImage.url
}
},
{
  new:true
}).select("-password")

return res
.status(200)
.json(
  new ApiResponse(200, user, "user cover image updated successfully")
)
 
  })


const getUserChannelProfile= asyncHandler(async(req,res)=>{
 
  const {username}=req.params
  
  if(!username?.trim()){
    throw new ApiError(400, "username is required")
  }

 const channel=  await User.aggregate([ // the first filter or stage is match , then look up and then 
  {
    $match:{
      username : username?.toLowerCase()
    }
  },
  {
    $lookup:{
      from :"subscriptions",  // the model automatically becomes lower case and plural in the mongoose. 
      localField:"_id",
      foreignField:"channel",
      as: "subscribers"
    }
  },
  {
    $lookup:{
      from :"subscriptions",  // the model automatically becomes lower case and plural in the mongoose. 
      localField:"_id",
      foreignField:"subscriber",
      as: "subscribedTo"
    }
    // so yhan pe we calculated the subsribers amd subscribedto in each stage or pipeline.

  },
  // now we have to add filed in the final document. 
  {
    $addFields:{
      subscriberscount:{
        $size:"$subscribers" // yahn pe subscribers mai bhi $ aayega , cuz now its a field in the final document. 

      },
      channelsSubscribedToCount:{
        $size:"$subscribedTo"
      }, 

      isSubscribed:{
        $cond:{
          if: {$in:[req.user?._id, "$subscribers.subscriber"]}, // $in can count / go into array or object. 
          then:true,
          else: false
        }
      }
    }
  },

  {
    $project:{  // means hum kya kya filed chahte hai return ho pipeline se 
      fullname:1,
      username:1,
      subscriberscount:1,
      channelsSubscribedToCount:1,
      isSubscribed:1,
      avatar:1,
      coverImage:1,
      email:1
    }
  }

 ])

 if(!channel?.length){     // i think channel is an array.
  throw new ApiError(404, "channel not found")
 }


 return res
.status(200)
.json(
  new ApiResponse(200, channel[0], "channel profile fetched successfully")
)
})

export  {registerUser,
loginUser, 
logoutUser,
refreshAccessToken,
changCurrentpassword,
getCurrentUser,
updateAccountDetails,
updateUserAvatar,
updateUserCoverImage,
getUserChannelProfile
}


// if u want to update a file, then use a different cntroller or endpoint for that in the production level projects. 
// but here we will do this only in this controller. 