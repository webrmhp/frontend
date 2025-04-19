import React, { useState, useEffect } from 'react';
import Footur from '../components/footur';
import Header from '../components/Header';
import { AnimatePresence, motion } from 'framer-motion';
import { getState } from '../redux/action/request';
import { useDispatch, useSelector } from 'react-redux';
const AboutUs = () => {
  const dispatch = useDispatch();
  const { states } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('mission');
  useEffect(() => {
    dispatch(getState());
  }, [1000]);
  const [coursesOffered, setCoursesOffered] = useState(
    states?.totalCourse || 0
  );
  const [studentsEnrolled, setStudentsEnrolled] = useState(
    states?.totalSudent || 0
  );
  const [successfulGraduates, setSuccessfulGraduates] = useState(
    states?.enrolledCourse || 0
  );
  const [instructors, setInstructors] = useState(states?.totalInstructors || 0);

  useEffect(() => {
    console.log('m', states);
  }, [states]);
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <section className='bg-white py-12 px-4 md:px-20'>
        <div className='max-w-7xl mx-auto'>
          <motion.h2
            className='text-3xl font-bold text-green-800 mb-10 text-center'
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Us
          </motion.h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
            {/* Video Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='w-full'
            >
              <div className='aspect-video border-4 border-green-800 rounded-lg overflow-hidden shadow-lg'>
                <iframe
                  src='https://www.youtube.com/embed/dQw4w9WgXcQ'
                  title='About Video'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  className='w-full h-full p-2'
                ></iframe>
              </div>
            </motion.div>

            {/* Why RMHP Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className='text-2xl font-semibold text-green-800 mb-4'>
                Why RMHP?
              </h3>
              <ul className='list-disc pl-5 text-gray-700 space-y-2'>
                <ul className='list-disc pl-5 text-gray-700 space-y-3 text-base md:text-lg leading-relaxed'>
                  <li>Expert-led courses designed by industry professionals</li>
                  <li>Flexible learning schedules and lifetime access</li>
                  <li>Certification on completion to boost your career</li>
                  <li>Affordable pricing with high-quality content</li>
                  <li>
                    Interactive learning with quizzes, projects, and mentorship
                  </li>
                  <li>
                    Track your progress and get personalized recommendations
                  </li>
                  <li>
                    Dedicated support to guide you throughout your journey
                  </li>
                </ul>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Toggle Section */}

      <div className='mt-12 mb-5'>
        {/* Tab Buttons */}
        <div className='flex border border-green-800 rounded-lg overflow-hidden w-fit mx-auto mb-6'>
          <button
            onClick={() => setActiveTab('mission')}
            className={`px-6 py-3 transition-all duration-300 font-medium ${
              activeTab === 'mission'
                ? 'bg-green-800 text-white'
                : 'bg-white text-green-800'
            }`}
          >
            Mission
          </button>
          <button
            onClick={() => setActiveTab('vision')}
            className={`px-6 py-3 transition-all duration-300 font-medium ${
              activeTab === 'vision'
                ? 'bg-green-800 text-white'
                : 'bg-white text-green-800'
            }`}
          >
            Vision
          </button>
        </div>

        {/* Tab Content */}
        <div className='space-y-6'>
          <AnimatePresence mode='wait'>
            {activeTab === 'mission' && (
              <motion.div
                key='mission'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className='bg-white border border-green-800 rounded-lg p-6 shadow max-w-3xl mx-auto'
              >
                <h4 className='text-xl font-bold text-center text-green-800 mb-2'>
                  🎯 Mission
                </h4>
                <p className='text-gray-700 font-semibold text-lg leading-relaxed relative pl-12 pr-12'>
                  <span className='absolute left-0 top-0 text-5xl text-green-800 leading-none'>
                    ❝
                  </span>
                  Our mission is to empower learners with accessible,
                  high-quality education tailored to real-world needs — helping
                  them gain in-demand skills and excel in their careers.
                  <span className='absolute right-4 bottom-0 text-5xl text-green-800 leading-none'>
                    ❞
                  </span>
                </p>
              </motion.div>
            )}

            {activeTab === 'vision' && (
              <motion.div
                key='vision'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className='bg-white border border-green-800 rounded-lg p-6 shadow max-w-3xl mx-auto'
              >
                <h4 className='text-xl text-center font-bold text-green-800 mb-2'>
                  🚀 Vision
                </h4>
                <p className='text-gray-700 font-semibold text-lg leading-relaxed relative pl-12 pr-12'>
                  <span className='absolute left-0 top-0 text-5xl text-green-800 leading-none'>
                    ❝
                  </span>
                  We envision a world where anyone, regardless of background or
                  location, can achieve their full potential through
                  transformative learning experiences.
                  <span className='absolute right-4 bottom-0 text-5xl text-green-800 leading-none'>
                    ❞
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <section className='bg-white py-12 px-4 md:px-20'>
        <div className='max-w-7xl mx-auto text-center'>
          <motion.h2
            className='text-3xl font-bold text-green-800 mb-10 '
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Success
          </motion.h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 '>
            {/* Courses Offered Counter */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='counter-card border-2 border-[#0F3D24] p-2 rounded'
            >
              <h3 className='text-2xl font-semibold text-green-800'>
                Courses Offered
              </h3>
              <p className='text-4xl font-bold text-green-800'>
                {states?.totalCourse || 0}
              </p>
            </motion.div>

            {/* Students Enrolled Counter */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='counter-card border-2 border-[#0F3D24] p-2 rounded'
            >
              <h3 className='text-2xl font-semibold text-green-800'>
                Students Enrolled
              </h3>
              <p className='text-4xl font-bold text-green-800'>
                {states?.enrolledCourse || 0}
              </p>
            </motion.div>

            {/* Successful Graduates Counter */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='counter-card border-2 border-[#0F3D24] p-2 rounded'
            >
              <h3 className='text-2xl font-semibold text-green-800'>
                Active Student
              </h3>
              <p className='text-4xl font-bold text-green-800'>
                {states?.totalSudent || 0}
              </p>
            </motion.div>

            {/* Instructors Counter */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='counter-card border-2 border-[#0F3D24] p-2 rounded'
            >
              <h3 className='text-2xl font-semibold text-green-800'>
                Instructors
              </h3>
              <p className='text-4xl font-bold text-green-800'>{states?.totalInstructors || 0}</p>
            </motion.div>
          </div>
        </div>
      </section>
      <div className='mt-auto mt-5'>
        <Footur />
      </div>
    </div>
  );
};

export default AboutUs;
