import React, { useEffect, useState } from 'react';
import { getCourse, getCourseByMode } from '../redux/action/request';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '../contant';
import { useLocation } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';

const Course = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [visibleCourses, setVisibleCourses] = useState(6);
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.auth);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    if (type) {
      setLoading(true);
      dispatch(getCourseByMode(type));
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      setLoading(true);

      dispatch(getCourse());
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [type]);
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    if (course && Array.isArray(course)) {
      // Loop through the course array
      const newSubjects = course.map((item) => item.subject);
      // Only add new subjects that are not already in the subjects state
      setSubjects((prevSubjects) => [
        ...prevSubjects,
        ...newSubjects.filter((subject) => !prevSubjects.includes(subject)),
      ]);
    }
  }, [course]);

  const filterCourses = () => {
    if (selectedCategory === 'All') {
      return course;
    }
    return course.filter((course) => course.subject === selectedCategory);
  };

  const loadMoreCourses = () => {
    setVisibleCourses(visibleCourses + 6); // Load 6 more courses
  };

  return (
    <div className='p-6 bg-gradient-to-r from-blue-600 via-teal-700 to-teal-600'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-extrabold text-white'>
          Our Premium Courses
        </h1>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-96'>
          <Circles
            height='40'
            width='40'
            color='#1E90FF'
            ariaLabel='loading'
          />
        </div>
      ) : (
        <>
          <div className='overflow-x-auto mb-6 p-5 bg-[#166534] rounded'>
            <div className='flex space-x-4 whitespace-nowrap flex-wrap sm:flex-nowrap'>
              <button
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  selectedCategory === 'All'
                    ? 'bg-green-800 text-white shadow-lg border-2 border-white'
                    : 'bg-white text-green-800'
                }`}
                onClick={() => setSelectedCategory('All')}
              >
                All
              </button>

              {subjects?.map((obj, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                    selectedCategory === obj
                      ? 'bg-green-800 text-white shadow-lg border-2 border-white'
                      : 'bg-white text-green-800'
                  } ${index !== 0 ? 'mt-1' : ''}`} // Add mt-4 for the next row
                  onClick={() => setSelectedCategory(obj)}
                >
                  {obj}
                </button>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {filterCourses()
              .slice(0, visibleCourses)
              .map((course, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(
                      `${routes.courseDetail.replace(':id', course._id)}`
                    );
                  }}
                  className='p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer'
                >
                  <div className='flex justify-between items-center'>
                    {/* Left-aligned div */}
                    <div className='flex items-center space-x-2'>
                      <small className='bg-[#16B5A7] text-white p-1 rounded font-semibold'>
                        {course?.courseType}
                      </small>
                      <span className='text-red-500 font-medium'>
                        Limited Seats
                      </span>
                    </div>

                    {/* Right-aligned div */}
                    <div className='flex items-center space-x-2'>
                      <span className='text-green-600 font-bold'>
                        Now {course?.prize}Rs
                      </span>
                      <span className='text-gray-500 line-through'>
                        {course?.prize * 2}Rs
                      </span>
                    </div>
                  </div>

                  <img
                    src={course.courseImage}
                    alt={course.title}
                    className='w-20 h-20 mx-auto rounded-full mb-4 shadow-lg'
                  />
                  <h2 className='text-center text-xl font-bold text-gray-800 mb-2'>
                    {course.title}
                  </h2>
                  <p className='text-center text-gray-600 text-sm mb-2'>
                    {course.discription}
                  </p>
                  <p className='text-center text-teal-500 font-semibold'>
                    {course.duration}
                  </p>
                  <div className='flex justify-center mt-2'>
                    {/* Star rating */}
                    {[...Array(5)].map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                        className='w-5 h-5 text-yellow-400'
                      >
                        <path d='M12 .587l3.668 7.429L24 9.748l-6 5.851 1.417 8.268L12 18.897l-7.417 4.97L6 15.599 0 9.748l8.332-1.732L12 .587z' />
                      </svg>
                    ))}{' '}
                    (5/5)
                  </div>
                </div>
              ))}
          </div>
          <div className='text-center mt-6'>
            <button
              className='px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-all duration-300'
              onClick={loadMoreCourses}
            >
              Load More
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Course;
