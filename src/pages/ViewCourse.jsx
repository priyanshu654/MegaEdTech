import React, { useEffect, useState } from "react";
import VideoSideBarDetails from "../components/core/ViewCourse/VideoSideBarDetails";
import { Outlet, useParams } from "react-router-dom";
import { getFullVideoDetailsOfCourse } from "../services/operations/courseApi";
import { useDispatch, useSelector } from "react-redux";
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNumberOfLecture } from "../slices/viewCourseSlice";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

export default function ViewCourse() {
  const {courseId}=useParams();
  const {token}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const [reviewModal,setReviewModal]=useState(null);
  useEffect(()=>{
    async function getFullLectureDetails(){
      const response=await getFullVideoDetailsOfCourse(courseId,token);
      //console.log("response",response);
      if(response){
        dispatch(setCourseEntireData(response?.courseDetails))
        dispatch(setCourseSectionData(response?.courseDetails?.content))
        dispatch(setCompletedLectures(response.completedVideos))

        let totalLectures=0;
        response?.courseDetails?.content.forEach((el)=>{
          totalLectures+=el.subSection.length
        })
        //console.log("total lecture",totalLectures);
        dispatch(setTotalNumberOfLecture(totalLectures))
        
      }
      
      

    }
    getFullLectureDetails();

  },[courseId])

  return (
    <>
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <VideoSideBarDetails setReviewModal={setReviewModal} />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-6">
            <Outlet />
        </div>
        
      </div>
    </div>
    {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
