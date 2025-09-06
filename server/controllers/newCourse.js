require("dotenv").config();
const Course = require("../modules/course");
const User = require("../modules/user");
const { uploadImage } = require("../utils/imageUploader");
const Category = require("../modules/category");
const Section = require("../modules/section");
const SubSection = require("../modules/subSection");
const secondsToDuration = require("../utils/secToDuration");
const CourseProgress = require("../modules/courseProgress");

exports.createCourse = async (req, res) => {
  try {
    //get data from req.body
    let {
      title,
      description,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;
    //thumbnail from files
    const { thumbnail } = req.files;

    //validation

    if (
      !title ||
      !description ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are requires",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }
    //checkInstructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });
    if (!instructorDetails) {
      return res.status(401).json({
        success: false,
        message: "Instructor details not found",
      });
    }

    //check tag details
    //here we got tag as id of tag

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(402).json({
        success: false,
        message: "Invalid category",
      });
    }

    //upload thumbnail of course to cloudinary
    const thumbnailDetails = await uploadImage(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //crate new payload for course to be created
    const coursePayload = {
      title,
      description,
      whatYouWillLearn,
      price,
      category: categoryDetails._id,
      instructor: instructorDetails._id,
      thumbnail: thumbnailDetails.secure_url,
      tag,
      status,
      instructions,
    };

    //course created..
    const createdCourseDetails = await Course.create(coursePayload);

    //jb course create ho gya to es user k course array me es course ko add kar denge q ki this user is creator dont need to buy  this...
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: createdCourseDetails._id,
        },
      },
      { new: true }
    );

    //tags me v course array ko update karenge es se pta chalega ki es tags se kitne course hai filter karne k kaam aaega

    await Category.findByIdAndUpdate(
      {
        _id: categoryDetails._id,
      },
      {
        $push: {
          courses: createdCourseDetails._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      course: createdCourseDetails,
    });
  } catch (error) {
    console.log("Error while creating Course", error);
    return res.status(500).json({
      success: false,
      message: "Error while creating course",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courseData = await Course.find(
      {},
      {
        title: true,
        instructor: true,
        price: true,
        thumbnail: true,
        studentsEnrolled: true,
        ratingAndReviews: true,
      }
    )
      .populate("instructor")
      .exec();

    if (!courseData) {
      return res.status(400).json({
        success: false,
        message: "Error fetching courses",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All course data fetched",
      data: courseData,
    });
  } catch (error) {
    console.log("Error while getting all courses", error);
    return res.status(500).json({
      success: false,
      message: "Error occured while getting all course",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    //console.log("call yha aaya");

    const { courseId } = req.query;
    //console.log("Course id hai",courseId);

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        select: "fName lName email", // You can adjust the selected fields
        populate: {
          path: "additionalInfo",
          select: "bio gender dob contactNumber", // Example fields
        },
      })
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "user",
          select: "fName lName email profilePic",
        },
      })
      .populate({
        path: "content",
        populate: {
          path: "subSection",
          select: "title timeDuration description ",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    let totalDurationInSeconds = 0;

    courseDetails.content.forEach((content) => {
      //console.log("section",content);
      
      content.subSection.forEach((subSection) => {
        //console.log("Subsection",subSection);
        
        const timeDuration = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDuration;
      });
    });
    //console.log(totalDurationInSeconds,"seconds hai");
    

    const totalDuration = secondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: { courseDetails, totalDuration },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching course details",
      error: error.message,
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    //console.log("call yha aaya");

    const { courseId } = req.query;
    //console.log("Course id hai",courseId);
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        select: "fName lName email", // You can adjust the selected fields
        populate: {
          path: "additionalInfo",
          select: "bio gender dob contactNumber", // Example fields
        },
      })
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "user",
          select: "fName lName email profilePic",
        },
      })
      .populate({
        path: "content",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    let progressCount = await CourseProgress.findOne({ courseId: courseId ,userId:userId});

    console.log("progressCount", progressCount);

    let totalDurationInSeconds = 0;

    courseDetails.content.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDuration = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDuration;
      });
    });

    const totalDuration = secondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: {
        courseDetails,
        totalDuration,
        completedVideos: progressCount?.completedVideos
          ? progressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching course details",
      error: error.message,
    });
  }
};

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    })
      .populate("instructor")
      .sort({ createdAt: -1 })
      .exec();

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log("Edit ka course id", courseId);

    const updates = req.body;

    // Find course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Handle thumbnail update if present
    if (req.files && req.files.thumbnail) {
      const thumbnail = req.files.thumbnail;
      const uploadedThumbnail = await uploadImage(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = uploadedThumbnail.secure_url;
    }

    // Fields you allow to update (match from your createCourse)
    const updatableFields = [
      "title",
      "description",
      "whatYouWillLearn",
      "price",
      "tag",
      "category",
      "status",
      "instructions",
    ];

    for (const field of updatableFields) {
      if (updates[field]) {
        if (field === "instructions" || field === "tag") {
          course[field] =
            typeof updates[field] === "string"
              ? JSON.parse(updates[field])
              : updates[field];
        } else {
          course[field] = updates[field];
        }
      }
    }

    // Save updated course
    await course.save();

    // Populate similar to createCourse response
    const updatedCourse = await Course.findById(courseId)
      .populate("category")
      .populate({
        path: "instructor",
        select: "-password", // Optional: don't return password
        populate: {
          path: "additionalInfo",
        },
      })
      .populate({
        path: "content",
        populate: {
          path: "subSection",
        },
      })
      .populate("ratingAndReviews");

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error editing course:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseInfo = await Course.findById(courseId);
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }

    //student ko course se unenroll kra denge
    const students = courseInfo.studentsEnrolled;

    for (const studentId of students) {
      await User.findByIdAndUpdate(studentId, {
        $pull: {
          courses: courseId,
        },
      });
    }

    //ab section and subsection delete karenge

    const section = courseInfo.content;

    for (const sectionId of section) {
      const sectionInfo = await Section.findById(sectionId);
      if (sectionInfo) {
        const subSection = sectionInfo.subSection;

        for (const subSectionId of subSection) {
          await SubSection.findByIdAndDelete(subSectionId);
        }

        await Section.findByIdAndDelete(sectionId);
      }
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
