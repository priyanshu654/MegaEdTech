import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../common/IconBtn"
import { changePassword } from "../../../../services/operations/settingApi"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
 const{user}=useSelector((state)=>state.profile);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    // console.log("password Data - ", data)
    const payload={
        email:user.email,
        password:data.password,
        newPassword:data.newPassword,
    }
    try {
      await changePassword(token, payload)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <h2 className="text-lg font-semibold text-richblack-5">Password</h2>

        {/* Old Password */}
        <div className="relative flex flex-col gap-2 w-full">
          <label htmlFor="password" className="lable-style">
            Current Password <span className="text-pink-200">*</span>
          </label>
          <input
            type={showOldPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter Current Password"
            className="form-style"
            {...register("password", { required: true })}
          />
          <span
            onClick={() => setShowOldPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showOldPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          {errors.password && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your Current Password.
            </span>
          )}
        </div>

        {/* New Password */}
        <div className="relative flex flex-col gap-2 w-full">
          <label htmlFor="newPassword" className="lable-style">
            New Password <span className="text-pink-200">*</span>
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            id="newPassword"
            placeholder="Enter New Password"
            className="form-style"
            {...register("newPassword", { required: true })}
          />
          <span
            onClick={() => setShowNewPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showNewPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          {errors.newPassword && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your New Password.
            </span>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="relative flex flex-col gap-2 w-full">
          <label htmlFor="confirmNewPassword" className="lable-style">
            Confirm New Password <span className="text-pink-200">*</span>
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmNewPassword"
            id="confirmNewPassword"
            placeholder="Confirm New Password"
            className="form-style"
            {...register("confirmNewPassword", {
              required: true,
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          {errors.confirmNewPassword && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.confirmNewPassword.message ||
                "Please confirm your New Password."}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mr-10">
        <button
          onClick={() => navigate("/dashboard/my-profile")}
          type="button"
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Update" />
      </div>
    </form>
  )
}
