import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

export default function VideoSideBarDetails({ setReviewModal }) {
  const [activeSection, setActiveSection] = useState("");
  const [activeSubSection, setActiveSubSection] = useState("");
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const [loading,setLoading]=useState(false);
  const location = useLocation();

  const {
    courseSectionData,
    courseEntireData,
    totalNumberOfLecture,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  useEffect(() => {
  setLoading(true);

  let currentSectionId = sectionId;
  let currentSubSectionId = subSectionId;

  // If no section or subsection in URL, fallback to first section/video
  if (!currentSectionId || !currentSubSectionId) {
    const firstSection = courseSectionData?.[0];
    const firstSubSection = firstSection?.subSection?.[0];
    if (firstSection && firstSubSection) {
      currentSectionId = firstSection._id;
      currentSubSectionId = firstSubSection._id;

      // Navigate to first video
      navigate(
        `/view-course/${courseEntireData._id}/section/${currentSectionId}/sub-section/${currentSubSectionId}`,
        { replace: true }
      );
    }
  }

  setActiveSection(currentSectionId);
  setActiveSubSection(currentSubSectionId);
  setLoading(false);
}, [sectionId, subSectionId, courseSectionData]);


  

  return (

    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
      <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
        <div className="flex w-full items-center justify-between ">
          <div
            onClick={() => {
              navigate("/dashboard/enrolled-courses");
            }}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 cursor-pointer"
            title="back"
          >
            <IoIosArrowBack size={30} />
          </div>
          <span className="flex relative">
            <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onClick={() => setReviewModal(true)}
          >
          <FaRegEdit/>
          </IconBtn>
          </span>
          
        </div>
        <div className="flex flex-col">
          <p>{courseEntireData?.title}</p>
          <p className="text-sm font-semibold text-richblack-500">
            {completedLectures?.length} / {totalNumberOfLecture}
          </p>
        </div>
      </div>

      <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
        {courseSectionData.map((section, index) => (
          <div
            className="mt-2 cursor-pointer text-sm text-richblack-5"
            onClick={() => {
              setActiveSection(section._id);
            }}
            key={index}
          >
            {/* section */}
            <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
              <div className="w-[70%] font-semibold">{section.name}</div>
              <div className="flex items-center gap-3">
                <span
                  className={`${
                    activeSection === section._id ? "rotate-0" : "rotate-180"
                  } transition-all duration-500`}
                >
                  <BsChevronDown />
                </span>
              </div>
            </div>
            {/* subsection */}

            {activeSection === section._id && (
              <div className="transition-[height] duration-500 ease-in-out">
                {section.subSection?.map((subSection, i) => (
                  <div
                    className={`flex gap-3 px-5 py-2 ${
                      activeSubSection === subSection._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                    }`}
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSection?._id}`
                      );
                      setActiveSubSection(subSection._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures?.includes(subSection._id)}
                      onChange={() => {}}
                    />
                    {subSection.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
