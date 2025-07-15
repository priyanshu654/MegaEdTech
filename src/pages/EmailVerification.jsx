import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/operations/authApi";

export default function EmailVerification() {
  const { loading,signUpData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();


  //agr signup data hi na ho to signup page par redirect kar denge
  useEffect(()=>{
    if(!signUpData){
    navigate("/signup")
  }
  },[])
  

  //yha par otp ko combine kar denge signupdata k saath or tb signup api hit karnge
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add dispatch/axios call here if needed
    const{fName,lName,email,password,confirmPassword,accountType}=signUpData;
    dispatch(signUp(fName,lName,email,password,confirmPassword,accountType,otp,navigate));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-richblack-900 -mt-20">
      {loading ? (
        <div className="text-white text-xl font-semibold">Loading...</div>
      ) : (
        <div className="text-pure-greys-25 flex flex-col gap-3 items-center">
          <h1 className="text-white text-3xl font-bold">Verify Email</h1>
          <p className="font-semibold text-richblack-300 text-center max-w-md">
            A verification code has been sent to your email address.
          </p>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputType="tel"
              shouldAutoFocus
              renderSeparator={<span>-</span>}
              inputStyle={{ width: "40px" }}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-20  h-12 text-xl text-center border border-richblack-600 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400 bg-richblack-5 text-pure-greys-900"
                />
              )}
              containerStyle="flex gap-2 font-bold"
            />

            <button
              type="submit"
              className="bg-yellow-25 px-6 py-2 rounded-md font-bold transition-all duration-200 hover:scale-105 w-full text-black"
            >
              Verify
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
