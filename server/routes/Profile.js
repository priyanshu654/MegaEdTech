const express=require("express");
const { updateProfile, deleteAccount, getUserDetails, getEnrolledCourses, updateDisplayPicture, instructorDashboard } = require("../controllers/Profile");
const { isAuth ,isInstructor} = require("../middlewares/auth");
const router=express.Router();


router.put("/updateProfile",isAuth,updateProfile);
router.delete("/deleteProfile",isAuth,deleteAccount);
router.get("/getUserDetails",isAuth,getUserDetails);
router.get("/getEnrolledCourse",isAuth,getEnrolledCourses);
router.put("/updateDisplayPicture",isAuth,updateDisplayPicture);
router.get("/instructorDashboard", isAuth, isInstructor, instructorDashboard)


module.exports=router;