import React from 'react';
import { useSelector } from 'react-redux';
import Footur from '../components/footur';
import Header from '../components/Header';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Course from '../components/Course.js';
import videodm from '../assets/image/videodm.mp4';
import Testimonials from '../components/Testimonials.js';
import Card2 from '../components/Cards2.js';
import Header_Top from '../components/Header_Top.js';

import { useNavigate } from 'react-router-dom';
import { routes } from '../contant/index.js';

const HomePage = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.data); // Access Redux state
  const authenticate = localStorage.getItem('token');
  console.log(authenticate);

  return (
    <div className='font-sans leading-normal text-gray-800 '>
      <Header_Top />
      <Header />
      <div className='relative w-full h-screen'>
        <video
          src={videodm}
          autoPlay
          muted
          loop
          className='w-full h-screen object-cover'
        />
        <div className='absolute inset-0 flex items-center justify-center text-center'>
          <div className='p-4'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-600 to-green-700 text-transparent bg-clip-text drop-shadow-2xl'>
              Empower Your Learning Journey
            </h1>

            <p className='text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-cyan-100 drop-shadow-lg'>
              Access top-tier courses designed to enhance your skills.
              <br />
              Learn anywhere, anytime, and transform your future.
            </p>

            <button
              onClick={() => {
                navigate(routes.course)
              }}
              className='mt-6 px-6 py-3 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-400 hover:to-green-500 text-white font-semibold text-lg rounded-lg shadow-lg transform hover:scale-110 transition duration-300'
            >
              Start Learning Now
            </button>
          </div>
        </div>
      </div>

      <section className='relative mt-0 text-center mx-auto'>
        <Course />
        <Testimonials />
        <Card2 />

        {/* <ChooseUs />
        <Avatar />
        <Cover />
        <Reviewbox /> */}
        {/* <Carousel />
        <TabComponent /> */}
        <Footur />
      </section>
    </div>
  );
};

export default HomePage;
