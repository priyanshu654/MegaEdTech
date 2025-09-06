import toast from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice";
import { profileApi } from "../api";
import { apiConnector } from "../apiConnector";


const { GET_PROFILE,GET_USER_ENROLLED_COURSES_API ,GET_INSTRUCTOR_DATA_API} = profileApi;

export function getProfile  ({ token }){
  return async (dispatch) => {
    
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_PROFILE, {token:token}, {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_USER_DETAILS_RESPONSE....", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const userImage = response.data.data.profilePic
        ? response.data.data.profilePic
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.fName} ${response.data.data.lName}`;
      //setUserDetails(response.data);

      dispatch(setUser({ ...response.data.data, userImage }));
    } catch (error) {
      //dispatch(logout(navigate));
      //navigate("login")
      console.log("FETCH_USER_DETAILS ERROR", error);
      toast.error("Failed fetching details");
    }
    dispatch(setLoading(false));
    
  };
};



export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
    result = response?.data?.data
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
    toast.error("Could Not Get Instructor Data")
  }
  toast.dismiss(toastId)
  return result
}