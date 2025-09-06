import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import whiteLogo from "../../../assets/Logo/Logo-Full-Light.png";

export default function Footer() {
  return (
    <footer className="w-full bg-richblack-800 text-pure-greys-200 px-6 py-10">
      {/* Top Section */}
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <img src={whiteLogo} alt="logo" className="w-40" />

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
          <Link to="/about" className="hover:text-yellow-50 transition">
            About
          </Link>
          <Link to="/blog" className="hover:text-yellow-50 transition">
            Blog
          </Link>
          <Link to="/projects" className="hover:text-yellow-50 transition">
            Projects
          </Link>
          <Link to="/help" className="hover:text-yellow-50 transition">
            Help Center
          </Link>
          <Link to="/privacy" className="hover:text-yellow-50 transition">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-yellow-50 transition">
            Terms
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-xl mt-2">
          <a
            href="https://github.com/priyanshu654"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-50 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/priyanshuraj10/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-50 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://x.com/Priyans25198743"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-50 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/priyanshu_.raaz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-50 transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="w-10/12 mx-auto h-px bg-richblack-600 my-6"></div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-pure-greys-300">
        Made with ❤️ Priyanshu Raj © 2025 Studynotion
      </div>
    </footer>
  );
}
