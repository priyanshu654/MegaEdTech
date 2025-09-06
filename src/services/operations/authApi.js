import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { authApi } from "../api";
import { setUser } from "../../slices/profileSlice";


const { SIGNUP_API, SEND_OTP, LOGIN_API,GENERATE_TOKEN,RESET_PASSWORD } = authApi;

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
      localStorage.setItem("user",JSON.stringify(response.data.user))
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/");
    } catch (error) {
      console.log("Login Error", error);
      toast.error(error.response.data.message);
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
    localStorage.removeItem('user')
    toast.success("logout Successfull")
    navigate("/")
  }
}

export function generateTokenLink(email,setSendEmail){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    const toastId=toast.loading();

    try {
      const response=await apiConnector("POST",GENERATE_TOKEN,{email});

      console.log("GENERATE_TOKEN_RESPONSE....",response);

      if(!response){
        throw new Error(response.data.message);
      }
      
      toast.success("Reset link sent");
      setSendEmail(true);

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId);

  }
}

export function resetPassword(password,confirmPassword,token,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        const toastId=toast.loading();
        try {
          const response=await apiConnector("POST",RESET_PASSWORD,{password,confirmPassword,token});

          if(!response){
            throw new Error(response.data.message);
          }

          console.log("RESET_PASSWORD....",response);
          toast.success("Password updated, Try Login");
          
          navigate("/login")
          
          
        } catch (error) {
          console.log(error);
          toast.error("Cannot reset password");
        }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
}