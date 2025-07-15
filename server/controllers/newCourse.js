require("dotenv").config();
const Course = require("../modules/course");
const User = require("../modules/user");
const { uploadImage } = require("../utils/imageUploader");
const Category = require("../modules/category");

exports.createCourse = async (req, res) => {
  try {
    //get data from req.body
    let { title, description, whatYouWillLearn, price, tag,category ,status } = req.body;
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

    if(!status || status===undefined){
      status="Draft"
    }
    //checkInstructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId,{accountType:"Instructor"});
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
      status
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
          course: createdCourseDetails._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      courseId: createdCourseDetails._id,
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
    const { courseId } = req.body;

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
          select: "fName lName email profilePic"
        }
      })
      .populate({
        path: "content",
        populate: {
          path: "subSection",
          select: "title duration description videoUrl"
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching course details",
      error: error.message,
    });
  }
};
