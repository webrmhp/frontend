import React, { useEffect } from 'react';
import Slider from 'react-slick';
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
import { getSlider, getLogo } from '../redux/action/request';
import { useNavigate } from 'react-router-dom';
import { routes } from '../contant/index.js';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const data = useSelector((state) => state.auth); // Access Redux state
  useEffect(() => {
    dispatch(getSlider());
    dispatch(getLogo());
  }, [1000]);
  return (
    <div className='font-sans leading-normal text-gray-800 '>
      <Header />
      <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className='w-full h-[350px] sm:h-[350px] md:h-[400px] lg:h-[550px]'
    >
      {data?.slider?.map((item, idx) => (
        <SwiperSlide key={idx}>
          <div className='relative w-full h-screen'>
            <img
              src={item?.image}
              alt={`slide-${idx}`}
              className='w-full h-screen object-cover'
            />
            <div className='absolute inset-0 bg-black opacity-80 z-10'></div>
            <div className='absolute inset-0 z-20 flex items-center justify-center text-center'>
              <div className='p-4 max-w-4xl mx-auto'>
                <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-600 to-green-700 text-transparent bg-clip-text drop-shadow-2xl'>
                  {item?.title}
                </h1>
                <p className='text-lg sm:text-xl md:text-2xl font-medium leading-relaxed bg-gradient-to-r from-green-400 via-green-600 to-green-700 text-transparent bg-clip-text'>
                  {item?.description}.
                </p>
                <button
                  onClick={() => {
                    const section = document.getElementById('course-section');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className='mt-6 px-6 py-3 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-400 hover:to-green-500 text-white font-semibold text-lg rounded-lg shadow-lg transform hover:scale-110 transition duration-300'
                >
                  Start Learning Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
     
      {/* Image Slider */}

      <section
        id='course-section'
        className='relative  text-center mx-auto'
      >
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
