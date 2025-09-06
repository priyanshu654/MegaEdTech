import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNumberOfLecture: 0,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setCourseEntireData: (state, action) => {
      state.courseEntireData = action.payload;
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload;
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload];
    },
    setTotalNumberOfLecture: (state, action) => {
      state.totalNumberOfLecture = action.payload;
    },
  },
});

export const {
  setCourseEntireData,
  setCourseSectionData,
  setCompletedLectures,
  updateCompletedLectures,
  setTotalNumberOfLecture,
} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;
