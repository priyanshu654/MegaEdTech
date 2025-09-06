import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { settingApi } from "../api"
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authApi";

const{CHANGE_PICTURE,UPDATE_PROFILE_API,CHANGE_PASSWORD_API ,DELETE_PROFILE_API}=settingApi;

export function changeProfilePic(token,formData){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        try {
            const response=await apiConnector("PUT",CHANGE_PICTURE,formData,{
                "content-type":"multipart/form-data",
                Authorization: `Bearer ${token}`
            })

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            console.log("UPDATE_PROFILE_RESPONSE...",response.data.data);
            toast.success("Profile Picture Updated")
            localStorage.setItem("user",JSON.stringify(response.data.data))
            dispatch(setUser(response.data.data));
            
            
        } catch (error) {
            console.log("Update profile pic",error);
            toast.error("Cannot upload picture");
        }
        toast.dismiss(toastId);
    }
}



export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
    //   const userImage = response.data.updatedUserDetails.image
    //     ? response.data.updatedUserDetails.image
    //     : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
    //   dispatch(
    //     setUser({ ...response.data.updatedUserDetails, image: userImage })
    //  )
      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}


export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}