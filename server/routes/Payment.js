const express=require("express");
const { isAuth, isStudent } = require("../middlewares/auth");
const { capturePayment, verifySignature, sendPaymentSuccessEmail } = require("../controllers/Payment");
const router=express.Router();


router.post("/capturePayment",isAuth,isStudent,capturePayment);
router.post("/verifyPayment",isAuth,verifySignature);
router.post("/sendPaymentSuccessEmail",isAuth,sendPaymentSuccessEmail);

module.exports=router