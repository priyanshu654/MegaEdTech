import React from "react";
import HighlightedText from "../components/core/HomePage/HightlightedText";
import about1 from "../assets/Images/aboutus1.webp";
import about2 from "../assets/Images/aboutus2.webp";
import about3 from "../assets/Images/aboutus3.webp";
import HighlightedYellow from "../components/core/AboutPage/HighletedYellow";
import HighlightedRed from "../components/core/AboutPage/HighletedRed";
import funding from "../assets/Images/FoundingStory.png";
import BodyHeading from "../components/core/AboutPage/BodyHeading";
import Button from "../components/core/HomePage/Button";
import AboutCards from "../components/core/AboutPage/AboutCards";
import Footer from "../components/core/Footer/Footer";
import AboutForm from "../components/core/AboutPage/AboutForm";

export default function About() {
  return (
    <div>
      <div className="w-screen flex flex-col m-auto bg-richblack-700 text-pure-greys-25 items-center ">
        <div className="flex flex-col gap-7 w-[70%]  items-center text-center p-20  ">
          <div className="text-4xl font-bold ml sm:w-[100%]">
            <h1>Driving Innovation in Online Education for a</h1>
            <HighlightedText text={"Brighter Future"} />
          </div>

          <p className="text-pure-greys-200 text-lg font-semibold sm:w-[100%]">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </div>

        <div className="flex gap-10 -mb-28">
          <div>
            <img src={about1} alt="" className="rounded-lg -mb-11" />
          </div>
          <div>
            <img src={about2} alt="" className="rounded-lg" />
          </div>
          <div>
            <img src={about3} alt="" className="rounded-lg" />
          </div>
        </div>
      </div>
      <div className="bg-richblack-900 w-screen flex flex-col items-center">
        <div className="flex flex-col w-[90%] items-center text-center text-4xl font-bold text-pure-greys-25 p-20 mt-36">
          <h1>We are passionate about revolutionizing the way we learn. Our</h1>
          <h1>
            innovative platform{" "}
            <HighlightedText text={" combines technology"} />{" "}
            <HighlightedYellow text={"expertise"} /> and community to create an{" "}
            <HighlightedYellow text={"unparalleled educational experience."} />
          </h1>
        </div>

        <div className="w-screen h-px bg-richblack-500"></div>

        <div className="flex  gap-20 p-32 justify-between w-screen">
          <div className="text-pure-greys-200 w-[60%]  flex flex-col gap-10 ">
            <div className="text-4xl font-bold ">
              <HighlightedRed text={"Our Founding Story"} />
            </div>

            <p className=" font-semibold">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className=" font-semibold">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <div className="w-[50%] ml-40 mt-10">
            <img
              src={funding}
              alt=""
              className="drop-shadow-[10px_10px_10px_rgba(239,68,68,0.8)] rounded-md"
            />
          </div>
        </div>

        <div className="flex w-screen p-32 gap-44 text-center">
          <div className="w-[50%]">
            <BodyHeading
              heading={<HighlightedYellow text={"Our Mission"} />}
              text={
                "With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience."
              }
            />
          </div>
          <div className="w-[50%]">
            {" "}
            <BodyHeading
              heading={<HighlightedText text={"Our Vision"} />}
              text={
                "Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities."
              }
            />
          </div>
        </div>

        <div className="bg-richblack-700 w-screen h-fit flex gap-20 justify-evenly p-7">
          <div className="flex flex-col gap-3 text-pure-greys-300 text-lg items-center">
            <h1 className=" text-3xl text-pure-greys-25 font-bold">5K</h1>
            <p>Active Students</p>
          </div>
          <div className="flex flex-col gap-3 text-pure-greys-300 text-lg items-center">
            <h1 className=" text-3xl text-pure-greys-25 font-bold">10+</h1>
            <p>Mentors</p>
          </div>
          <div className="flex flex-col gap-3 text-pure-greys-300 text-lg items-center">
            <h1 className=" text-3xl text-pure-greys-25 font-bold">200+</h1>
            <p>Courses</p>
          </div>
          <div className="flex flex-col gap-3 text-pure-greys-300 text-lg items-center">
            <h1 className=" text-3xl text-pure-greys-25 font-bold">50+</h1>
            <p>Awards</p>
          </div>
        </div>

        <div className="flex mt-16 p-28">
          <div className="flex flex-col gap-5 items-start">
            <h1 className="text-4xl text-pure-greys-25 font-bold">
              World-Class Learning for <br />{" "}
              <HighlightedText text={"Anyone, Anywhere"} />
            </h1>
            <p className="text-pure-greys-400">
              Studynotion partners with more than 275+ leading universities and
              companies to bring flexible, affordable, job-relevant online
              learning to individuals and organizations worldwide.
            </p>
            <Button active={true} linkto={"/"}>
              Learn More
            </Button>
          </div>
          <div className="flex">
            <AboutCards
              heading={"Curriculum Based on Industry Needs"}
              text={
                "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
              }
              background="bg-richblack-700"
            />
            <AboutCards
              heading={"Our Learning Methods"}
              text={
                "Studynotion partners with more than 275+ leading universities and companies to bring"
              }
              background="bg-richblack-800"
            />
          </div>
        </div>
        <div className="flex -mt-28 -mr-[412px]">
          <AboutCards
            heading={"Certifications"}
            text={
              "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
            }
            background="bg-richblack-700"
          />
          <AboutCards
            heading={"Rating Auto-grading"}
            text={
              "Studynotion partners with more than 275+ leading universities and companies to bring"
            }
            background="bg-richblack-800"
          />
          <AboutCards
            heading={"Ready to Work"}
            text={
              "Studynotion partners with more than 275+ leading universities and companies to bring"
            }
            background="bg-richblack-700"
          />
        </div>

        <div className="mt-20">
          <AboutForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}
