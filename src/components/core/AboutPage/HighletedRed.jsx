


export default function HighlightedRed({ text }) {
  return (
    <span className={` bg-gradient-to-r from-pink-300 to-pink-800 bg-clip-text text-transparent`}>
      {" "}
      {text}

      
    </span>
  );
}
