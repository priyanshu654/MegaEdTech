import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { authApi } from "../api";
import { setUser } from "../../slices/profileSlice";

const { SIGNUP_API, SEND_OTP, LOGIN_API } = authApi;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SEND_OTP, { email });
      console.log("SEND OTP RESPONSE......", response);
      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP sent successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SEND_OTP ERROR....", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  fName,
  lName,
  email,
  password,
  confirmPassword,
  accountType,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        fName,
        lName,
        email,
        password,
        confirmPassword,
        accountType,
        otp,
      });
      console.log("SIGNUP_API RESPONSE.......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("SignUp Successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("SignUp Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      console.log("LOGIN RESPONSE.....", response);

      if (!response) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      
      const userImage = response.data?.user?.profilePic
        ? response.data.user.profilePic
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.fName} ${response.data.user.lName}`;

      dispatch(setToken(response.data.token));
      dispatch(setUser({...response.data.user,userImage}));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/");
    } catch (error) {
      console.log("Login Error", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export function logout(navigate){
  return(dispatch)=>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem('token');
    toast.success("logout Successfull")
    navigate("/")
  }
}