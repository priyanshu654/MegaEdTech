import React from "react";
import ContactDetails from "../components/core/ContactUs/ContactDetails";
import ContactForm from "../components/core/ContactUs/ContactForm";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/core/Footer/Footer";

export default function Contact() {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div className="p-10">
        {/* Reviws from Other Learner */}
        <div className="flex w-screen justify-center text-richblack-25 mb-7">
          <h1 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
          </h1>
        </div>

        <ReviewSlider />
      </div>
      <Footer />
    </div>
  );
}
