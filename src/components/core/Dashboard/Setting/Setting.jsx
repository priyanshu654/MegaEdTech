import React from "react";
import ChangeProfilePic from "./ChangeProfilePic";
import UpdateProfileInformation from "./UpdateProfileInformation";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

export default function Setting() {
  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      <ChangeProfilePic/>
      <UpdateProfileInformation/>
      <UpdatePassword/>
      <DeleteAccount/>
    </div>
  );
}
