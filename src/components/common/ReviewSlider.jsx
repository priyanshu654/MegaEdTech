import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactStars from "react-rating-stars-component";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { FreeMode } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { apiConnector } from "../../services/apiConnector";
import { courseEndpoints } from "../../services/api";


export default function ReviewSlider() {
  const { GET_ALL_REVIEWS } = courseEndpoints;
  const [reviews, setReviews] = useState([]);
  const truncateWords = 7

  useEffect(() => {
    async function getReviews() {
      const response = await apiConnector("GET", GET_ALL_REVIEWS, null, null);
      console.log("Reviews", response);
      if (response) {
        setReviews(response.data.data);
      }
    }
    getReviews();
  }, []);
  return (
    <div className="text-white">
      <Swiper
        spaceBetween={25}
        slidesPerView={4}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="w-full "
      >
        {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.profilePic
                          ? review?.user?.profilePic
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.fName} ${review?.user?.lName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.fName} ${review?.user?.lName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.title}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.reviews.split(" ").length > truncateWords
                      ? `${review?.reviews
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.reviews}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  );
}
