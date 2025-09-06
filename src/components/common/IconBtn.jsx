import React from "react";

export default function IconBtn({
  onClick,
  children,
  disabled,
  outline = false,
  type,
  text,
  customClass,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClass}`}
    >
        {children?(
            <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
            </>
        ):(text)}
    </button>
  );
}
