import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination, Navigation } from 'swiper/modules';


import Course_Card from "./Course_Card";


const CourseSlider = ({ Courses ,selectedCategory}) => {

  return (
    
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {Courses.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-pure-greys-300">No Course Found for {selectedCategory}</p>
      )}
    </>
  );
};

export default CourseSlider;
