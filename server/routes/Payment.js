const express=require("express");
const { isAuth, isStudent } = require("../middlewares/auth");
const { capturePayment, verifySignature } = require("../controllers/Payment");
const router=express.Router();


router.post("/capturePayment",isAuth,isStudent,capturePayment);
router.post("/verifyPayment",verifySignature);

module.exports=router