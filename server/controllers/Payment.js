const { default: mongoose } = require("mongoose");
const Course = require("../modules/course");
const { instance } = require("../config/razorpay");
const User = require("../modules/user");
const mailSender = require("../utils/mailSender");
const crypto=require('crypto');

exports.capturePayment = async (req, res) => {
  //fetch data
  const { course_id } = req.body;
  const user_id = req.user.id;

  //validate karo data
  if (!course_id) {
    return res.status(400).json({
      success: false,
      message: "Course id not found",
    });
  }

  //fetch course details
  let courseDetails;
  try {
    courseDetails = await Course.findById(course_id);
    if (!courseDetails) {
      return res.status(401).json({
        success: false,
        message: "Course not found",
      });
    }

    //check if user already enrolled in course
    //convert string userid to object because in course students enrolled array all id are stored in object id
    const uid = new mongoose.Types.ObjectId(user_id);
    if (courseDetails.studentsEnrolled.includes(uid)) {
      return res.status(402).json({
        success: false,
        message: "Student already enrolled in course",
      });
    }
  } catch (error) {
    return res.status(500).json({
      succcess: false,
      message: error.message,
    });
  }

  //create order

  const amount = courseDetails.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency: currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      course_id: courseDetails._id,
      user_id,
    },
  };

  try {
    const paymentDetails =await instance.orders.create(options);
    console.log(paymentDetails);

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      courseName: courseDetails.title,
      description: courseDetails.description,
      amount: paymentDetails.amount,
      orderId: paymentDetails.id,
      thumbnail: courseDetails.thumbnail,
      currency: paymentDetails.currency,
    });
  } catch (error) {
    console.log(error);
    return res.status(402).json({
      success: false,
      message: "Couldnt initaiate order",
    });
  }
};

exports.verifySignature = async (req, res) => {
  //this present in server
  const webhookSecret = "12345678";
  //this we will get from razorpay with encryption
  const signature = req.headers["x-razorpay-signature"];

  //signature that we get from razorpay is encrypted by appliying different steps so it is not possible to get back tothe original secret
  //from the encrypted one
  //thats why we will apply the same methods to the server signature and we will match both encrypted signature if those match it is good to go

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));

  const digest = shasum.digest("hex");

  if (signature === digest) {
    //payment authorised
    //ab kya karna hai course me user id ko push karna hai students enrolled me
    //and user k course me course id ko add karna hai
    //kha se milega course id and user id payment details se jb hm notes bna k bheje the courseID and user_id

    //yeah log karne par pta chalega ki kaise hm notes tak pahuche..
    const { user_id, course_id } = req.body.payload.payment.entity.notes;


    try {
      const courseEnrolled = await Course.findByIdAndUpdate(
        course_id,
        {
          $push: {
            studentsEnrolled: user_id,
          },
        },
        { new: true }
      );

      if (!courseEnrolled) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }

      const enrolledStudent = await User.findByIdAndUpdate(
        user_id,
        {
          $push: {
            courses: course_id,
          },
        },
        {
          new: true,
        }
      );

      console.log(enrolledStudent);

      const mailResponse = await mailSender(
        enrolledStudent.email,
        "Welcome to the new course at studyNotion",
        "Congratulations!!, Be ready for new journey"
      );

      console.log(mailResponse);

      return res.status(200).json({
        success: true,
        message: "Signature verified and Course Added",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }else{
    return res.status(404)
    .json({
        success:false,
        message:"Signature invalid"
    })
  }
};
