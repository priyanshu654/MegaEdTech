import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function CodeBlocks({ Codeblock }) {
  return (
    <>
      
        <div className="w-[10%] text-pure-greys-300 font-semibold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div className="text-sm text-pure-greys-50 whitespace-pre font-semibold ">
          <TypeAnimation
            sequence={[Codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            omitDeletionAnimation={true}
          />
        </div>
      
    </>
  );
}
