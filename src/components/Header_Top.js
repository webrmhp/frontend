import React from 'react';
import * as Icons from 'lucide-react';
import { Facebook, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { routes } from '../contant';
import { useNavigate } from 'react-router-dom';

const Header_Top = () => {
  const navigate = useNavigate();
  const socialIcons = [
    { name: 'Facebook', icon: Facebook },
    { name: 'Linkedin', icon: Linkedin },
    { name: 'Twitter', icon: Twitter },
    { name: 'Instagram', icon: Instagram },
    { name: 'Youtube', icon: Youtube },
  ];

  return (
    <header className='hidden md:block bg-white text-green-700 py-2 px-4'>
      <div className='container mx-auto flex flex-wrap justify-between items-center'>
        {/* Left Section: Address (Hidden on mobile screens) */}
        <div className='hidden md:flex items-center justify-start !space-x-2 h-auto'>
          <Icons.MapPin className='h-4 w-4 flex-shrink-0' />
          <p className='text-sm leading-none m-0'>
            General Head Office, 57400 Postal Area, Model Town, Lahore, Punjab
          </p>
        </div>

        {/* Middle Section: Social Icons (Hidden on mobile screens) */}
        <div className='hidden lg:flex space-x-5'>
          <div className='border-l-2 border-green-700 max-h-full'></div>
          {socialIcons.map(({ name, icon: IconComponent }) => (
            <a
              key={name}
              href='#'
              className='relative group flex items-center h-6 justify-center'
              aria-label={name}
            >
              <IconComponent className='h-5 w-5 text-green-700 group-hover:text-green-500 transition-colors duration-200' />
            </a>
          ))}
        </div>

        {/* Right Section: Login/Register */}
        <div className='flex items-center space-x-4'>
          {localStorage.getItem('token') ? (
            <>
              <div className='border-l-2 border-green-700 max-h-full'></div>
              <div className='flex gap-1'>
                <button className='text-sm hover:text-green-500'>
                  0318-4321118 | 0333-4996687
                </button>
              </div>
            </>
          ) : (
            <div className='flex space-x-4'>
              <div className='border-l-2 border-green-700 max-h-full'></div>
              <div className='flex gap-1' onClick={() => navigate(routes.signin)}>
                <Icons.User className='w-4' />
                <button className='text-sm hover:text-green-500'>Log In</button>
              </div>
              <div className='border-l-2 border-green-700 max-h-full'></div>
              <div className='flex gap-1' onClick={() => navigate(routes.signup)}>
                <Icons.UserRoundPen className='w-4' />
                <button className='text-sm hover:text-green-500'>Register</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header_Top;
