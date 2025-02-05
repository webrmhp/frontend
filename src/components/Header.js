import React, { useEffect, useState } from 'react';
import ProfileIcon from '../assets/icons/profile';
import { routes } from '../contant';
import { LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getProfile } from '../redux/action/auth';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(profile, "profile")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate(routes.signin);
  };

  const goToUserDashboard = () => {
    navigate(routes.dashboard);
  };
  const goToCourses = () => {
    // navigate(routes.);
  };
  const gotoHomePage = () => {
    navigate(routes.main);
  }

  const gotoAboutUs = () => {
    navigate(routes.aboutUs)
  }
  const gotoFaqPages = () => {
    navigate(routes.Faqs)
  }
  const gotoOppertunity = (title) => {
    if (title == "Scholarship") {
      navigate(routes.scholarship);
    }
    else if (title == "Intership") {
      navigate(routes.internship);
    }
  }

  const goToCourse = (page) => {
    if (page == 'Online') {
      navigate(routes.course);

    } if (page == 'Physical') {
      navigate(routes.course);

    }

  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  return (
    <header
      onMouseLeave={() => setIsOpen(false)}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        backgroundColor: '#166534',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Softer shadow for a clean, modern look
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // Smooth transition
      }}
      className="flex justify-between items-center py-2 px-6"
    >
      <h5 className='text-white'> Logo</h5>
      <button
        className='lg:hidden text-gray-700 focus:outline-none'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        &#9776; {/* Hamburger icon */}
      </button>

      {/* Navigation */}
      <nav
        className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} absolute lg:static bg-red lg:bg-transparent w-full top-18  text-white left-0 shadow-md lg:shadow-none xl:ml-[10%] xl:mr-[10%] justify-center items-center`}
      >


        <ul className='flex flex-col lg:flex-row items-center mt-3   space-y-4 lg:space-y-0 lg:space-x-6'>

          <ul className="flex space-x-4">

            <li className="relative group">
              <button
                onClick={gotoHomePage}
                className="text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none">
                Home
              </button>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-amber-300 group-hover:w-full transition-all duration-300"></span>
            </li>



            <div className="relative group">

              <button onClick={gotoAboutUs} className="text-white  focus:outline-none">
                About Us
              </button>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-amber-300 group-hover:w-full transition-all duration-300"></span>
            </div>

            {isAuthenticated && (
              <div className="relative group">
                <button

                  className="text-white hover:text-black focus:outline-none"
                >
                  Courses
                </button>

                <div className="absolute  left-0 text-center rounded-md hidden w-28 h-fit bg-[#2AA166] border-2 border-teal-500 shadow-md group-hover:block">
                  <h5 onClick={() => goToCourse("Online")} className="py-2 text-sm hover:bg-[#166534] hover:rounded-md cursor-pointer m-0">
                    Online
                  </h5>
                  <h5 onClick={() => goToCourse("Physical")} className="py-2 text-sm hover:bg-[#166534] hover:rounded-md cursor-pointer m-0">
                    Physical
                  </h5>
                </div>
              </div>

            )}

            <div className="relative group">
              <button

                className="text-white hover:text-black focus:outline-none"
              >
                Opportunities
              </button>
              <div className=" absolute left-0 text-center  hidden  w-28  bg-[#2AA166] border-2 border-teal-500 rounded-md shadow-md group-hover:block ">
                <h5 onClick={() => { gotoOppertunity("Intership") }} className="py-2 text-sm hover:bg-[#166534] hover:rounded-md cursor-pointer m-0">Internship</h5>
                <h5 onClick={() => { gotoOppertunity("Scholarship") }} className=" py-2 text-sm hover:bg-[#166534] hover:rounded-md cursor-pointer m-0">Scholarship</h5>
              </div>
            </div>

            <div className="relative group">
              <button className="text-white hover:text-black focus:outline-none">
                Info Desk
              </button>
              <div className="absolute left-0 rounded-md hidden text-white mt-0 w-[215px] bg-[#2AA166] border-2 border-teal-500 shadow-md group-hover:block">
                <Link to="/created" className='no-underline'>
                  <h5 className="py-2 px-3 text-sm  text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0">
                    Create Account?
                  </h5>
                </Link>
                <Link to="/register-course" className='no-underline'>
                  <h5 className="py-2 px-3 text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0">
                    How to register course?
                  </h5>
                </Link>
                <Link to="/setup-lms" className='no-underline'>
                  <h5 className="py-2 px-3 text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0">
                    How to setup student LMS?
                  </h5>
                </Link>
               
                <Link to="/SOPsPage" className='no-underline'>
                  <h5 className="py-2 px-3 text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0">
                    SOPS
                  </h5>
                </Link>

                <Link to="/TermsAndConditions" className='no-underline'>
                  <h5 className="py-2 px-3 text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0">
                    Terms & Conditions
                  </h5>
                </Link>

                <Link to="/PrivacyPolicy" className='no-underline'>
                  <h5 className="py-2 px-3 text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0">
                    Privacy Policy
                  </h5>
                </Link>

              </div>
            </div>


            <div className="relative group">
              <button

                className="text-white hover:text-black focus:outline-none"
              >
                Join Hands
              </button>
              <div className="absolute left-0 text-center rounded-md  hidden mt-0 w-32  bg-[#2AA166] border-2 border-teal-500 shadow-md group-hover:block ">
                <Link to="/SolarScheme" className='no-underline'>
                  <h5 className=" py-2 text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0">Solar Scheme</h5> </Link>
                <Link  to="/LaptopScheme" className='no-underline'>
                  <h5 className=" py-2 text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0">Laptop Scheme</h5></Link>
              </div>
            </div>
            <li
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className="text-white hover:text-black text-sm focus:outline-none"
              >
                OUR EVENTS

              </button>
              


              {/* Dropdown */}
              {isDropdownOpen && (
               <div className="absolute top-full left-0 bg-[#2AA166] border-2 border-teal-500 shadow-lg rounded-md w-32">

                  <h5 className='m-0'>
                    <button
                      onClick={() => navigate('/event-1')}
                      className=" py-2 w-full text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0"
                    >
                      Event 1
                    </button>
                  </h5>
                  <h5 className='m-0'>
                    <button
                      onClick={() => navigate('/event-2')}
                      className=" py-2 w-full text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0"
                    >
                      Event 2
                    </button>
                  </h5>
                  <h5 className='m-0'>
                    <button
                      onClick={() => navigate('/event-3')}
                      className=" py-2 w-full text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0"
                    >
                      Event 3
                    </button>
                  </h5>
                  <h5 className='m-0'>
                    <button
                      onClick={() => navigate('/event-4')}
                      className=" py-2 w-full text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0"
                    >
                      Event 4
                    </button>
                  </h5>
                </div>
              )}
            </li>

          </ul>

          {isAuthenticated ? (
            <li className="relative group">
              <Link
                to={routes.lms}
                className="text-white font-bold hover:text-black no-underline">
                LMS
              </Link>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-amber-300 group-hover:w-full transition-all duration-300"></span>
            </li>

          ) : (
            ""
          )}
          <li className="relative group">
            <button onClick={gotoFaqPages} className="text-white hover:text-black focus:outline-none">
              FAQ's
            </button>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-amber-300 group-hover:w-full transition-all duration-300"></span>
          </li>

        </ul>
      </nav>

      {/* Icons and Authentication */}
      <div className='flex items-center space-x-4'>
        {isAuthenticated ? (
          <>

            {profile?.profilePhoto ? (
              <span
                onMouseEnter={() => setIsOpen(true)}
                onClick={toggleDropdown}
                className='relative'
              >
                <img
                  src={profile?.profilePhoto}
                  alt='Profile'
                  className='w-14 h-8 object-cover rounded-full border-none' // Make the width and height the same for a round shape
                />
              </span>
            ) : (
              <button
                onMouseEnter={() => setIsOpen(true)}
                onClick={toggleDropdown}
                className='bg-blue-200 text-gray-800 rounded-full p-2 hover:bg-blue-300 focus:outline-none'
              >
                <ProfileIcon />
              </button>
            )}
          </>
        ) : (
          <>
            {/* <Link
              to={routes.signup}
              className='text-sm text-blue-600 hover:underline'
            >
              Signup kkkk
            </Link> */}
            {/* <Link
              to={routes.signin}
              className='text-sm text-blue-600 hover:underline'
            >
              Login
            </Link> */}
          </>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-5 top-[70px] mt-2 w-36 bg-[#2AA166] border-2 border-teal-500  rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="absolute top-[-9px] right-4 w-4 h-4 bg-[#2AA166] border-t-2 border-l-2 border-teal-500  transform rotate-45"></div>


          <div className="py-1">
            <Link to={routes.profile}>
              <a

                className="flex items-center px-4 mt-2 py-2 text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0"
              >
                <User size={18} className='hover:text-white' />
                <span className="ml-3">Profile</span>
              </a> </Link>

            <a
              onClick={logout}
              className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#166534] hover:rounded-md cursor-pointer m-0"
            >
              <LogOut size={16} className='hover:text-white' />
              <span className="ml-3">Logout</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
