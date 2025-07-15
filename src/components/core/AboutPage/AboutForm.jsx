import React from "react";
import Button from "../HomePage/Button";
import countryCode from "../../../data/countrycode.json"

export default function GetInTouchForm() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 text-pure-greys-25 rounded-lg shadow-lg">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-4xl font-semibold  text-center">Get in Touch</h2>
        <p className="text-pure-greys-300">
          We'd love to here for you, Please fill out this form.
        </p>
      </div>

      <form className="flex flex-col gap-6 mt-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="">
              FirstName
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              className="w-full p-3 rounded-xl bg-richblack-700  placeholder:text-pure-greys-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName">LastName</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              className="w-full p-3 rounded-xl bg-richblack-700  placeholder:text-pure-greys-300 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-xl bg-richblack-700 placeholder:text-pure-greys-300 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" >
            Phone Number
          </label>
          <div className="flex gap-2">
            {/* Country Code Dropdown */}
            <select
              name="countryCode"
              id="countryCode"
              className=" rounded-xl bg-richblack-700  focus:outline-none w-16"
            >
              {
                countryCode.map((el,index)=><option key={index} value={el.code}>{`${el.code}-${el.country}`}</option>)
              }
              
            </select>

            {/* Phone Number Field */}
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              className="w-full p-3 rounded-lg bg-richblack-700  placeholder:text-pure-greys-300 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="msg">Message</label>
          <textarea
            rows={4}
            id="msg"
            placeholder="Your Message"
            className="w-full p-3 rounded-xl bg-richblack-700  placeholder:text-pure-greys-300 focus:outline-none resize-none custom-scroll"
          />
        </div>

        <div className="w-4xl">
            <Button active={true} fullwidth={true}>Send Message </Button>
        </div>        
      </form>
    </div>
  );
}
