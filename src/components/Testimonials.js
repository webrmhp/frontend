import React, { useEffect, useState } from 'react';
import { assets, projectsData } from '../assets/image/assets';
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardToShow, setCardToShow] = useState(1);

  useEffect(() => {
    const updateCardToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardToShow(projectsData.length);
      } else {
        setCardToShow(1);
      }
    };

    updateCardToShow();

    window.addEventListener('resize', updateCardToShow);
    return () => window.removeEventListener('resize', updateCardToShow);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  };
  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
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
            {/* Testimonial 1: Governor of Punjab */}
            <div className='max-w-md mx-auto bg-[#15833E] to-white rounded-2xl shadow-xl p-6 transition duration-300 hover:shadow-2xl hover:transform hover:scale-105'>
              <div className='flex items-center space-x-4 mb-4'>
                <img
                  className='w-16 h-16 rounded-full border-4 border-white'
                  src='https://i.tribune.com.pk/media/images/sardarsaleemhaiderkhan1728322948-0/sardarsaleemhaiderkhan1728322948-0.jpg'
                  alt='Governor Punjab Avatar'
                />
                <div>
                  <h4 className='text-xl font-semibold text-white'>
                    Governor Punjab
                  </h4>
                  <p className='text-sm text-gray-200'>
                    Government of Punjab, Pakistan
                  </p>
                </div>
              </div>
              <p className='text-gray-100 leading-relaxed'>
                "The IT institution in Lahore provides world-class training and
                opportunities to our youth. Their approach to practical learning
                is unmatched, and we are proud to have such an institute
                nurturing future talent in our region."
              </p>
            </div>

            {/* Testimonial 2: Minister of IT */}
            <div className='max-w-md mx-auto  bg-[#15833E] rounded-2xl shadow-xl p-6 transition duration-300 hover:shadow-2xl hover:transform hover:scale-105'>
              <div className='flex items-center space-x-4 mb-4'>
                <img
                  className='w-16 h-16 rounded-full border-4 border-white'
                  src='data:image/jpeg;base64,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'
                  alt='Minister of IT Avatar'
                />
                <div>
                  <h4 className='text-xl font-semibold text-white'>
                    Minister of IT
                  </h4>
                  <p className='text-sm text-gray-200'>
                    Government of Pakistan
                  </p>
                </div>
              </div>
              <p className='text-gray-100 leading-relaxed'>
                "This institution has set the benchmark for quality education in
                the IT field. Their focus on technology-driven learning and
                upskilling students is commendable."
              </p>
            </div>

            {/* Testimonial 3: CEO of Tech Group */}
            <div className='max-w-md mx-auto bg-[#15833E] to-white rounded-2xl shadow-xl p-6 transition duration-300 hover:shadow-2xl hover:transform hover:scale-105'>
              <div className='flex items-center space-x-4 mb-4'>
                <img
                  className='w-16 h-16 rounded-full border-4 border-white'
                  src='data:image/jpeg;base64,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'
                  alt='CEO Avatar'
                />
                <div>
                  <h4 className='text-xl font-semibold text-white'>
                    Ali Hassan
                  </h4>
                  <p className='text-sm text-gray-200'>CEO, Tech Innovators</p>
                </div>
              </div>
              <p className='text-gray-100 leading-relaxed'>
                "As a leader in the tech industry, I highly value the efforts of
                this institution. They are producing skilled professionals who
                are ready to tackle real-world challenges in the IT industry."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
