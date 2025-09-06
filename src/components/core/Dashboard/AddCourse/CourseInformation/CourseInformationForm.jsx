import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import getAllCategory from "../../../../../services/operations/categoryApi";
import CreateTags from "./CreateTags";
import Upload from "../Upload";
import { useDispatch, useSelector } from "react-redux";
import Requirements from "./Requirements";
import {
  addCourseDetails,
  editCourseDetails,
} from "../../../../../services/operations/courseApi";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { MdNavigateNext } from "react-icons/md";
import IconBtn from "../../../../common/IconBtn";

export default function CourseInformationForm() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { course, editMode ,step} = useSelector((state) => state.course);
  
  
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function getCategory() {
      setLoading(true);
      const response = await getAllCategory();
      
        setCategories(response.data.data);
      

      setLoading(false);
    }
    getCategory();
    //edit mode hoga to form me course ka value set kar denge or usko edit karenge
    if (editMode) {
      setValue("title", course?.title);
      setValue("description", course?.description);
      setValue("whatYouWillLearn", course?.whatYouWillLearn);
      setValue("price", course?.price);
      setValue("tag", course?.tag);
      setValue("thumbnail", course?.thumbnail);
      setValue("category", course?.category);
      setValue("instructions", course?.instructions);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.title !== course.title ||
      currentValues.description !== course.description ||
      currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
      currentValues.price !== course.price ||
      currentValues.tag !== course.tag ||
      currentValues.thumbnail !== course.thumbnail ||
      currentValues.category !== course.category ||
      currentValues.instructions !== course.instructions
    ) {
      return true;
    } else {
      return false;
    }
  };

  //console.log(categories);
  console.log(course,step);

  const onSubmit = async (data) => {
    //console.log("form data", data);
    //agr edit mode hai to check karenge ki form update huaa hai ki nhi or agr huaa hoga to check karenge ki kis field me huaa hai
    if (editMode) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        console.log("Editing form data",formData);
        
        if (currentValues.title !== course.title) {
          formData.append("title", data.title);
        }
        if (currentValues.description !== course.description) {
          formData.append("description", data.description);
        }
        if (currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.whatYouWillLearn);
        }
        if (currentValues.price !== course.price) {
          formData.append("price", data.price);
        }
        if (currentValues.tag !== course.tag) {
          formData.append("tag", JSON.stringify(data.tag));
        }
        if (currentValues.category !== course.category) {
          formData.append("category", data.category);
        }
        if (currentValues.instructions !== course.instructions) {
          formData.append("instructions", JSON.stringify(data.instructions));
        }
        if (currentValues.thumbnail !== course.thumbnail) {
          formData.append("thumbnail", data.thumbnail);
        }
        formData.append("courseId",course._id);
        setLoading(true);
        const response = await editCourseDetails(formData, token);
        setLoading(false);
        dispatch(setCourse(response));
        dispatch(setStep(2));
      }
    } else {
      const formData = new FormData();
      console.log(" adding Form data",formData);
      
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("whatYouWillLearn", data.whatYouWillLearn);
      formData.append("thumbnail", data.thumbnail);
      formData.append("tag", data.tag);
      formData.append("instructions", data.instructions);
      formData.append("category", data.category);

      setLoading(true);
      const response = await addCourseDetails(formData, token);
      
        dispatch(setCourse(response));
        dispatch(setStep(2));
        
        
      
      setLoading(false);
    }
  };
  
  return (
    <form
      className="bg-richblack-800 space-y-8 rounded-md border-[1px] p-6 mt-4 -ml-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-3">
        <label htmlFor="title" className="text-pure-greys-25">
          Course Title<sup className="text-pink-200">*</sup>
        </label>
        <input
          id="title"
          name="title"
          placeholder="Enter course title"
          {...register("title", { required: true })}
          className="form-style w-full"
        />
        {errors.title && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="description" className="text-pure-greys-25">
          Course Description<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter course description"
          {...register("description", { required: true })}
          className=" form-style w-full h-[150px]"
        />
        {errors.description && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course description is required
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 relative">
        <label htmlFor="price" className="text-pure-greys-25">
          Course Price<sup className="text-pink-200">*</sup>
        </label>
        <input
          id="price"
          name="price"
          placeholder="Enter course price"
          {...register("price", { required: true, valueAsNumber: true })}
          className="form-style w-full px-12"
        />
        <HiOutlineCurrencyRupee
          className="absolute text-pure-greys-400 top-12 left-2"
          size={30}
        />
        {errors.price && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course price is required
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="category" className="text-pure-greys-25">
          Course Category<sup className="text-pink-200">*</sup>
        </label>
        <select
          name="category"
          id="category"
          className="form-style"
          {...register("category", { required: true })}
        >
          <option value="">Choose a category</option>
          {!loading &&
            categories.map((el) => (
              <option value={el._id} key={el._id}>
                {el.name}
              </option>
            ))}
        </select>
        {errors.category && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Please choose category
          </span>
        )}
      </div>
      <CreateTags
        name="tag"
        setValue={setValue}
        getValues={getValues}
        register={register}
        label="Tags"
        placeholder="Please enter the tags"
        errors={errors}
      />
      <Upload
        name="thumbnail"
        register={register}
        setValue={setValue}
        label="Course Thumbnail"
        errors={errors}
        editData={editMode ? course?.thumbnail : null}
      />
      <div className="flex flex-col gap-3">
        <label htmlFor="whatYouWillLearn" className="text-pure-greys-25">
          Benifits of course<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="whatYouWillLearn"
          name="whatYouWillLearn"
          placeholder="Enter benifits of course"
          {...register("whatYouWillLearn", { required: true })}
          className="form-style w-full h-[150px]"
        />
        {errors.whatYouWillLearn && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course benifits are required
          </span>
        )}
      </div>

      <Requirements
        label="Requirements/Instructions"
        name="instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        placeholder="prerequisites of course"
      />

      <div className={`flex justify-end gap-x-2`}>
        {editMode && (
          <button
            onClick={() => {
              dispatch(setStep(2));
            }}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue without saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editMode ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}
