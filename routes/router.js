import express from "express"
import { deleteuser, login, signup, updateuser } from "../controllers/authController.js";
import { verifytoken } from "../middlewares/jstmiddleware.js";
import ErrorHandler from "../middlewares/errorhandler.js";
import upload from "../middlewares/uploader.js";

const router = express.Router();


router.post("/signup",upload.single("photo"),ErrorHandler, signup)
router.post("/login",ErrorHandler, login)
router.put("/updateuser/:id",verifytoken,ErrorHandler, updateuser)
router.delete("/deleteuser/:id",verifytoken,ErrorHandler,deleteuser)

export default router;








  
