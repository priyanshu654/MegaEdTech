const { default: mongoose } = require("mongoose");
const Course = require("../modules/course");
const RatingAndReviews = require("../modules/ratingAndReview");
const User = require("../modules/user");

exports.CreateRatingAndReviews = async (req, res) => {
  try {
    //fetch data
    const { rating, reviews, courseId } = req.body;

    const userId = req.user.id;
    //validate
    if (!rating || !reviews || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //check wether user is enrolled in course or not
    const courseDetails = await Course.findById(courseId);

    const enrolledStudent = courseDetails.studentsEnrolled.includes(userId);
    if (!enrolledStudent) {
      return res.status(401).json({
        success: false,
        message: "Student not enrolled in course",
      });
    }

    //other way to check enrolledstudents
    //  courseDetails=await Course.findOne({_id:courseId,studentsEnrolled:{$eleMatch:{$eq:userId}},});

    //check if user already rated and reviewed course
    const existingReview = await RatingAndReviews.findOne({
      user: userId,
      course: courseId,
    });
    if (existingReview) {
      return res.status(402).json({
        success: false,
        message: "User already reviewed",
      });
    }

    //create rating review

    const ratingReview = await RatingAndReviews.create({
      user: userId,
      rating,
      reviews,
      course: courseId,
    });
    //add to course in rating and reviews
    const addingReviews = await Course.findByIdAndUpdate(courseId, {
      $push: {
        ratingAndReviews: ratingReview._id,
      },
    });
    if (!addingReviews) {
      return res.status(403).json({
        success: false,
        message: "Course not found",
      });
    }
    //return response
    return res.status(200).json({
      success: true,
      message: "rating and reviews added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while creating reviews",
    });
  }
};

exports.getAllReviewOfCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    //this will populate only these four fields of user schema
    const reviews = await RatingAndReviews.find({ course: courseId })
      .populate("user", "fName lName email profilePic")
      .sort({ createdAt: -1 });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //if you want to populate more than two schema
    // const reviews = await RatingAndReviews.find().populate([
    //   { path: "user", select: "fName lName email" },
    //   { path: "course", select: "title price thumbnail" },
    // ]);

    return res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching reviews",
    });
  }
};

exports.getAvgRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    //this is aggregation just go through the syntax
    const result = await RatingAndReviews.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        }, 
      },
    ]);

    //retun array
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    //if no rating reviews found

    return res.status(200).json({
      success: true,
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllReview = async (req, res) => {
  try {
    //fetch all reviews
    //populate name email and image
    const reviews = await RatingAndReviews.find({})
      .populate({
        path: "user",
        select: "fName lName email profilePic",
      })
      .populate({
        path: "course",
        select: "title ",
      })
      .sort({createdAt:-1})
      .exec();

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
