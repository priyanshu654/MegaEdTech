import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Upload from "../Upload";
import IconBtn from "../../../../common/IconBtn";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseApi";
import { setCourse } from "../../../../../slices/courseSlice";

export default function SubSectionViewModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //console.log(view);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // Pre-fill form for edit/view
  useEffect(() => {
    if ((view || edit) && modalData) {
      setValue("title", modalData.title);
      setValue("description", modalData.description);
      setValue("video", modalData.videoUrl);
      // Upload component handles video data
    }
  }, [view, edit, modalData, setValue]);

  const isFormUpdated = () => {
    const currentValue = getValues();

    if (
      currentValue.title !== modalData.title ||
      currentValue.description !== modalData.description ||
      currentValue.video instanceof File
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Form submit handler
  const onSubmit = async (data) => {
    setLoading(true);
    console.log("model data hai", modalData);

    try {
      let result;
      if (edit) {
        console.log("Editing lecture:", data);
        if (isFormUpdated()) {
          const currentValue = getValues();
          const formData = new FormData();

          formData.append("subSectionId", modalData._id);
          formData.append("sectionId", modalData.sectionId);
          //formData.append("video",modalData.videoUrl);

          if (currentValue.title !== modalData.title) {
            formData.append("title", data.title);
          }
          if (currentValue.description !== modalData.description) {
            formData.append("description");
          }
          if (data.video instanceof File) {
            formData.append("video", data.video);
          }

          result = await updateSubSection(formData, token);
          console.log("result", result);
        }
        // Add API call here
      }
      if (add) {
        console.log("Adding lecture:", data);
        // Edit API call here
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("video", data.video);
        formData.append("sectionId", modalData);

        result = await createSubSection(formData, token);
        //console.log("Result hai", result);
      }
      if (result) {
        dispatch(setCourse(result));
      }
      setLoading(false);
      setModalData(null); // close modal
    } catch (error) {
      console.error("Submission error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-[650px] max-w-[800px] max-h-[90vh] overflow-y-auto rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-richblack-5">
            {view && "Viewing"} {edit && "Editing"} {add && "Adding"} Lecture
          </h2>
          <button
            onClick={() => setModalData(null)}
            className="text-richblack-100 text-2xl"
          >
            <IoClose />
          </button>
        </div>

        {/* Body */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Upload
              register={register}
              label={"Lecture Video"}
              name={"video"}
              setValue={setValue}
              errors={errors}
              video={true}
              //upload me hm view data ya edit data hm es lea bhej rhe hai taaki hm wha par show kar sake phle se upload wale me ki yeah data hai phle se
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />

            <div>
              <label htmlFor="title">Lecture Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter lecture title"
                {...register("title", { required: true })}
                className="form-style w-full"
                disabled={view}
              />
              {errors.title && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Lecture title is required
                </span>
              )}
            </div>

            <div>
              <label htmlFor="description">Lecture Description</label>
              <textarea
                id="description"
                placeholder="Enter lecture description"
                {...register("description", { required: true })}
                className="form-style w-full resize-none min-h-[100px]"
                disabled={view}
              />
              {errors.description && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Lecture description is required
                </span>
              )}
            </div>

            {!view && (
              <div className="mt-4">
                <IconBtn
                  type="submit"
                  text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                  disabled={loading}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
