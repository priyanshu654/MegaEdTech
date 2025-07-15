import React from "react";
import styles from './Card.module.css';
export default function Cards({ el, handleCard, curretCard }) {
  //console.log("el hai", el);

  //in javascript object===object is false even if same data is there so we neet to stringify to find weter it is equal or not

  return (
    <div
      className={`h-[300px] w-[350px]   text-pure-greys-25 p-9 cursor-pointer -mb-20 sm:flex-row ${
        JSON.stringify(curretCard) === JSON.stringify(el)
          ?`bg-white text-richblack-900 scale-110 transition-all duration-200 ${styles.active}`
          : " bg-richblack-800 text-pure-greys-25"
      }`}
      onClick={() => {
        handleCard(el);
      }}
    >
      {/* //<div className="h-full w-full bg-yellow-25 relative z-0"></div> */}
      <div className="flex flex-col gap-4 z-10">
        <h1 className="font-bold text-2xl max-w">{el.heading}</h1>
        <div className="text-pure-greys-200 leading-relaxed">
          <p>{el.description}</p>
        </div>
        <div className="">
          <hr
            className="w-full border-t border-gray-400"
            style={{
              borderStyle: "dotted",
              borderWidth: "2px",
              borderSpacing: "5px",
            }}
          />
        </div>
        <div className="flex justify-between items-end ">
            <div>
                {el.level}
            </div>
            <div>
                {el.lessionNumber}
            </div>
        </div>
      </div>
    </div>
  );
}
