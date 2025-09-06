import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { generateTokenLink } from "../services/operations/authApi";

export default function ForgotPassword() {
  const [sendMail, setSendMail] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch=useDispatch();
  const { loading } = useSelector((state) => state.auth);
  //console.log(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generateTokenLink(email,setSendMail));
  };

  return (
    <div className="bg-richblack-900 w-screen min-h-screen flex flex-col justify-center items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-md p-8 bg-richblack-900 rounded-md shadow-md text-richblack-25 space-y-3">
          <h1 className="text-3xl font-bold">
            {!sendMail ? "Reset your password" : "Check email"}
          </h1>
          <p className="text-richblack-200 text-lg font-semibold">
            {!sendMail ? (
              "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
            ) : (
              <>
                We have sent the reset email to{" "}
                <span className="text-yellow-400 font-medium">{email}</span>
              </>
            )}
          </p>

          {!sendMail && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-richblack-100">
                  Email Address<span className="text-pink-200"> *</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 bg-richblack-700 border border-richblack-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-25 text-richblack-900 font-semibold py-2 rounded-md hover:scale-105 transition-all"
              >
                {sendMail ? "Resend Email" : "Reset Password"}
              </button>
            </form>
          )}
          {sendMail && (
            <button
              type="submit"
              className="w-full bg-yellow-25 text-richblack-900 font-semibold py-2 rounded-md hover:scale-105 transition-all"
              onClick={handleSubmit}
            >
              Resend Email
            </button>
          )}
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm text-richblack-100 hover:text-yellow-400 transition-all"
          >
            <BiArrowBack className="text-lg" />
            Back To Login
          </Link>
        </div>
      )}
    </div>
  );
}
