import React from 'react';

export default function AboutCards({ heading, text, background }) {
  return (
    <div className={`flex flex-col gap-5 h-[300px] w-[300px] ${background} p-6 `}>
      <h1 className="text-pure-greys-25 font-bold text-2xl">{heading}</h1>
      <p className="text-pure-greys-400 font-semibold">{text}</p>
    </div>
  );
}
