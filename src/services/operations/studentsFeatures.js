import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../api";
import rzplogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");
  try {
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      {
        courses,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    console.log(orderResponse);
    const orderData = orderResponse.data.message;

    var options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderData.currency,
      name: "StudyNotion",
      description: "Making your payment",
      amount: orderData.amount,
      order_id: orderData.id,
      image: rzplogo,
      prefill: {
        name: `${userDetails.fName} ${userDetails.lName}`,
        email: `${userDetails.email}`,
      },
      handler: function (response) {
        //send payment success email
        console.log("responses",response);
        
        sendPaymentSuccessEmail(response, orderData.amount, token);
        //verify payment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
    const razopay = new window.Razorpay(options);
    razopay.open();
  } catch (error) {
    console.log("Capture Payment Error", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("PAYMENT_SUCCESS_MAIL_ERROR",error);
    
  }
}

const verifyPayment=async(bodyData,token,navigate,dispatch)=>{
  //console.log("We were here");
  
  const toastId=toast.loading("Verifying payment...");
  dispatch(setPaymentLoading(true));
  try {
    const response=await apiConnector("POST",COURSE_VERIFY_API,{bodyData},{Authorization:`Bearer ${token}`});
    if(!response.data.success){
      throw new Error(response.data.message);
    }
    toast.success("Payment verified.. You are added to course")
    dispatch(resetCart());
    navigate("/dashboard/enrolled-courses");
  } catch (error) {
    console.log("Verify payment error",error);
    toast.error("Couldnt verify payment");
    
  }
  finally{
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}
