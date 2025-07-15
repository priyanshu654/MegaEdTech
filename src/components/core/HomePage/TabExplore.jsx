import { HomePageExplore } from "../../../data/homepage-explore";

import React, { useState } from "react";
import HighlightedText from "./HightlightedText";
import Cards from "./Cards";

const tabs = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

export default function TabExplore() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCourses, setCurrentCourses] = useState(
    HomePageExplore[0].courses[0]
  );
 // console.log("original data", HomePageExplore);
 // console.log("courses are", courses);
 // console.log("current couse", currentCourses);

  const handleClick = (value) => {
    setCurrentTab(value);
    let data = HomePageExplore.filter((el) => {
      return el.tag == value;
    });
    //by looking at data
    setCourses(data[0].courses);
    setCurrentCourses(data[0].courses[0])
  };

  const handleCard=(value)=>{
    let data=courses.filter((el)=>{
        return el==value
    })
    setCurrentCourses(data[0]);
  }



  return (
    <>
      <div className="w-screen flex flex-col mt-24 relative">
        <div className="flex flex-col items-center justify-center gap-3 -ml-14">
          <h1 className="text-4xl font-bold text-white">
            Unlock the <HighlightedText text={"Power of Code"} />
          </h1>
          <p className="text-pure-greys-200 text-lg">
            Learn to build anything you can imagine
          </p>
        </div>

        <div className="flex justify-center gap-4 bg-richblack-800 w-[45%] ml-96 mt-10 p-2 rounded-full text-pure-greys-200 font-semibold relative h-[60px]">
          {tabs.map((el, index) => (
            <div
              key={index}
              className={` cursor-pointer h-full flex items-center justify-center px-5 rounded-full hover:bg-richblack-900 transition-all duration-200 ${
                el == currentTab ? "bg-richblack-900" : ""
              }`}
              onClick={() => {
                handleClick(el);
              }}
            >
              {el}
            </div>
          ))}
        </div>

        <div className="flex gap-10 justify-center mt-24 relative">
            
            {
                courses.map((el,index)=>{
                    return(
                        
                        <div key={index}>
                            <Cards el={el} handleCard={handleCard} curretCard={currentCourses}/>
                        </div>
                    )
                })
            }
        </div>


      </div>
    </>
  );
}
