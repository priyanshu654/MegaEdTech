const express=require('express');
const {login, signUp, sendOTP, changePassword}=require("../controllers/Auth");
const { resetPasswordToken, resetPassword } = require('../controllers/resetPassword');
const {isAuth}=require("../middlewares/auth");
const router=express.Router();

//*********************************************************************************************************************************** */
//                            Authentication routes
//************************************************************************************************************************************** */
//route for login
router.post("/login",login);

//route for signup
router.post("/signup",signUp);

//route for sendotp

router.post("/sendotp",sendOTP);

//route for change password

router.post("/changepassword",isAuth,changePassword);


//************************************************************************************************************ */
//             reset password routes
//************************************************************************************************************* */
//route for generate reset password token
router.post("/generate-reset-token",resetPasswordToken);

//reset password
router.post("/reset-password",resetPassword)

module.exports=router;