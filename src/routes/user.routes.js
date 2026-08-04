import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
const router = Router();  // its a variable

router.route("/register").post(registerUser)
// now the url will become https://localhost:5000/users/register , and the control will pass to registerUser function in user.controller.js


export default router;