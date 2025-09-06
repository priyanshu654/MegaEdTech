import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MdAddCircleOutline } from "react-icons/md";
import { BiRightArrow } from "react-icons/bi";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseApi";
import {
  setCourse,
  setEditMode,
  setStep,
} from "../../../../../slices/courseSlice";
import NestedSection from "./NestedSection";
import IconBtn from "../../../../common/IconBtn";
import toast from "react-hot-toast";

export default function CourseBuilder() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [sectionEdit, setSectionEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  console.log("course hai", course);

  const onSubmit = async (data) => {
    let result;
    setLoading(true);
    console.log("form data",data);
    
    if (sectionEdit) {
      const payload = {
        name: data.name,
        courseId: course._id,
        sectionId: sectionEdit,
      };
      result = await updateSection(payload, token);
    } else {
      const payload = {
        name: data.name,
        courseId: course._id,
      };
      result = await createSection(payload, token);
    }
    console.log("yeah hai result",result);
    

    if (result) {
      dispatch(setCourse(result));
      setValue("name", "");
      setSectionEdit(null);
    }
    setLoading(false);
  };
  const cancelEdit = () => {
    setSectionEdit(null);
    setValue("name", "");
  };

  const toggleEdit = (sectionId, name ) => {
    console.log("id and name",sectionId,name);
    
    //eska mtlb ki phle se hi sectionedit me value pda hai mtlb ki editing true hai to hm use cancelEdit call kr k null mark kar denge
    if (sectionEdit === sectionId) {
      cancelEdit();
      return;
    }

    setSectionEdit(sectionId);
    setValue("name", name);
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditMode(true));
  };

  const goToNext = () => {
    console.log("Call aaya");
    
    if (course.content.length === 0) {
      toast.error("Please add section to move forther");
      return;
    }
    if (
      course.content.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }

    dispatch(setStep(3));
  };

  return (
    <div>
      <div className="flex flex-col text-pure-greys-25 w-full h-full bg-richblack-800 border-[1px] border-pure-greys-200 rounded-md p-5 gap-7">
        <h1 className="text-3xl font-bold">Course Builder</h1>
        <div>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="name">
              Section name <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter section name"
              {...register("name", { required: true })}
              className="w-full form-style"
            />
            {errors.name && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Section name is required
              </span>
            )}

            <div className="flex gap-5">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1 border-yellow-50 border-[1px] w-fit rounded-md p-2"
              >
                {!sectionEdit ? "Create Section" : "Edit Section Name"}{" "}
                <MdAddCircleOutline className="text-yellow-50" />
              </button>

              {sectionEdit && (
                <button
                  type="button"
                  className="text-pure-greys-25  border-yellow-50 border-[1px] w-fit rounded-md p-2"
                  onClick={cancelEdit}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
          {course?.content?.length > 0 && (
            <NestedSection toggleEdit={toggleEdit} />
          )}

          <div className="flex justify-end gap-x-3 mt-10">
            <button
              onClick={goBack}
              className="rounded-md cursor-pointer flex items-center bg-richblack-700 w-fit p-3 "
            >
              Back
            </button>
            <IconBtn text="Next" onClick={goToNext}>
              <BiRightArrow />
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
