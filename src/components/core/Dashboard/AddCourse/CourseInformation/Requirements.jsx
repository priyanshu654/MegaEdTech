import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Requirements({
  label,
  name,
  errors,
  setValue,
  register,
  placeholder,
}) {
  const [instructionsArray, setInstructionsArray] = useState([]);
  const [inputvalue, setInputValue] = useState("");
  const { course, editMode } = useSelector((state) => state.course);

  useEffect(() => {
    if (editMode && course?.Instructions) {
      setInstructionsArray(course.Instructions);
    }
    register(name, { required: true, validate: (value) =>  Array.isArray(value) && value.length > 0 });
  }, [register]);

  useEffect(() => {
    setValue(name, instructionsArray);
  }, [instructionsArray]);

  const handelClick = (e) => {
    if (inputvalue) {
      const newInputvalue = inputvalue.trim();
      setInstructionsArray([...instructionsArray, newInputvalue]);
      setInputValue("");
    }
  };

  const handelDelete = (index) => {
    const newInstructions = instructionsArray.filter(
      (_, Arr_index) => Arr_index !== index
    );
    setInstructionsArray(newInstructions);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3">
        <label htmlFor={name} className="text-pure-greys-25">
          {label}
          <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          className="form-style"
          value={inputvalue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          type="button"
          className="bg-yellow-100 w-fit h-fit p-2 rounded-md texy-black font-semibold"
          onClick={handelClick}
        >
          Add
        </button>
      </div>
      {instructionsArray.length > 0 && (
        <div className="text-pure-greys-25 flex flex-col gap-2 mt-3">
          {instructionsArray.map((el, index) => (
            <div key={index}>
              {el}
              <button
                type="button"
                className="ml-5 text-pure-greys-700 bg-richblack-200 rounded-md"
                onClick={() => handelDelete(index)}
              >
                clear
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
