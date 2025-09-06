require("dotenv").config();
const Course = require("../modules/course");
const CourseProgress=require("../modules/courseProgress")
const Profile = require("../modules/profile");
const User = require("../modules/user");
const { uploadImage } = require("../utils/imageUploader");
const secondsToDuration =require("../utils/secToDuration")


exports.updateProfile = async (req, res) => {
  try {
    //fetch data

    const { gender, bio, dob, contactNumber } = req.body;

    //fetch id
    const id = req.user.id;
    //validate
    console.log("update me id hai",id);
    

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    //fetch profile from user
    const profileId = userDetails.additionalInfo;
    //ab profile id se profile details nikal lo
    const profileDetails = await Profile.findById(profileId);

    //update profile

    if (gender) {
      profileDetails.gender = gender;
    }
    if (dob) {
      profileDetails.dob = dob;
    }
    if (bio) {
      profileDetails.bio = bio;
    }
    if (contactNumber) {
      profileDetails.contactNumber = contactNumber;
    }
    //save
    await profileDetails.save();

    //return respnse

    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      data: profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating profile",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    //id le lo
    console.log("aaya yha tak");
    //es se nhi chala
    const id = req.user.id;
    console.log("id aaya hai",id);
    
    //user details fetch kar lo
    const userDetails = await User.findById(id);
    //validate user
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //profile find karo us user k respect me or use v delete karo
    const profileId = userDetails.additionalInfo;
    await Profile.findByIdAndDelete(profileId);
    await User.findByIdAndDelete(userDetails._id);

    //HW unenroll user from courses
    const courses = userDetails.courses;

    //promise.all use karte hai jb ek saath bhut saare async work karte hai like yha par har baar database call hoga har ek cous=rsee k lea or 
    //wha se enrolled students me se user ko htaya jaaega to yha promise.all use karna hoga
    //agr nhi use karenge or ek v db enteraction fail hoga to undefined behaviour aaega ....
    await Promise.all(
      courses.map((id) =>
        Course.findByIdAndUpdate(id, {
          $pull: { studentsEnrolled: userDetails._id },
        }).catch((err) => {
          console.error(`Failed to update course ID ${id}:`, err.message);
          // Optional: return something custom if needed
          return null;
        })
      )
    );

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting account",
      error: error.message,
    });
  }
};


exports.getUserDetails=async(req,res)=>{
    try {
        const id=req.user.id;

        const userDetails=await User.findById(id).select("-password").populate("additionalInfo"); //select-password to exclude password...

        if(!userDetails){
            return res.status(400)
            .json({
                success:false,
                message:"User not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"user fetched successfully",
            data:userDetails
        })
    } catch (error) {
       return res.status(500).json({
      success: false,
      message: "Error while fetching user",
      error: error.message
    }); 
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      let image = await uploadImage(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )

      if(!image){
        return res.status(400)
        .json({
          success:false,
          message:"problem in image upload"
        });
      }

      console.log("image hai",image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { profilePic: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "content",  // Changed from "content" to match your schema
            populate: {
              path: "subSection",
              select: "-videoUrl"
            }
          }
        })
        .exec()
      
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userId}`,  // Fixed variable reference
        })
      }
      //console.log("User details",userDetails.courses);
      const enrolledCourse=userDetails.courses.filter((course)=>(
        course.status==="Published"
      ))
      
      // Calculate course durations and progress
      const coursesWithProgress = await Promise.all(
        enrolledCourse.map(async (course) => {
          let totalDuration = 0
          let totalSubsections = 0
          
          // Calculate duration and subsection count
          course.content?.forEach(section => {
            section.subSection?.forEach(sub => {
              //console.log("sub hai",sub);
              
              totalDuration += parseInt(sub.timeDuration) || 0
              totalSubsections++
            })
          })

          // Get course progress
          const progress = await CourseProgress.findOne({
            courseId: course._id,
            userId: userId
          })

          console.log(progress);
          
          const completed = progress?.completedVideos?.length || 0
          const progressPercentage = totalSubsections > 0 
            ? Math.round((completed / totalSubsections) * 100 * 100) / 100 
            : 100
          
          return {
            ...course.toObject(),
            totalDuration: secondsToDuration(totalDuration),
            progressPercentage,
            completedVideos: completed,
            totalSubsections
          }
        })
      )
      

      return res.status(200).json({
        success: true,
        data: coursesWithProgress,  // Now includes enriched course data
      })
    } catch (error) {
      console.error("Error in getEnrolledCourses:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    }
}