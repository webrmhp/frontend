import React, { useEffect, useState } from 'react';
import Footer from '../components/footur';
import Header from '../components/Header';
import { getCourseById, enrollCourseNow } from '../redux/action/request';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getCourse } from '../redux/action/request';
import { useNavigate } from 'react-router-dom';
import { routes } from '../contant';
import { Link } from 'react-router-dom';
import {
  Star,
  Clock,
  Globe,
  MoveUpIcon,
  GraduationCap,
  BadgeIcon,
  CheckCircle2,
} from 'lucide-react';

export default function CourseDetail() {
  const { course } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { courseDetail } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCourseById(id));
  }, [id]);

  const enrollCourse = (courseId) => {
    const data = {
      courseId: courseId,
      userId: localStorage.getItem('userId'),
      status: 'AddToCart',
    };
    dispatch(enrollCourseNow(data));
  };

  useEffect(() => {
    dispatch(getCourse());
  }, []);

  const [randomCourses, setRandomCourses] = useState([]);

  useEffect(() => {
    if (course.length > 0) {
      setRandomCourses(course.sort(() => Math.random() - 0.5).slice(0, 3));
    }
  }, [course]);
  console.log(courseDetail, 'courseDetailcourseDetailcourseDetail');
  const orderedTypes = ['defination', 'content', 'outLine', 'scope'];

  const orderedCourseData = orderedTypes
    .map((type) => courseDetail?.courseData?.find((item) => item.type === type))
    .filter(Boolean); // remove undefined if any type is missing
  return (
    <div>
      <ToastContainer />
      <Header />
      <section className='bg-gray-100 py-12'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap -mx-4'>
            <div className='w-full lg:w-3/4 px-4'>
              <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
                <div className='mb-6'>
                  <h5 className='text-2xl font-bold'>{courseDetail?.title}</h5>
                  <div className='flex flex-wrap items-center gap-6 text-sm mt-4'>
                    <div className='flex items-center'>
                      <img
                        src={
                          courseDetail?.courseImage ||
                          'https://via.placeholder.com/150'
                        }
                        alt='Instructor'
                        className='w-12 h-12 border-2 border-[#166534] rounded-full mr-3'
                      />
                      <div>
                        <h6 className='font-semibold'>Instructor</h6>
                        <p className='text-gray-600'>
                          {courseDetail?.instructor || 'Instructor'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h6 className='font-semibold'>Type</h6>
                      <p className='text-gray-600'>
                        {courseDetail?.courseType || 'Web Development'}
                      </p>
                    </div>
                    <div>
                      <h6 className='font-semibold'>Registration Fee</h6>
                      <p className='text-gray-600'>{courseDetail?.prize}Rs</p>
                    </div>
                    {/* <span className='flex '>
                    

                        {[1, 2, 3, 4,5].map((_, index) => (
                          <Star
                            key={index}
                            className='w-4 h-4 text-yellow-400 fill-current'
                          />
                        ))}
                        <br/>
                                            <h6 className='font-semibold'>Rating</h6>

                       
                       
                      </span> */}
                  </div>
                </div>
                <div className='mb-6'>
                  <img
                    src={
                      courseDetail?.courseImage ||
                      'https://via.placeholder.com/800x400'
                    }
                    alt='Course Banner'
                    className='w-full rounded-lg'
                  />
                </div>
                <div className='prose max-w-none'>
                  {orderedCourseData.map((section) => (
                    <div
                      key={section._id}
                      className='mb-6'
                    >
                      <h3 className='text-lg font-bold mb-2'>
                        {section.heading}
                      </h3>
                      <div className='prose max-w-none'>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: section.description,
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <p className='text-center mb-4'>
                    Just WhatsApp the given below number to get the entire
                    course content details in a PDF file.
                  </p>
                  <p className='text-center font-bold'>03034321118</p>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-1/4 px-4 mt-6 lg:mt-0'>
              {/* Course Details */}
              <div className='bg-white rounded-lg shadow-md p-2 mb-6'>
                <h5 className='text-xl font-bold mb-4 text-center'>
                  Course Details
                </h5>
                <ul className='space-y-2 text-sm'>
                  <li>
                    <div className='inline-flex items-center px-3 py-1 bg-gray-100 rounded-full shadow-sm'>
                      <Clock className='h-4 w-4 text-gray-600 mr-2' />
                      <span className='ml-2 text-gray-800'>
                        {courseDetail?.duration || '3-Months'}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className='inline-flex items-center px-3 py-1 bg-gray-100 rounded-full shadow-sm'>
                      <Globe className='h-4 w-4 text-gray-600 mr-2' />
                      <span className='ml-2 text-gray-800 line-clamp-2'>
                        {courseDetail?.language}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className='inline-flex items-center px-3 py-1 bg-gray-100 rounded-full shadow-sm'>
                      <MoveUpIcon className='h-4 w-4 text-gray-600 mr-2' />
                      <span className='ml-2 text-gray-800'>
                        {courseDetail?.skill}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className='inline-flex items-center px-3 py-1 bg-gray-100 rounded-full shadow-sm'>
                      <GraduationCap className='h-4 w-4 text-gray-600 mr-2' />
                      <span className='ml-2 text-gray-800'>
                        {courseDetail?.subject || 'Website Development'}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className='inline-flex items-center px-3 py-1 bg-gray-100 rounded-full shadow-sm'>
                      <BadgeIcon className='h-4 w-4 text-gray-600 mr-2' />
                      <span className='font-semibold'>Certification:</span>
                      <span className='ml-2 text-gray-800 flex items-center'>
                        Yes{' '}
                        <CheckCircle2 className='ml-1 h-4 w-4 text-green-600' />
                      </span>
                    </div>
                  </li>
                </ul>

                <button
                  onClick={() => {
                    if (localStorage.getItem('token')) {
                      enrollCourse(courseDetail?._id);
                    } else {
                      navigate(routes.signin);
                    }
                  }}
                  className='w-full bg-[#166534] text-white font-semibold py-2 px-4 rounded-lg mt-6 transition duration-300'
                >
                  Enroll Course
                </button>
              </div>

              {/* Related Course */}
              <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
                <h5 className='text-xl font-bold mb-4 text-center'>
                  Related Course
                </h5>
                <div className='space-y-4'>
                  {randomCourses.map((obj, index) => (
                    <RelatedCourse
                      key={index}
                      id={obj?._id}
                      title={obj?.title}
                      subject={obj?.subject}
                      image={obj?.courseImage}
                    />
                  ))}
                </div>
              </div>

              {/* Course Tags */}
              <div className='bg-white rounded-lg shadow-md p-6'>
                <h5 className='text-xl font-bold mb-4'>Course Tag</h5>
                <div className='flex flex-wrap gap-2'>
                  {courseDetail?.courseTag?.length > 0 ? (
                    courseDetail?.courseTag?.map((tag) => (
                      <a
                        key={tag}
                        href='/'
                        className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition duration-300'
                      >
                        {tag}
                      </a>
                    ))
                  ) : (
                    <>
                      {['HTML', 'CSS', 'JavaScript'].map((tag) => (
                        <a
                          key={tag}
                          href='/'
                          className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition duration-300'
                        >
                          {tag}
                        </a>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const RelatedCourse = ({ id, subject, title, image }) => {
  return (
    <div className='flex items-center'>
      {image ? (
        <img
          src={image}
          alt={title}
          className='w-20 h-20 object-cover rounded-lg mr-4'
          onError={(e) => (e.target.style.display = 'none')}
        />
      ) : (
        <div className='w-20 h-20 flex items-center justify-center bg-gray-300 text-white text-xl font-bold rounded-lg mr-4'>
          {title?.slice(0, 2).toUpperCase()}
        </div>
      )}

      <div>
        <Link
          to={routes.courseDetail.replace(':id', id)}
          className='font-semibold mb-1 text-black hover:underline'
        >
          {title || 'Course Title'}
        </Link>

        <div className='flex'>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Star
              key={index}
              className='w-4 h-4 text-yellow-400 fill-current'
            />
          ))}
        </div>
        <small>{subject}</small>
      </div>
    </div>
  );
};
