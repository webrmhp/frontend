import React, { useState, useEffect } from 'react';
import { getGuest } from '../redux/action/request';
import { useDispatch, useSelector } from 'react-redux';

const Card2 = () => {
  const [activeButton, setActiveButton] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGuest());
  }, [1000]);
  const reduxData = useSelector((state) => state.auth || []);
  const cardData = {
    1: [
      {
        name: 'Sardar Saleem Haider Khan',
        title: 'Governor of Punjab',
        link: 'https://en.wikipedia.org/wiki/Sardar_Saleem_Haider_Khan',
        image:
          'http://t2.gstatic.com/images?q=tbn:ANd9GcSiX39FmvbtshdNb_wKbxnm5OdO0yfkDj1sWD3hvFmZ_nODsuLuKFc8k-P-_c_z0paInoGlxyeVOyXrGzJnDkOAOq6AEYCZog',
      },
      {
        name: 'Sardar Sher Ali Gorchani',
        title: 'IT Minister',
        link: 'https://en.wikipedia.org/wiki/Sardar_Sher_Ali_Gorchani',
        image:
          'data:image/webp;base64,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',
      },
    ],
  };

  return (
    <div className='w-full mb-8'>
      {/* Navigation Bar */}
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
        Our
        <span className='underline ml-2 underline-offset-4 decoration-1 under text-green-700 font-semibold'>
          Guest
        </span>
      </h1>
      <p className='text-center tetxt-xl font-semibold text-gray-500 mb-8 max-w-80 mx-auto'>
        Lets meet with our Guest!
      </p>

      {/* Cards Section */}
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {reduxData?.guest?.map((card, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300'
            >
              <a href={card?.link}>
                <img
                  src={card.image}
                  alt={card.name}
                  className='w-full h-48 object-cover'
                />
                <div className='p-4'>
                  <h2 className='text-xl font-bold text-gray-800'>
                    {card.name}
                  </h2>
                  <p className='text-gray-500 text-sm'>{card.status}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card2;
