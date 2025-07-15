import { Link } from 'react-router-dom'

export default function Button({ children, linkto, active,fullwidth=false }) {
  return (
    <div className={`flex justify-center items-center `}>
      <Link to={linkto} className={`${fullwidth ? "block w-full" : "inline-block"}`}>
        <div
          className={`px-5 py-3 rounded-md font-bold transition-all duration-200  text-center
          ${active ? 'bg-yellow-50 hover:scale-105 text-black' : 'bg-richblack-700 hover:scale-105 text-white'} ${fullwidth ? "w-full" : "w-fit"}`}
        >
          {children}
        </div>
      </Link>
    </div>
  )
}
