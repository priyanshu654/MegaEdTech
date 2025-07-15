const BASE_URL=process.env.REACT_APP_BASE_URL

export const categories={
    CATEGORIES_API:BASE_URL+"/course/getAllCategory"
}

export const authApi={
    SIGNUP_API:BASE_URL+"/auth/signup",
    SEND_OTP:BASE_URL+"/auth/sendotp",
    LOGIN_API:BASE_URL+"/auth/login"
}