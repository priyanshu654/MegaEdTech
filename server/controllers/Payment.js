const { default: mongoose } = require("mongoose");
const Course = require("../modules/course");
const { instance } = require("../config/razorpay");
const User = require("../modules/user");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");

exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;
    console.log("User id hai", userId);

    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide the course id",
      });
    }

    let totalAmount = 0;
    //console.log("courses",courses);

    for (const course_id of courses) {
      let course;

      try {
        course = await Course.findById(course_id);
        //console.log("course details",course);

        if (!course) {
          return res.status(400).json({
            success: false,
            message: "Course not found",
          });
        }

        //console.log("Ayya n yha tk");

        //const uid=new mongoose.Types.ObjectId(userId)
        const userDetails = await User.findById(userId);
        //console.log("user detils",userDetails);

        if (userDetails.courses.includes(course._id)) {
          return res.status(400).json({
            message: "Course already enrolled",
            success: false,
          });
        }

        totalAmount = totalAmount + course.price;
      } catch (error) {
        console.log("Error occured while validating course", error);
        return res.status(400).json({
          success: false,
          message: "Error while validating course",
        });
      }
    }

    const currency = "INR";

    var options = {
      amount: totalAmount * 100,
      currency,
      receipt: `receipt ${Date.now()}`,
      notes: {
        userId: userId,
        message: "Order created",
      },
    };

    try {
      const paymentResponse = await instance.orders.create(options);
      res.json({
        success: true,
        message: paymentResponse,
      });
    } catch (error) {
      console.log("create order error", error);
      return res.status(500).json({
        success: false,
        message: "Couldnot initiate order",
      });
    }
  } catch (error) {
    console.log("Error while creating order", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.verifySignature = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.bodyData?.razorpay_order_id;
    const razorpay_payment_id = req.body?.bodyData?.razorpay_payment_id;
    const razorpay_signature = req.body?.bodyData?.razorpay_signature;
    const courses = req.body?.bodyData?.courses;
    const userId = req.user.id;

    console.log("result", razorpay_order_id, courses);

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Payment Failed" });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "payment failed signature not matched",
      });
    }
    //ab agar signature match ho gya hai
    await enrollStudents(userId, courses, res);
    return res.status(200).json({
      success: true,
      message: "Payment verified",
    });
  } catch (error) {
    console.log("Verify signature error", error);
    return res.status(500).json({
      message: "Error while verifying signature",
      success: false,
    });
  }
};

const enrollStudents = async ( userId,courses, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide data for Courses or UserId",
    });
  }
  // console.log("courses hai",courses);
  // console.log("User id hai",userId);
  
  

  for (const courseId of courses) {
    console.log("yha tk chala", courseId);

    try {
      //find the course and enroll the student in it
      const enrolledCourse = await Course.findByIdAndUpdate(
        courseId,
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, message: "Course not Found" });
      }

      //find the student and add the course to their list of enrolledCOurses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
          },
        },
        { new: true }
      );

      console.log("Enrolled student",enrolledStudent);
      

      ///bachhe ko mail send kardo
      const emailResponse = await mailSender(
        enrolledStudent.email,

        courseEnrollmentEmail(
          enrolledCourse.title,
          `${enrolledStudent.fName}`
        ),
        `Successfully Enrolled into ${enrolledCourse.title}`
      );
      //console.log("Email Sent Successfully", emailResponse.response);
    } catch (error) {
      console.log(error);
      throw new Error("Enrollment failed: " + error.message);
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the fields" });
  }

  try {
    //student ko dhundo
    const enrolledStudent = await User.findById(userId);
    await mailSender(
      enrolledStudent.email,
      paymentSuccessEmail(
        `${enrolledStudent.fName}`,
        amount / 100,
        orderId,
        paymentId
      ),
      `Payment Recieved`
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(500)
      .json({ success: false, message: "Could not send email" });
  }
};

// exports.capturePayment = async (req, res) => {
//   //fetch data
//   const { course_id } = req.body;
//   const user_id = req.user.id;

//   //validate karo data
//   if (!course_id) {
//     return res.status(400).json({
//       success: false,
//       message: "Course id not found",
//     });
//   }

//   //fetch course details
//   let courseDetails;
//   try {
//     courseDetails = await Course.findById(course_id);
//     if (!courseDetails) {
//       return res.status(401).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     //check if user already enrolled in course
//     //convert string userid to object because in course students enrolled array all id are stored in object id
//     const uid = new mongoose.Types.ObjectId(user_id);
//     if (courseDetails.studentsEnrolled.includes(uid)) {
//       return res.status(402).json({
//         success: false,
//         message: "Student already enrolled in course",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       succcess: false,
//       message: error.message,
//     });
//   }

//   //create order

//   const amount = courseDetails.price;
//   const currency = "INR";

//   const options = {
//     amount: amount * 100,
//     currency: currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       course_id: courseDetails._id,
//       user_id,
//     },
//   };

//   try {
//     const paymentDetails =await instance.orders.create(options);
//     console.log(paymentDetails);

//     return res.status(200).json({
//       success: true,
//       message: "Order created successfully",
//       courseName: courseDetails.title,
//       description: courseDetails.description,
//       amount: paymentDetails.amount,
//       orderId: paymentDetails.id,
//       thumbnail: courseDetails.thumbnail,
//       currency: paymentDetails.currency,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(402).json({
//       success: false,
//       message: "Couldnt initaiate order",
//     });
//   }
// };

// exports.verifySignature = async (req, res) => {
//   //this present in server
//   const webhookSecret = "12345678";
//   //this we will get from razorpay with encryption
//   const signature = req.headers["x-razorpay-signature"];

//   //signature that we get from razorpay is encrypted by appliying different steps so it is not possible to get back tothe original secret
//   //from the encrypted one
//   //thats why we will apply the same methods to the server signature and we will match both encrypted signature if those match it is good to go

//   const shasum = crypto.createHmac("sha256", webhookSecret);
//   shasum.update(JSON.stringify(req.body));

//   const digest = shasum.digest("hex");

//   if (signature === digest) {
//     //payment authorised
//     //ab kya karna hai course me user id ko push karna hai students enrolled me
//     //and user k course me course id ko add karna hai
//     //kha se milega course id and user id payment details se jb hm notes bna k bheje the courseID and user_id

//     //yeah log karne par pta chalega ki kaise hm notes tak pahuche..
//     const { user_id, course_id } = req.body.payload.payment.entity.notes;

//     try {
//       const courseEnrolled = await Course.findByIdAndUpdate(
//         course_id,
//         {
//           $push: {
//             studentsEnrolled: user_id,
//           },
//         },
//         { new: true }
//       );

//       if (!courseEnrolled) {
//         return res.status(500).json({
//           success: false,
//           message: "Course not found",
//         });
//       }

//       const enrolledStudent = await User.findByIdAndUpdate(
//         user_id,
//         {
//           $push: {
//             courses: course_id,
//           },
//         },
//         {
//           new: true,
//         }
//       );

//       console.log(enrolledStudent);

//       const mailResponse = await mailSender(
//         enrolledStudent.email,
//         "Welcome to the new course at studyNotion",
//         "Congratulations!!, Be ready for new journey"
//       );

//       console.log(mailResponse);

//       return res.status(200).json({
//         success: true,
//         message: "Signature verified and Course Added",
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }else{
//     return res.status(404)
//     .json({
//         success:false,
//         message:"Signature invalid"
//     })
//   }
// };
