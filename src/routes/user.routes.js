import {Router} from "express";
import {loginUser, logoutUser, registerUser,refreshAccessToken } from "../controllers/user.controller.js";
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
export default router;