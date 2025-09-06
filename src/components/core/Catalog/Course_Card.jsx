import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";

export default function Course_Card({ course, height = "h-[200px]" }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="bg-richblack-700 border border-richblack-600 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200 shadow-lg flex flex-col text-richblack-25">
        {/* Thumbnail */}
        <div className={`w-full ${height}`}>
          <img
            src={course.thumbnail}
            alt="Course thumbnail"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Course Info */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          {/* Title */}
          <h3 className="text-lg font-semibold text-pure-greys-25 line-clamp-1">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-pure-greys-25 text-sm line-clamp-2 mt-1">
            {course.description}
          </p>

          {/* Instructor */}
          <div className="text-pure-greys-25 text-sm mt-2">
            By {course?.instructor?.fName} {course?.instructor?.lName}
          </div>

          <div className="flex gap-x-3 mt-1">
            <span className="text-yellow-100">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span>({course?.ratingAndReviews?.length} Ratings)</span>
          </div>

          {/* Price */}
          <div className="text-pure-greys-25 font-bold text-base mt-4">
            ₹{course.price}
          </div>
        </div>
      </div>
    </Link>
  );
}
