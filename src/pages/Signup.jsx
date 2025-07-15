import  { useState } from "react";

import signupImg from "../assets/Images/signup.webp";
import frame from "../assets/Images/frame.png";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignUpData } from "../slices/authSlice";
import { sendOtp } from "../services/operations/authApi";


export default function Signup() {
  const [accountType, setAccountType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  //signup me jb hm create account par click kar rhe hai to
  //1 phle hm jo v form me data hai us data ko signup data me assign kar de rhe hai uske reducer function se hm yha signup api hit nhi kar rhe hai
  // sirf signup data fill kar rhe hai q ki otp baaki hai or signup api otp v leta hai
  //2 fir hm yha par sendopt function call kar rhe hai jo ki sendotp api ko hit kar rha hai or otp send ho jaaega or hm verify email wale page par chale jaaemnge
  //wha par hm otp enter karenge jo v mail par gya hoga us ko use kar otp or signup data ko combine kar k signup api to tb hit karenge  
  
  const [formData,setFormData]=useState({
    fName:"",
    lName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const{fName,lName,email,password,confirmPassword}=formData

  function handleChange(e){
    setFormData((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))
  }
  


const handleSubmit=(e)=>{
  e.preventDefault();

  if(password!==confirmPassword){
    toast.error("Password didnt match")
  }

  const signUpData={...formData,accountType}

  //set the signup data
  dispatch(setSignUpData(signUpData));

  //send otp

  dispatch(sendOtp(formData.email,navigate));

  setFormData({
    fName:"",
    lName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  setAccountType("Student")
}



  return (
    <div className="bg-richblack-900 w-screen h-screen flex justify-between text-white">
      {/* Left Side: Form */}
      <div className="w-[40%] p-20 -mt-5 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-2">
          Join the millions learning to code with StudyNotion for free
        </h2>
        <p className="text-pure-greys-200 mb-6 text-lg">
          Build skills for today, tomorrow, and beyond. <br />
          <span className="font-edu-sa font-bold italic text-blue-100">
            Education to future-proof your career.
          </span>
        </p>

        {/* Role Switcher */}
        <div className="flex mb-6 bg-richblack-700 w-[250px] h-[60px] rounded-lg p-1">
          <div
            onClick={() => setAccountType("Student")}
            className={`flex-1 flex justify-center items-center rounded-lg font-semibold cursor-pointer transition-all duration-200
      ${
        accountType === "Student"
          ? "bg-richblack-900 text-white"
          : "text-richblack-200"
      }`}
          >
            Student
          </div>

          <div
            onClick={() => setAccountType("Instructor")}
            className={`flex-1 flex justify-center items-center rounded-lg font-semibold cursor-pointer transition-all duration-200
      ${
        accountType === "Instructor"
          ? "bg-richblack-900 text-white"
          : "text-richblack-200"
      }`}
          >
            Instructor
          </div>
        </div>

        {/* Signup Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="flex gap-4">
            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="firstName"
                className="text-pure-greys-100 font-medium"
              >
                First Name <span className="text-pink-300">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="fName"
                value={fName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full p-3 rounded bg-richblack-700 text-white placeholder:text-pure-greys-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="lastName"
                className="text-pure-greys-100 font-medium"
              >
                Last Name <span className="text-pink-300">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lName"
                value={lName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full p-3 rounded bg-richblack-700 text-white placeholder:text-pure-greys-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-pure-greys-100 font-medium">
              Email Address <span className="text-pink-300">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full p-3 rounded bg-richblack-700 text-white placeholder:text-pure-greys-300 focus:outline-none"
            />
          </div>

          {/* Passwords */}
          <div className="flex gap-4">
            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="password"
                className="text-pure-greys-100 font-medium"
              >
                Create Password <span className="text-pink-300">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full p-3 rounded bg-richblack-700 text-white placeholder:text-pure-greys-300 focus:outline-none"
                />
                <span className="absolute top-4 right-2  hover:cursor-pointer text-pure-greys-300" onClick={()=>setShowPassword((prev)=>!prev)}>
                  {showPassword ? <AiOutlineEyeInvisible size={22}/> : <AiOutlineEye size={22}/>}
                </span>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="confirmPassword"
                className="text-pure-greys-100 font-medium"
              >
                Confirm Password <span className="text-pink-300">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full p-3 rounded bg-richblack-700 text-white placeholder:text-pure-greys-300 focus:outline-none"
                />
                <span
                  className="absolute right-1 top-4  hover:cursor-pointer text-pure-greys-300"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </span>
              </div>
            </div>
            
          </div>
          <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 hover:scale-105 transition-all duration-200"
          
        >
          Create Account
        </button>
        </form>

        {/* Submit Button */}
        
      </div>

      {/* Right Side: Image */}
      <div className="w-[50%] relative flex flex-col mt-40 -mr-36">
        <div className="absolute h-fit w-fit left-3 top-3">
          <img src={frame} alt="" width={450} />
        </div>
        <div className="absolute h-fit w-fit">
          <img src={signupImg} alt="" width={450} />
        </div>
      </div>
    </div>
  );
}
