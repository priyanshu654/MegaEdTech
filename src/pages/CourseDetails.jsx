import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { buyCourse } from "../services/operations/studentsFeatures";
import { getFullDetailsOfCourse } from "../services/operations/courseApi";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import ConfirmationModal from "../components/common/ConfermationModal";
import Footer from "../components/core/Footer/Footer";
import RatingStars from "../components/common/RatingStars";
import ReactMarkdown from "react-markdown";
import {formattedDate} from "../utils/formatDate"
import CourseAccordionBar from "../components/core/Course/CourseAccodion";

export default function CourseDetails() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const { loading } = useSelector((state) => state.profile);

  const [course, setCourse] = useState({});
  const [modalsData, setModalsData] = useState(null);
  const [isActive, setIsActive] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getFullDetailsOfCourse(courseId, token);
      setCourse(response);
    })();
  }, [courseId,token]);

  const handleBuyCourse = async () => {
    if (token) {
      await buyCourse(token, [courseId], user, navigate, dispatch);
    } else {
      setModalsData({
        text1: "You are not logged in!",
        text2: "Please login to Purchase Course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setModalsData(null),
      });
    }
  };

  const {
    
    title = "",
    description = "",
    thumbnail = "",
    createdAt = "",
    price = 0,
    whatYouWillLearn = "",
    studentsEnrolled = [],
    content = [],
    instructor = {},
    ratingAndReviews = [],
    avgRating = 0,
  } = course;

  const totalNoOfLectures = content?.reduce(
    (acc, section) => acc + section?.subSection?.length || 0,
    0
  );

  const handleActive = (id) => {
    setIsActive((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
    );
  };

  if (loading || !course) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full bg-richblack-800">
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px]">
          <div className="grid min-h-[450px] max-w-maxContentTab py-8 lg:py-0 xl:max-w-[810px]">
            {/* Thumbnail (Mobile) */}
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]" />
              <img src={thumbnail} alt="course thumbnail" className="w-full aspect-auto" />
            </div>

            {/* Course Info */}
            <div className="z-30 my-5 flex flex-col gap-4 py-5 text-lg text-richblack-5">
              <h1 className="text-4xl font-bold sm:text-[42px]">{title}</h1>
              <p className="text-richblack-200">{description}</p>

              {/* Ratings */}
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgRating.toFixed(1)}</span>
                <RatingStars Review_Count={avgRating} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>

              {/* Instructor and Meta Info */}
              <div>
                <p>Created By {`${instructor.fName} ${instructor.lName}`}</p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formattedDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>

            {/* Mobile Buy Section */}
            <div className="flex w-full flex-col gap-4 border-y border-richblack-500 py-4 lg:hidden">
              <p className="pb-4 text-3xl font-semibold text-richblack-5">Rs. {price}</p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>

          {/* Course Card (Desktop) */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 lg:absolute lg:block">
            <CourseDetailsCard
              course={course}
              setConfirmationModal={setModalsData}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      {/* Course Body */}
      <div className="-ml-20 box-content px-4 text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab xl:max-w-[810px]">
          {/* What you'll learn */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          {/* Course Content */}
          <div>
            <p className="text-[28px] font-semibold">Course Content</p>
            <div className="flex flex-wrap justify-between gap-2">
              <div className="flex gap-2">
                <span>{content.length} section(s)</span>
                <span>{totalNoOfLectures} lecture(s)</span>
              </div>
              <button className="text-yellow-25" onClick={() => setIsActive([])}>
                Collapse all
              </button>
            </div>

            <div className="py-4">
              {content.map((section, index) => (
                <CourseAccordionBar
                  key={index}
                  course={section}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>
          </div>

          {/* Author Info */}
          <div className="mb-12 py-4">
            <p className="text-[28px] font-semibold">Author</p>
            <div className="flex items-center gap-4 py-4">
              <img
                src={
                  instructor.image ||
                  `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.fName} ${instructor.lName}`
                }
                alt="Author"
                className="h-14 w-14 rounded-full object-cover"
              />
              <p className="text-lg">{`${instructor.fName} ${instructor.lName}`}</p>
            </div>
            <p className="text-richblack-50">{instructor?.additionalInfo?.about}</p>
          </div>
        </div>
      </div>

      <Footer />
      {modalsData && <ConfirmationModal modalData={modalsData} />}
    </>
  );
}
