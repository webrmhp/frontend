import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import Footur from '../components/footur';
import Header from '../components/Header';
import coverImage from '../assets/image/cover.png';
import videodm from '../assets/image/videodm.mp4'
import netflix from '../../src/assets/image/netflix.jpg'

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Cover Section */}
      <motion.div
        className="relative w-full "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image */}
        <img
          src={coverImage}
          alt="Cover"
          className="w-[200%] h-[450px] object-cover sm:h-[300px] md:h-[400px] lg:h-[450px]"
        />

        {/* Overlay Description */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4 sm:px-8"
          style={{
            fontFamily: 'Inter',
            fontSize: '17px',
            lineHeight: '1.5',
          }}
        >
          <span>
            The Roshan Mustaqbil Hunarmand Program is vital for Pakistan as it bridges the digital skills gap, empowers youth with employable IT skills, and fosters entrepreneurship. By creating a tech-savvy workforce, it boosts economic growth, reduces unemployment, and strengthens Pakistan's global IT presence. The program also aligns with Vision 2025, promotes women’s empowerment, and helps retain talent within the country, ensuring a brighter and more prosperous future for Pakistan.
          </span>
        </div>
      </motion.div>

      {/* "Why choose LeadGenPro!" Section */}
      <motion.div
        className="text-center font-sans mt-12 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold ">Why Roshan Mustaqbil Hunarmand Program!</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  mt-8">
          <div className=" px-6 lg:px-12">
            {[
              "Affordable IT Training",
              "Practical, Industry-Relevant Curriculum",
              "Focus on Employment and Entrepreneurship",
              "Inclusive and Equal Opportunities",
              "Contribution to National Development",
              "Personal and Professional Growth",
              "Global Opportunities",
              "Commitment to Innovation",
              "Preparing Students for International Certifications",
            ].map((point, idx) => (
              <motion.div
                key={idx}
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center justify-center bg-blue-600 text-white w-8 h-8 mr-3 rounded-full">
                  <i className="fas fa-check cursor-pointer text-sm"></i>
                </div>
                <p className="text-gray-700 cursor-pointer mt-3">{point}</p>
              </motion.div>
            ))}
          </div>
          <div >
            <video
              controls
              src={videodm}
              className="w-full rounded-lg shadow-md"

            />
          </div>
        </div>
      </motion.div>

      {/* Vision and Mission Section */}
      <motion.div
        className="text-center font-sans mt-12 mb-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-3xl font-semibold my-4">Vision and Mission</h2>
        <p className="text-gray-600 text-base max-w-2xl mx-auto leading-relaxed">
          Our mission is to empower individuals in Pakistan with affordable, high-quality IT
          training that bridges the digital skills gap, fosters innovation, and drives socio-economic
          growth. Our vision is to become Pakistan’s leading platform for inclusive and transformative
          IT education, nurturing a skilled workforce that propels the country into a globally competitive,
          tech-driven economy.
        </p>
      </motion.div>

      {/* Counters Section */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center px-6 lg:px-24 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[
          { title: "Seats Available", value: "118,276+" },
          { title: "Enrolled Students", value: "17,000+" },
          { title: "Available Courses", value: "20+" },
          { title: "No. of Alumni", value: "9,000+" },
          { title: "Industrial Trainers", value: "26+" },
        ].map((counter, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 cursor-pointer shadow-md rounded-lg p-4 hover:scale-105 transition-transform"
          >
            <h2 className="text-3xl font-bold text-blue-600">{counter.value}</h2>
            <p className="text-gray-600">{counter.title}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Appreciation Logos Section */}
      <motion.div
        className="mt-12 px-6 lg:px-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Appreciated By</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
          {Array(10)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={netflix}
                    alt="Company Logo"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-auto">
        <Footur />
      </div>
    </div>
  );
};

export default AboutUs;
