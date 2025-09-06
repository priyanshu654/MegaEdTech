import React, { useEffect, useState } from 'react'
import { VscAdd } from "react-icons/vsc"
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../services/operations/courseApi';
import IconBtn from '../../common/IconBtn';
import {  useNavigate } from 'react-router-dom';
import CourseTable from './InstructorCourse/CourseTable';

export default function MyCourses() {
  const {token}=useSelector((state)=>state.auth);
  const [courses,setCourses]=useState([]);
  const navigate=useNavigate();
  
  useEffect(()=>{
    async function fetchInstructionCourse(){
      const result=await fetchInstructorCourses(token);
      if(result){
        setCourses(result);
      }
    }

    fetchInstructionCourse();
  },[])
  console.log("aa gya instructor ka course",courses);
  
  return (
    <div>
      <div className='mb-14 flex items-center justify-between'>
      <h1 className='text-3xl  text-richblack-5 font-bold'>My Courses</h1>
      <IconBtn text={"Add Course"}
      onClick={()=>navigate("/dashboard/add-course")}
      >
        <VscAdd />
        </IconBtn>
      
    </div>
    {courses&&(<CourseTable courses={courses} setCourses={setCourses}/>)}
    </div>
  )
}
