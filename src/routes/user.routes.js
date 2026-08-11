import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
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


export default router;