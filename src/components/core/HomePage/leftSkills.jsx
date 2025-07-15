import React from "react";

export default function LeftSkills({logo,heading,description}) {
  return (
    <div className="flex gap-8 items-center">
      <img src={logo} alt="" />
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-pure-greys-800">Leadership</h1>
        <p className="text-pure-greys-600">Fully committed to the success company</p>
      </div>
    </div>
  );
}
