import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPaidCourse } from '../redux/action/request';
import { Link } from 'react-router-dom';
const PaidCourse = () => {
  const { paidCourse } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyPaidCourse());
  }, [1000]);

  useEffect(() => {
    console.log(paidCourse);
  }, [paidCourse]);

  return (
    <>
      <ToastContainer />
      <section className='cart-area min-h-screen'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {paidCourse.length > 0 ? (
            <>
              {paidCourse.map((course) => (
                <div
                  key={course.id}
                  className='p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all'
                >
                  <span className='d-flex mb-2'>
                    <img
                      width={100}
                      height={100}
                      className='rounded'
                      src={course?.courseDetails?.courseImage}
                    />

                    <span className='  text-gray-800 m-1'>
                      {course?.courseDetails?.title} || 
                      <small className='text-[#0000FF]  rounded-lg p-1 m-2 text-xs text-center'>
                      {course?.courseDetails?.courseType}
                      </small>{' '}
                      <br />{' '}
                    
                      <small
                        className={
                          course?.status == 'Pending'
                            ? `p-1 bg-[#FFB3B3] text-white rounded-lg m-1`
                            : ``
                        }
                      >
                        {course?.status == 'Pending' ? (
                          <small>Under Review</small>
                        ) : (
                          <small>
                            {course?.status === 'Verified' ? (
                              new Date(course?.courseDetails?.launchedDate) <
                              new Date() ? (
                                <Link
                                  to='/course-videos'
                                  state={{
                                    data: { id: course?.courseDetails?._id },
                                  }}
                                  className='text-blue-500 underline'
                                >
                                  {course?.courseDetails?.courseType == 'Online'
                                    ? 'Explore Course Videos'
                                    : ''}
                                </Link>
                              ) : (
                                <span className='text-red-500'>
                                  Note: As soon as this course starts, you will
                                  be notified.
                                </span>
                              )
                            ) : null}
                          </small>
                        )}
                      </small>
                    </span>
                  </span>

                  <span className='mt-5'>
                    <div className='flex flex-wrap'>
                      {course?.courseDetails?.courseTag.map((data, index) => (
                        <small
                          className='p-1 bg-[#BFDBFE] text-[#0000FF] rounded m-1'
                          key={index}
                        >
                          {data}
                        </small>
                      ))}
                    </div>
                  </span>

                  <p className='text-gray-600 mt-2'>{course.discription}</p>
                </div>
              ))}
            </>
          ) : (
            <span className='text-center'>No Course yet paid</span>
          )}
        </div>
      </section>
    </>
  );
};

export default PaidCourse;
