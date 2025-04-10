import React, { useEffect } from 'react';
import { getLogo } from '../../redux/action/request';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../contant';
import { useDispatch, useSelector } from 'react-redux';
const Sidebar = ({ setActiveSection, activeSection }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.auth || []);
  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate(routes.signin);
  };

  useEffect(() => {
    dispatch(getLogo());
  }, [1000]);

  return (
    <div className='w-64 bg-white shadow h-full'>
      <div className='px-6 py-2'>
        <h3 className='text-xl font-semibold'>
          {reduxData.logo.length > 0 ? (
            <img
              src={reduxData.logo[0].image}
              alt='Company Logo'
              width={100}
              height={100}
              className='object-contain'
            />
          ) : (
            'Logo'
          )}
        </h3>
      </div>

      <div>
        <li
          className={`flex items-center space-x-2 p-4 rounded cursor-pointer ${
            activeSection === 'Dashboard'
              ? 'bg-blue-100 text-blue-500'
              : 'hover:bg-gray-200'
          }`}
          onClick={() => handleNavigation('Dashboard')}
        >
          <i className='fas fa-tachometer-alt'></i>
          <span>Dashboard</span>
        </li>

        <li
          className={`flex items-center space-x-2 p-4 rounded cursor-pointer ${
            activeSection === 'Slider'
              ? 'bg-blue-100 text-blue-500'
              : 'hover:bg-gray-200'
          }`}
          onClick={() => handleNavigation('Slider')}
        >
          <i className='fas fas fa-images  '></i>

          <span>Manage Gallery</span>
        </li>
        <li
          className={`flex items-center space-x-2 p-4 rounded cursor-pointer ${
            activeSection === 'Users'
              ? 'bg-blue-100 text-blue-500'
              : 'hover:bg-gray-200'
          }`}
          onClick={() => handleNavigation('Users')}
        >
          <i className='fas fa-users'></i>
          <span>Users</span>
        </li>
        <li
          className={`flex items-center space-x-2 p-4 rounded cursor-pointer ${
            activeSection === 'Course'
              ? 'bg-blue-100 text-blue-500'
              : 'hover:bg-gray-200'
          }`}
          onClick={() => handleNavigation('Course')}
        >
          <i className='fas fa-building'></i>
          <span>Course</span>
        </li>
        <li
          className={`flex items-center space-x-2 p-4 rounded cursor-pointer ${
            activeSection === 'Serach Panel'
              ? 'bg-blue-100 text-blue-500'
              : 'hover:bg-gray-200'
          }`}
          onClick={() => handleNavigation('Serach Panel')}
        >
          <i className='fas fa-file-alt'></i>
          <span>Course Activities</span>
        </li>
      </div>
      <div className='absolute bottom-4 left-6'>
        <button
          onClick={logout}
          className='text-red-500'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
