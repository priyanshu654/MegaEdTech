import React from "react";
import Button from "./Button";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function BodyHeading({heading,subheading,button1 ,button2 }) {
  return (
    <div>
      <div className="mt-20 mx-24">
        <h1 className="text-white text-4xl font-bold">
          {heading}
        </h1>
        <div className="mt-9 font-semibold text-lg text-pure-greys-200">
          <p>
            {subheading}
          </p>
        </div>
        <div className="flex gap-10 mt-9">
          <Button linkto={button1.linkto} active={button1.active}>
            {" "}
            <p className="flex items-center gap-2">
              {button1.btntext} <FaLongArrowAltRight />
              
            </p>{" "}
          </Button>
          <Button linkto={button2.linkto} active={button2.active}>
            {button2.btntext}
          </Button>
        </div>
      </div>
    </div>
  );
}
