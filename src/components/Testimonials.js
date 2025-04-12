import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assets, projectsData } from '../assets/image/assets';
import { getTestimonail } from '../redux/action/request';
const Testimonials = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.auth || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardToShow, setCardToShow] = useState(1);
  useEffect(() => {
    dispatch(getTestimonail());
  }, [1000]);
  useEffect(() => {
    const updateCardToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardToShow(reduxData?.testimonail?.length);
      } else {
        setCardToShow(1);
      }
    };

    updateCardToShow();

    window.addEventListener('resize', updateCardToShow);
    return () => window.removeEventListener('resize', updateCardToShow);
  }, []);

  const nextProject = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % reduxData?.testimonail?.length
    );
  };
  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reduxData?.testimonail?.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden'
      id='Projects'
    >
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
        Our
        <span className='underline ml-2 underline-offset-4 decoration-1 under text-green-700 font-semibold'>
          Testimonials
        </span>
      </h1>
      <p className='text-center tetxt-xl font-semibold text-gray-500 mb-8 max-w-80 mx-auto'>
        Lets see what our valuable students think about us. Their Testimonials!
      </p>

      <div className='flex justify-end items-center mb-8'>
        <button
          onClick={prevProject}
          className='p-3 bg-gray-200 rounded mr-2'
          aria-label='Previous Projects'
        >
          <img
            src={assets.left_arrow}
            alt='Previous'
          />
        </button>

        <button
          onClick={nextProject}
          className='p-3 bg-gray-200 rounded mr-2'
          aria-label='Previous Projects'
        >
          <img
            src={assets.right_arrow}
            alt='Previous'
          />
        </button>
      </div>

      <div className='overflow-hidden'>
        <div
          className='flex gap-8 transition-transform duration-500 ease-in-out'
          style={{
            transform: `translateX(-${(currentIndex * 100) / cardToShow}%)`,
          }}
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8'>
            {reduxData?.testimonail.map((data, index) => (
              <div
                key={index}
                className='group w-full bg-[#15833E] rounded-2xl shadow-xl p-6 transition duration-300 hover:shadow-2xl hover:transform hover:scale-105 flex flex-col justify-between'
              >
                <div className='flex items-center space-x-4 mb-4'>
                  <div className='relative w-16 h-16'>
                    <img
                      className='w-16 h-16 rounded-full border-4 border-white absolute top-0 left-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0'
                      src={data?.image}
                      alt='Main Avatar'
                    />
                    <img
                      className='w-16 h-16 rounded-full border-4 border-white absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100'
                      src={data?.moreImage}
                      alt='Hover Avatar'
                    />
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-white'>
                      {data?.name}
                    </h4>
                    <p className='text-sm text-gray-200'>{data?.status}</p>
                  </div>
                </div>

                <p className='text-gray-100 leading-relaxed break-words italic text-[15px] md:text-base'>
                  “{data?.description}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
