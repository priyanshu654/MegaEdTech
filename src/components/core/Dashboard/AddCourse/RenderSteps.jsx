import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilder from "./CourseBuilder/CourseBuilder";
import CoursePublish from "./Coursepublish/CoursePublish";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish Course",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Step Circles + Progress Line */}
      <div className="flex items-center ml-10">
        {steps.map((el, index) => (
          <React.Fragment key={el.id}>
            {/* Step Circle */}
            <div
              className={`${
                el.id === step
                  ? "text-yellow-25 bg-yellow-900 border-[1px] border-yellow-25"
                  : "bg-richblack-700 text-pure-greys-200"
              } flex items-center justify-center gap-5 rounded-full w-10 h-10 text-lg font-semibold ${
                step > el.id ? "bg-yellow-25" : ""
              }`}
            >
              {step > el.id ? (
                <FaCheck className="font-bold text-richblack-900" />
              ) : (
                el.id
              )}
            </div>

            {/* Dashed Line between steps (except last one) */}
            {el.id !== steps.length && (
              <div
                className={`${
                  el.id < step ? "bg-yellow-25" : "bg-richblack-500"
                } w-[28%] h-px border-dashed border-b-2`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Titles */}
      <div className="relative mb-16 flex w-full select-none gap-14 mt-2">
        {steps.map((item) => (
          <div
            className="flex min-w-[130px] flex-col items-center gap-y-2"
            key={item.id}
          >
            <p
              className={`text-sm ${
                step === item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Render Step Content */}
      {step === 1 && <CourseInformationForm />}
      {step===2 && <CourseBuilder/>}
      {step===3 && <CoursePublish/>}
      {/* Add other step components like CourseBuilderForm or PublishForm as needed */}
    </div>
  );
}
