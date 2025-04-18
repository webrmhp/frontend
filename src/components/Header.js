import React, { useEffect, useState } from 'react';
import ProfileIcon from '../assets/icons/profile';
import { GraduationCap } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { Globe } from 'lucide-react';
import { routes } from '../contant';
import { LogOut, User, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Building } from 'lucide-react';
import { getProfile } from '../redux/action/auth';
import { useDispatch, useSelector } from 'react-redux';
import { BookOpen, Laptop, Sun, Briefcase } from 'lucide-react';
import Header_Top from './Header_Top'
const Header = () => {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For profile dropdown
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const reduxData = useSelector((state) => state.auth || []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleProfileDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle profile dropdown on click
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate(routes.signin);
  };

  const goToUserDashboard = () => {
    navigate(routes.dashboard);
  };

  const gotoHomePage = () => {
    navigate(routes.main);
  };

  const gotoAboutUs = () => {
    navigate(routes.aboutUs);
  };

  const gotoFaqPages = () => {
    navigate(routes.Faqs);
  };

  const gotoCertificatePage = () => {
    navigate(routes.CertificatePage);
  };

  const gotoOppertunity = (title) => {
    if (title === 'Scholarship') {
      navigate(routes.scholarship);
    } else if (title === 'Intership') {
      navigate(routes.internship);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated]);

  // Toggle dropdown on small screens
  const handleDropdownToggle = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null); // Close the dropdown if it's already open
    } else {
      setOpenDropdown(dropdownName); // Open the dropdown
    }
  };

  return (
    <>
      <Header_Top />
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 999,
          backgroundColor: '#166534',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        }}
        className='flex justify-between items-center py-2 px-4 lg:px-6'
      >
        {/* Logo */}
        <h3 className='text-white text-lg font-bold'>
          {reduxData.logo.length > 0 ? (
            <img
              onClick={() => navigate('/')}
              src={reduxData.logo[0].image}
              alt='Company Logo'
              width={50}
              height={50}
              className='object-contain cursor-pointer transition-all duration-300 hover:scale-105 hover:opacity-80'
            />
          ) : (
            'Logo'
          )}
        </h3>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center space-x-6'>
          {/* Home */}
          <button
            onClick={gotoHomePage}
            className='text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none'
          >
            Home
          </button>

          {/* Opportunities Dropdown */}
          <div className='relative'>
            <button
              onClick={() => handleDropdownToggle('opportunities')}
              className='flex items-center text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none'
            >
              Opportunities
              <span className='ml-1'>
                {openDropdown === 'opportunities' ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </span>
            </button>

            <div
              className={`${
                openDropdown === 'opportunities' ? 'block' : 'hidden'
              } absolute mt-2 w-48 bg-[#166534] border-1 border-teal-500 rounded-lg shadow-lg z-50`}
            >
              <button
                onClick={() => navigate('/course')}
                className='flex items-center gap-2 w-full py-2 text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                <BookOpen size={16} />
                Professional Courses
              </button>

              <button
                onClick={() => navigate('/LaptopScheme')}
                className='flex items-center gap-2 w-full py-2 text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                <Laptop size={16} />
                Laptop Scheme
              </button>

              <button
                onClick={() => navigate('/SolarScheme')}
                className='flex items-center gap-2 w-full py-2 text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                <Sun size={16} />
                Solar Scheme
              </button>

              <button
                onClick={() => navigate('/Intership')}
                className='flex items-center gap-2 w-full py-2 text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                <Briefcase size={16} />
                Internship Opportunities
              </button>
            </div>
          </div>

          {/* Courses Dropdown */}

          <div className='relative'>
            <button
              onClick={() => handleDropdownToggle('courses')}
              className='flex items-center text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none'
            >
              Courses
              <span className='ml-1'>
                {openDropdown === 'courses' ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </span>
            </button>
            <div
              className={`${
                openDropdown === 'courses' ? 'block' : 'hidden'
              } absolute mt-2 w-40 bg-[#166534] border-1 border-teal-500 rounded-lg shadow-lg z-50`}
            >
              <button
                onClick={() => navigate('/Course/?type=Online')}
                className='block w-full py-2 text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-2 flex items-center'
              >
                <Globe className='w-4 h-4 mr-2' />
                Online Courses
              </button>

              <button
                onClick={() => navigate('/Course/?type=Physical')}
                className='block w-full py-2 text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-2 flex items-center'
              >
                <Building className='w-4 h-4 mr-2' />
                Physical Courses
              </button>
            </div>
          </div>

          {/* About Us */}
          <button
            onClick={gotoAboutUs}
            className='text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none'
          >
            About Us
          </button>

          {/* Info Desk Dropdown */}
          <div className='relative'>
            <button
              onClick={() => handleDropdownToggle('infoDesk')}
              className='flex items-center text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none'
            >
              Info Desk
              <span className='ml-1'>
                {openDropdown === 'infoDesk' ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </span>
            </button>
            <div
              className={`${
                openDropdown === 'infoDesk' ? 'block' : 'hidden'
              } absolute mt-2 w-56 bg-[#166534] border-1 border-teal-500 rounded-lg shadow-lg z-50`}
            >
              <Link
                to='/created'
                className='block py-2 no-underline text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                Create Account?
              </Link>
              <Link
                to='/register-course'
                className='block py-2 no-underline text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                How to register course?
              </Link>
              <Link
                to='/setup-lms'
                className='block py-2 no-underline text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                How to setup student LMS?
              </Link>
              <Link
                to='/SOPsPage'
                className='block py-2 no-underline text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                SOPS
              </Link>
              <Link
                to='/TermsAndConditions'
                className='block py-2 no-underline text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                Terms & Conditions
              </Link>
              <Link
                to='/PrivacyPolicy'
                className='block py-2 no-underline text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                Privacy Policy
              </Link>

              <Link
                to='/FAQs'
                className='block py-2 no-underline text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                FAQ's
              </Link>
            </div>
          </div>

          {/* Join Hands Dropdown */}
          {/* <div className='relative'>
            <button
              onClick={() => handleDropdownToggle('joinHands')}
              className='flex items-center text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none'
            >
              Join Hands
              <span className='ml-1'>
                {openDropdown === 'joinHands' ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </span>
            </button>
            <div
              className={`${
                openDropdown === 'joinHands' ? 'block' : 'hidden'
              } absolute mt-2 w-40 bg-[#166534] border-1 border-teal-500 rounded-lg shadow-lg z-50`}
            >
              <Link
                to='/SolarScheme'
                className='block py-2 no-underline text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                Solar Scheme
              </Link>
              <Link
                to='/LaptopScheme'
                className='block py-2 no-underline text-sm text-white hover:bg-[#2AA166] hover:rounded-md text-left px-4'
              >
                Laptop Scheme
              </Link>
            </div>
          </div> */}

          {/* Our Events Dropdown */}
          <div className='relative'>
            <button
              onClick={() => navigate('/event')}
              className='flex items-center text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none'
            >
              Our Events
            </button>
          </div>

          {/* LMS Link */}
          {isAuthenticated && (
            <Link
              to={routes.addToCart}
              className='text-white font-bold hover:text-amber-300 no-underline'
            >
              <ShoppingCart className='mx-auto  text-[white]' />
              
            </Link>
          )}
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white mt-14 transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out lg:hidden z-50 shadow-lg`}
        >
          <div className='flex flex-col p-4 space-y-4'>
            {/* Home */}
            <button
              onClick={gotoHomePage}
              className='text-gray-800 transition-colors duration-300 hover:text-green-500 focus:outline-none text-left'
            >
              Home
            </button>

            {/* About Us */}
            <button
              onClick={gotoAboutUs}
              className='text-gray-800 transition-colors duration-300 hover:text-green-500 focus:outline-none text-left'
            >
              About Us
            </button>

            {/* Courses Dropdown */}
            {isAuthenticated && (
              <div className='relative'>
                <button
                  onClick={() => handleDropdownToggle('courses')}
                  className='flex items-center text-gray-800 transition-colors duration-300 hover:text-green-500 focus:outline-none text-left w-full'
                >
                  Courses
                  <span className='ml-1'>
                    {openDropdown === 'courses' ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </span>
                </button>
                <div
                  className={`${
                    openDropdown === 'courses' ? 'block' : 'hidden'
                  } border-l-2 border-green-600 mt-2 pl-2 ml-4 space-y-2`}
                >
                  <button
                    onClick={() => navigate('/Course/?type=Online')}
                    className='block w-full py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                  >
                    Online Courses
                  </button>
                  <button
                    onClick={() => navigate('/Course/?type=Physical')}
                    className='block w-full py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                  >
                    Physical Courses
                  </button>
                </div>
              </div>
            )}

            {/* Opportunities Dropdown */}
            <div className='relative'>
              <button
                onClick={() => handleDropdownToggle('opportunities')}
                className='flex items-center text-gray-800 transition-colors duration-300 hover:text-green-500focus:outline-none text-left w-full'
              >
                Opportunities
                <span className='ml-1'>
                  {openDropdown === 'opportunities' ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </span>
              </button>
              <div
                className={`${
                  openDropdown === 'opportunities' ? 'block' : 'hidden'
                } border-l-2 border-green-600 mt-2 pl-2 ml-4 space-y-2`}
              >
                <button
                  onClick={() => gotoOppertunity('Intership')}
                  className='block w-full py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                >
                  Internship Opportunities
                </button>
                <button
                  onClick={() => gotoOppertunity('Scholarship')}
                  className='block w-full py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                >
                  Scholarship
                </button>
                <button
                  onClick={() => gotoCertificatePage('CertificatePage')}
                  className='block w-full py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                >
                  Certificates
                </button>
              </div>
            </div>

            {/* Info Desk Dropdown */}
            <div className='relative'>
              <button
                onClick={() => handleDropdownToggle('infoDesk')}
                className='flex items-center text-gray-800 transition-colors duration-300 hover:text-green-500 focus:outline-none text-left w-full'
              >
                Info Desk
                <span className='ml-1'>
                  {openDropdown === 'infoDesk' ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </span>
              </button>
              <div
                className={`${
                  openDropdown === 'infoDesk' ? 'block' : 'hidden'
                } border-l-2 border-green-600 mt-2 pl-2 ml-4 space-y-2`}
              >
                <Link
                  to='/created'
                  className='block py-2 px-2 no-underline text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                >
                  Create Account?
                </Link>
                <Link
                  to='/register-course'
                  className='block py-2 px-2 no-underline text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                >
                  How to register course?
                </Link>
                <Link
                  to='/setup-lms'
                  className='block py-2 px-2 no-underline text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                >
                  How to setup student LMS?
                </Link>
                <Link
                  to='/SOPsPage'
                  className='block py-2 px-2 no-underline text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                >
                  SOPS
                </Link>
                <Link
                  to='/TermsAndConditions'
                  className='block py-2 px-2 no-underline text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                >
                  Terms & Conditions
                </Link>
                <Link
                  to='/PrivacyPolicy'
                  className='block py-2 px-2 no-underline text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                >
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Join Hands Dropdown */}
            <div className='relative'>
              <button
                onClick={() => handleDropdownToggle('joinHands')}
                className='flex items-center text-gray-800 transition-colors duration-300 hover:text-green-500 focus:outline-none text-left w-full'
              >
                Join Hands
                <span className='ml-1'>
                  {openDropdown === 'joinHands' ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </span>
              </button>
              <div
                className={`${
                  openDropdown === 'joinHands' ? 'block' : 'hidden'
                } border-l-2 border-green-600 mt-2 pl-2 ml-4 space-y-2`}
              >
                <Link
                  to='/SolarScheme'
                  className='block py-2 px-2 no-underline text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                >
                  Solar Scheme
                </Link>
                <Link
                  to='/LaptopScheme'
                  className='block py-2 px-2 no-underline text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md text-left'
                >
                  Laptop Scheme
                </Link>
              </div>
            </div>

            {/* Our Events Dropdown */}
            <div className='relative'>
              <button
                onClick={() => handleDropdownToggle('ourEvents')}
                className='flex items-center text-gray-800 transition-colors duration-300 hover:text-green-500 focus:outline-none text-left w-full'
              >
                Our Events
              </button>
            </div>

            {/* LMS Link */}
            {isAuthenticated && (
              <Link
                to={routes.lms}
                className='text-gray-800 font-bold hover:text-amber-500 no-underline text-left'
              >
                LMS
              </Link>
            )}
          </div>
        </div>

        {/* Profile and Authentication */}
        <div className='flex items-center space-x-4'>
          {/* Hamburger Menu for Mobile */}
          <button
            className='lg:hidden text-white focus:outline-none'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {isAuthenticated ? (
            <>
              {profile?.profilePhoto ? (
                <span
                  onClick={toggleProfileDropdown} // Toggle dropdown on click
                  className='relative cursor-pointer'
                >
                  <img
                    src={profile.profilePhoto}
                    alt='Profile'
                    className='w-8 h-8 object-cover rounded-full border-2 border-white'
                  />
                </span>
              ) : (
                <button
                  onClick={toggleProfileDropdown} // Toggle dropdown on click
                  className='bg-blue-200 text-gray-800 rounded-full p-2 hover:bg-blue-300 focus:outline-none cursor-pointer'
                >
                  <ProfileIcon />
                </button>
              )}
            </>
          ) : (
            <>
              {/* Signup and Login Links */}
              <Link
                to={routes.signup}
                className='text-sm text-white hover:text-amber-300 lg:hidden'
              >
                Signup
              </Link>
              <Link
                to={routes.signin}
                className='text-sm text-white hover:text-amber-300 lg:hidden'
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Profile Dropdown */}
        {isDropdownOpen && (
          <div className='absolute right-5 top-[63px] w-36 bg-[#2AA166] border-1 border-teal-500 rounded-lg shadow-lg z-50'>
            <div className='absolute top-[-9px] right-4 w-4 h-4 bg-[#2AA166] border-t-2 border-l-2 border-teal-500 transform rotate-45'></div>
            <div className='py-2'>
              <Link
                to={routes.profile}
                className='flex items-center no-underline px-4 py-2 text-sm text-white hover:bg-[#166534] hover:rounded-md'
              >
                <User
                  size={18}
                  className='mr-2'
                />
                <span>Profile</span>
              </Link>
              <button
                onClick={logout}
                className='flex items-center px-4 py-2 text-sm text-white hover:bg-[#166534] hover:rounded-md w-full'
              >
                <LogOut
                  size={16}
                  className='mr-2'
                />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
