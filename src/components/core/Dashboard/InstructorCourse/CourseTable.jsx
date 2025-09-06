import React, { useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { HiClock } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { COURSE_STATUS } from "../../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import ConfirmationModal from "../../../common/ConfermationModal";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseApi";

export default function CourseTable({ courses, setCourses }) {
  const TRUNCATE_LENGTH = 30;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-richblack-800">
      <Table className="min-w-full divide-y divide-richblack-700">
        <Thead>
          <Tr className="bg-richblack-800 text-left text-sm text-richblack-100 uppercase">
            <Th className="px-6 py-3">Course</Th>
            <Th className="px-6 py-3">Duration</Th>
            <Th className="px-6 py-3">Price</Th>
            <Th className="px-6 py-3"></Th> {/* empty to hold icon buttons only */}
          </Tr>
        </Thead>
        <Tbody className="divide-y divide-richblack-700">
  {courses.length === 0 ? (
    <Tr>
      <Td colSpan={4} className="text-center py-10 text-lg text-richblack-100">
        No Courses Found
      </Td>
    </Tr>
  ) : (
    courses.map((course) => (
      <Tr
        key={course._id}
        className="even:bg-richblack-900 hover:bg-richblack-800 transition-all duration-150"
      >
        {/* Course Info */}
        <Td className="px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-[120px] w-[200px] rounded-lg object-cover"
            />
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold text-richblack-5">
                {course.title}
              </p>
              <p className="text-sm text-richblack-300">
                {course.description.split(" ").length > TRUNCATE_LENGTH
                  ? course.description
                      .split(" ")
                      .slice(0, TRUNCATE_LENGTH)
                      .join(" ") + "..."
                  : course.description}
              </p>
              <p className="text-xs text-white">
                {new Date(course.createdAt).toLocaleDateString()}
              </p>
              <div>
                {course.status === COURSE_STATUS.DRAFT ? (
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-richblack-700 px-3 py-1 text-xs font-medium text-pink-100">
                    <HiClock size={14} />
                    Drafted
                  </span>
                ) : (
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-richblack-700 px-3 py-1 text-xs font-medium text-yellow-100">
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                      <FaCheck size={8} />
                    </span>
                    Published
                  </span>
                )}
              </div>
            </div>
          </div>
        </Td>

        {/* Duration */}
        <Td className="px-6 py-4 text-sm text-richblack-100">
          2hr 30min {/* Replace with dynamic value if available */}
        </Td>

        {/* Price */}
        <Td className="px-6 py-4 text-sm text-richblack-100">
          ₹{course.price}
        </Td>

        {/* Actions */}
        <Td className="px-6 py-4 text-sm text-richblack-100">
          <div className="flex gap-4 items-center">
            <button
              disabled={loading}
              onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
              title="Edit"
              className="transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
            >
              <FiEdit2 size={20} />
            </button>
            <button
              disabled={loading}
              onClick={() =>
                setConfirmationModal({
                  text1: "Do you want to delete this course?",
                  text2: "All the data related to this course will be deleted",
                  btn1Text: !loading ? "Delete" : "Loading...",
                  btn2Text: "Cancel",
                  btn1Handler: !loading
                    ? () => handleCourseDelete(course._id)
                    : () => {},
                  btn2Handler: !loading
                    ? () => setConfirmationModal(null)
                    : () => {},
                })
              }
              title="Delete"
              className="transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
            >
              <RiDeleteBin6Line size={20} />
            </button>
          </div>
        </Td>
      </Tr>
    ))
  )}
</Tbody>

      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
