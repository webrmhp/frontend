import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footur from "../components/footur";
import Header from "../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import coverImage1 from "../assets/image/cover.jpg"; 
import coverImage2 from "../assets/image/cover2.webp";
import coverImage3 from "../assets/image/cover3.jpg";
import videodm from "../assets/image/videodm.mp4";
import { Link } from "react-router-dom";


const Counter = ({ target, title }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 5000; 
    const increment = target / (duration / 16);

    let start = 0;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.div
      className="bg-green-50 shadow-md rounded-lg p-4 hover:scale-105 transition-transform"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
        {count.toLocaleString()}+
      </h2>
      <p className="text-gray-600 text-sm sm:text-base">{title}</p>
    </motion.div>
  );
};

const AboutUs = () => {
  const navigate = useNavigate();

  // Function to scroll to the next section
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("why-choose-us");
    nextSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-[350px] sm:h-[350px] md:h-[400px] lg:h-[550px]"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <img
                src={coverImage1}
                alt="Cover 1"
                className="w-full h-full object-cover opacity-100"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
          </SwiperSlide>
          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <img
                src={coverImage2}
                alt="Cover 2"
                className="w-full h-full object-cover opacity-100"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
          </SwiperSlide>
          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <img
                src={coverImage3}
                alt="Cover 3"
                className="w-full h-full object-cover opacity-100"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 sm:px-8 w-full max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-4">
            Roshan Mustaqbil Hunarmand Program
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-cyan-200 font-sans leading-relaxed mb-8">
            The Roshan Mustaqbil Hunarmand Program is vital for Pakistan as it bridges the digital skills gap, empowers youth with employable IT skills, and fosters entrepreneurship.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link to="/course">
            <button 
              className="bg-green-500 text-white px-8 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              Our Courses
            </button></Link>
            <button
              onClick={scrollToNextSection}
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </motion.div>
      <motion.div
        id="why-choose-us"
        className="text-center font-sans mt-12 mb-8 px-4 sm:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800">
          Why Roshan Mustaqbil Hunarmand Program!
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Points List */}
          <div className="px-4 sm:px-6 lg:px-12">
            {[
              "Affordable IT Training",
              "Practical, Industry-Relevant Curriculum",
              "Focus on Entrepreneurship",
              "Inclusive and Equal Opportunities",
              "Contribution to National Development",
              "Personal and Professional Growth",
              "Global Opportunities",
              "Commitment to Innovation",
              "Students for International Certifications",
            ].map((point, idx) => (
              <motion.div
                key={idx}
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center bg-green-600 text-white w-8 h-8 mr-3 rounded-full">
                  <i className="fas fa-check text-sm"></i>
                </div>
                <p className="text-gray-700 mt-3 text-sm sm:text-base">{point}</p>
              </motion.div>
            ))}
          </div>

          {/* Video */}
          <div className="px-4 sm:px-6 lg:px-12">
            <video
              controls
              src={videodm}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="text-center font-sans mt-12 mb-20 px-4 sm:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-800 mb-4">
          Vision and Mission
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Our mission is to empower individuals in Pakistan with affordable, high-quality IT
          training that bridges the digital skills gap, fosters innovation, and drives socio-economic
          growth. Our vision is to become Pakistan’s leading platform for inclusive and transformative
          IT education, nurturing a skilled workforce that propels the country into a globally competitive,
          tech-driven economy.
        </p>
      </motion.div>

      {/* Counters Section */}
      <motion.div
        className="grid grid-cols-2 mb-10 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 text-center px-4 sm:px-8 lg:px-24 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[
          { title: "Seats Available", value: 118276 },
          { title: "Enrolled Students", value: 17000 },
          { title: "Available Courses", value: 20 },
          { title: "No. of Alumni", value: 9000 },
          { title: "Industrial Trainers", value: 26 },
        ].map((counter, index) => (
          <Counter key={index} target={counter.value} title={counter.title} />
        ))}
      </motion.div>
      <div className="mt-auto">
        <Footur />
      </div>
    </div>
  );
};

export default AboutUs;