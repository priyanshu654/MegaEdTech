const express=require("express");
const { updateProfile, deleteAccount, getUserDetails, getEnrolledCourses, updateDisplayPicture } = require("../controllers/Profile");
const { isAuth } = require("../middlewares/auth");
const router=express.Router();


router.put("/updateProfile",isAuth,updateProfile);
router.delete("/deleteProfile",isAuth,deleteAccount);
router.get("/getUserDetails",isAuth,getUserDetails);
router.get("/getEnrolledCourse",isAuth,getEnrolledCourses);
router.put("/updateDisplayPicture",isAuth,updateDisplayPicture);


module.exports=router;