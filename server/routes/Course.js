const express=require("express");
const { isAuth, isInstructor, isAdmin, isStudent } = require("../middlewares/auth");
const { createCourse, getAllCourses, getCourseDetails, editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails } = require("../controllers/newCourse");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/subSection");
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/Category");
const { CreateRatingAndReviews, getAllReview, getAvgRating, getAllReviewOfCourse } = require("../controllers/Reviews");
const { updateCourseProgress } = require("../controllers/CourseProgress");
const router=express.Router();


//create courses only by instructor
router.post("/createCourse",isAuth,isInstructor,createCourse);
router.post("/createSection",isAuth,isInstructor,createSection);
router.post("/updateSection",isAuth,isInstructor,updateSection);
router.delete("/deleteSection",isAuth,isInstructor,deleteSection);
router.post("/createSubsection",isAuth,isInstructor,createSubSection);
router.post("/updateSubsection",isAuth,isInstructor,updateSubSection);
router.delete("/deleteSubsection",isAuth,isInstructor,deleteSubSection);
router.post("/editCourse",isAuth,isInstructor,editCourse);
router.delete("/deleteCourse",isAuth,isInstructor,deleteCourse);

//full details of course even video url
router.get("/getFullVideoDetails",isAuth,getFullCourseDetails)
//to update course progress
router.post("/updateCourseProgress", isAuth, isStudent, updateCourseProgress)


//get courses by any user even guest
router.get("/getAllCourses",getAllCourses);
router.get("/getCourseDetails",getCourseDetails);
router.get("/getInstructorCourses",isAuth,isInstructor,getInstructorCourses)



//create category only by admin

router.post("/createCategory",isAuth,isAdmin,createCategory);
router.get("/getAllCategory",showAllCategories);
router.get("/getCategoryPageDetails",categoryPageDetails);

//reviews section 

router.post("/createReviews",isAuth,isStudent,CreateRatingAndReviews);
router.get("/getAllreviews",getAllReview);
router.get("/getAvgRating",getAvgRating);
router.get("/getReviewsOfCourse",getAllReviewOfCourse);


module.exports=router;