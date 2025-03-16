import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn , FaHatCowboy  } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0F3D24] text-[#F1F5F9] py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left Section - Logo and Social Media */}
          <div className=" flex flex-col items-start">
            <div className="flex items-center gap-2">
            <div className="hr-icon text-[15px] font-medium  uppercase"> {/* Changed to gray for better contrast */}
                  <i className="fas fa-user-graduate fa-2x"></i>
                </div>
              <h2 className="text-2xl  font-bold">RMHP</h2>
            </div>
            <p className="mt-4 text-[#A8B5A2] text-start">
            Empowering Minds, Transforming Futures – Your Journey to Knowledge Starts Here!
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: FaFacebookF, link: "#" },
                { icon: FaTwitter, link: "#" },
                { icon: FaInstagram, link: "#" },
                { icon: FaLinkedinIn, link: "#" },
              ].map(({ icon: Icon, link }, index) => (
                <Link
                  key={index}
                  to={link}
                  className="p-2 bg-[#124B30] rounded-md transition-all duration-300 hover:bg-amber-500 hover:text-[#0F3D24]"
                >
                  <Icon className="w-5 h-5 " />
                </Link>
              ))}
            </div>
          </div>

          {/* Middle Section - Latest Courses */}
          <div className="text-left">
            <h3 className="text-xl font-bold mb-4 ">Latest Courses</h3>
            <div className="grid grid-cols-2 gap-2 text-[#A8B5A2]">
              {[
                "Computer Engineering",
                "Website Development",
                "Civil Engineering",
                "Civil Engineering",
                "Social Science",
                "Business Studies",
                "Important of English",
                "General Science",
              ].map((course, index) => (
                <p key={index} className="cursor-pointer transition-colors duration-300 hover:text-amber-500">
                  {course}
                </p>
              ))}
            </div>
          </div>

          {/* Right Section - Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-start ">Newsletter</h3>
            <p className="text-[#A8B5A2] mb-4 text-start">
              Subscribe to our newsletter to get more updates and join our course information.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="p-3 w-full rounded-l-md bg-[#124B30] text-[#F1F5F9] outline-none placeholder-[#A8B5A2] "
              />
              <button className="p-3 bg-amber-500 text-[#0F3D24] rounded-r-md transition-all duration-300 hover:bg-amber-600 hover:text-[#F1F5F9]">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#124B30] mt-6 pt-4 text-center text-[#A8B5A2]">
          © RMHP - Education WordPress Theme. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}