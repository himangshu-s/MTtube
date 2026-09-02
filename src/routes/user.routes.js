import {Router} from "express";
import {loginUser, logoutUser, registerUser,refreshAccessToken, changCurrentpassword, getCurrentUser, updateUserAvatar, getUserChannelProfile } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();  // its a variable

router.route("/register").post(
    upload.fields([
        {name:"avatar",
    maxCount:1},
    {
      name:"coverImage",
      maxCount:1  
    }
    ]),
    registerUser)
// now the url will become https://localhost:5000/users/register , and the control will pass to registerUser function in user.controller.js

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changCurrentpassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"),updateUserAvatar)  // here we wrote single cuz only a single file will be uploaded and chnage
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"),updateUserCoverImage) 
router.route("/c/:username").get(verifyJWT, getUserChannelProfile) // sice we are taking data from the params. 
router.route("/history").get(verifyJWT, getWatchHistory) // this is for getting the watch history of the user.
export default router;