import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/settingApi";


const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function UpdateProfileInformation() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.fName || "",
      lastName: user?.lName || "",
      dob: user?.additionalInfo?.dob || "",
      gender: user?.additionalInfo?.gender || "",
      contactNumber: user?.additionalInfo?.contactNumber || "",
      about: user?.additionalInfo?.bio || "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    const payload = {
      gender: data.gender,
      dob: data.dob,
      bio: data.about,
      contactNumber: data.contactNumber,
    };
    // Call your update function or dispatch here
    try {
      dispatch(updateProfile(token, payload));
    } catch (error) {}
  };

  return (
    <div className="bg-richblack-800 w-[100%] h-fit border border-richblack-500 rounded-md mt-16">
      <div className="flex flex-col p-10 text-pure-greys-25">
        <h1 className="text-xl font-semibold">Profile Information</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="flex flex-col gap-7">
            {/* First Name & Last Name */}
            <div className="flex gap-20">
              <div className="flex flex-col w-[40%] gap-2">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="form-style"
                  placeholder="Enter first name"
                  {...register("firstName", {
                    required: "First name is required.",
                  })}
                />
                {errors.firstName && (
                  <span className="text-[12px] text-yellow-100">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-[40%] gap-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="form-style"
                  placeholder="Enter last name"
                  {...register("lastName", {
                    required: "Last name is required.",
                  })}
                />
                {errors.lastName && (
                  <span className="text-[12px] text-yellow-100">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            {/* DOB & Gender */}
            <div className="flex gap-20">
              <div className="flex flex-col w-[40%] gap-2">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  className="form-style"
                  {...register("dob", {
                    required: "Date of birth is required.",
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Date cannot be in the future.",
                    },
                  })}
                />
                {errors.dob && (
                  <span className="text-[12px] text-yellow-100">
                    {errors.dob.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-[40%] gap-2">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  className="form-style"
                  {...register("gender", { required: "Gender is required." })}
                >
                  <option value="">Select Gender</option>
                  {genders.map((ele, i) => (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <span className="text-[12px] text-yellow-100">
                    {errors.gender.message}
                  </span>
                )}
              </div>
            </div>

            {/* Contact Number & About */}
            <div className="flex gap-20">
              <div className="flex flex-col w-[40%] gap-2">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="tel"
                  id="contactNumber"
                  className="form-style"
                  placeholder="Enter contact number"
                  {...register("contactNumber", {
                    required: "Contact number is required.",
                    minLength: { value: 10, message: "Too short." },
                    maxLength: { value: 12, message: "Too long." },
                  })}
                />
                {errors.contactNumber && (
                  <span className="text-[12px] text-yellow-100">
                    {errors.contactNumber.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-[40%] gap-2">
                <label htmlFor="about">About</label>
                <input
                  type="text"
                  id="about"
                  className="form-style"
                  placeholder="Tell us about yourself"
                  {...register("about", { required: "About is required." })}
                />
                {errors.about && (
                  <span className="text-[12px] text-yellow-100">
                    {errors.about.message}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6 gap-6">
              <button
                onClick={() => navigate("/dashboard/my-profile")}
                type="button"
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-100 text-black rounded-md font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
