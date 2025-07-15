import React from "react";
import { FooterLink2 } from "../../../data/footer-links";
import whiteLogo from "../../../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";
import FooterSection from "./FooterSection";

export default function Footer() {
  //console.log(FooterLink2);

  return (
    <div className="w-screen bg-richblack-800  text-pure-greys-200 p-16 ">
      <div className=" flex gap-x-32 text">
        <div className="flex flex-row gap-16">
          <div className="flex flex-col gap-3 ">
            <img src={whiteLogo} alt="" />
            <h1 className="text-pure-greys-50 font-semibold text-xl">
              Company
            </h1>
            <Link to={"/about"}>
              <p>About</p>
            </Link>
            <Link>
              <p>Careers</p>
            </Link>
            <Link>
              <p>Affliates</p>
            </Link>
            {/* to add images */}
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h1 className="text-pure-greys-50 font-semibold text-xl">
                Resources
              </h1>
              <Link>
                <p>Articles</p>
              </Link>
              <Link>
                <p>Blog</p>
              </Link>
              <Link>
                <p>Chart Sheet</p>
              </Link>
              <Link>
                <p>Code challenges</p>
              </Link>
              <Link>
                <p>Docs</p>
              </Link>
              <Link>
                <p>Projects</p>
              </Link>
              <Link>
                <p>Videos</p>
              </Link>
              <Link>
                <p>Workspaces</p>
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-pure-greys-50 font-semibold text-xl">
                Support
              </h1>
              <Link>
                <p>Help Center</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h1 className="text-pure-greys-50 font-semibold text-xl">
                Plans
              </h1>
              <Link>
                <p>Paid membership</p>
              </Link>
              <Link>
                <p>For Students</p>
              </Link>
              <Link>
                <p>Business solutions</p>
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-pure-greys-50 font-semibold text-xl">
                Comunity
              </h1>
              <Link>
                <p>Forums</p>
              </Link>
              <Link>
                <p>Chapter</p>
              </Link>
              <Link>
                <p>Events</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-px h-screen bg-richblack-500"></div>

        <div className="flex gap-16">
          {FooterLink2.map((el, index) => {
            return <FooterSection key={index} el={el} />;
          })}
        </div>
      </div>

      <div>
        <div className="w-11/12 h-px bg-richblack-500 mt-16 ml-16"></div>
      </div>
      <div className="mt-20 ml-20 flex justify-between">
          <div className="flex gap-6">
            <div className="hover:text-pure-greys-25 transition-all duration-200">
                <Link>Privacy Policy</Link>
            </div>
            <div className="w-px h-10px bg-richblack-500"></div>
            <div className="hover:text-pure-greys-25 transition-all duration-200">
                <Link>Cookie Policy</Link>
            </div>
            <div className="w-px h-10px bg-richblack-500"></div>
            <div className="hover:text-pure-greys-25 transition-all duration-200">
                <Link>Terms</Link>
            </div>
          </div>

          <div className="mr-14">
            Made with ❤️ Priyanshu Raj © 2025 Studynotion
          </div>
      </div>
    </div>
  );
}
