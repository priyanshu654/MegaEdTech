const BASE_URL=process.env.REACT_APP_BASE_URL

export const categories={
    CATEGORIES_API:BASE_URL+"/course/getAllCategory"
}

export const authApi={
    SIGNUP_API:BASE_URL+"/auth/signup",
    SEND_OTP:BASE_URL+"/auth/sendotp",
    LOGIN_API:BASE_URL+"/auth/login",
    GENERATE_TOKEN:BASE_URL+"/auth/generate-reset-token",
    RESET_PASSWORD:BASE_URL+"/auth/reset-password"
}

export const profileApi={
    GET_PROFILE:BASE_URL+"/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API:BASE_URL+"/profile/getEnrolledCourse",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",

}

export const settingApi={
    CHANGE_PICTURE:BASE_URL+"/profile/updateDisplayPicture",
    UPDATE_PROFILE_API:BASE_URL+"/profile/updateProfile",
    CHANGE_PASSWORD_API:BASE_URL+"/auth/changepassword",
    DELETE_PROFILE_API:BASE_URL+"/profile/deleteProfile",
}


// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/createSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/createSubsection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubsection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubsection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createReviews",
  GET_FULL_VIDEO_DETAILS:BASE_URL+"/course/getFullVideoDetails",
  GET_ALL_REVIEWS:BASE_URL+"/course/getAllreviews"
}

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}