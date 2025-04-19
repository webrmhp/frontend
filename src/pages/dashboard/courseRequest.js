import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner';
import {
  getWholeCourseList,
  getRequestVerified,
} from '../../redux/action/auth';
import { useDispatch, useSelector } from 'react-redux';
import Ediit from '../../assets/icons/Ediit';

const CourseRequest = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [1000]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { requestList } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getWholeCourseList());
  }, [1000]);

  useEffect(() => {}, [requestList]);
  const getTimeDifference = (dateString) => {
    const uploadedDate = new Date(dateString);
    const currentDate = new Date();

    const diffInMs = currentDate - uploadedDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) {
      return 'today';
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl);
    setIsModalOpen(true);
  };
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <ToastContainer />
      {!loading ? (
        <>
          {' '}
          <div className='flex items-center justify-between bg-[#FFFFFF] p-2'>
            <h1 className='text-2xl font-bold'>Course Request List</h1>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto'>
              <thead className='text-gray-600 uppercase text-sm leading-normal'>
                <tr>
                  <th className='py-3 px-6 text-left'>Student</th>
                  <th className='py-3 px-6 text-left'>Course</th>
                  <th className='py-3 px-6 text-left'>Challen</th>
                  <th className='py-3 px-6 text-left'>Delivered</th>
                  <th className='py-3 px-6 '>Verification</th>
                </tr>
              </thead>
              <tbody className='text-gray-700 text-sm'>
                {requestList?.map((obj, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    <td className='px-4 py-2 text-left'>
                      <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                        {obj?.userDetails?.profilePhoto ? (
                          <img
                            src={obj.userDetails.profilePhoto}
                            alt='Profile'
                            className='w-10 h-10 rounded-full object-cover border-1 border-[#15833E]'
                          />
                        ) : (
                          <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700 border-1 border-[#15833E]'>
                            {obj?.userDetails?.name?.slice(0, 2).toUpperCase()}
                          </div>
                        )}

                        <div className='flex flex-col'>
                          <span className='font-medium text-gray-800'>
                            {obj?.userDetails?.name}
                          </span>
                          <small className='text-[#0079BA]'>
                            {obj?.userDetails?.email}
                          </small>
                          <small className='bg-[#1E90FE] text-white rounded px-2 py-0.5 text-xs mt-1 sm:mt-0'>
                            {obj?.userDetails?.phone}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td className='px-4 py-2 text-left'>
                      <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                        {obj?.courseDetails?.courseImage ? (
                          <img
                            src={obj.courseDetails.courseImage}
                            alt='Course'
                            className='w-10 h-10 rounded-full object-cover border-1 border-[#15833E]'
                          />
                        ) : (
                          <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700 border-1 border-[#15833E]'>
                            {obj?.courseDetails?.title
                              ?.slice(0, 2)
                              .toUpperCase()}
                          </div>
                        )}

                        <div className='flex flex-col'>
                          <span className='font-medium text-gray-800'>
                            {obj?.courseDetails?.title}
                          </span>
                          <small className='text-[#0079BA]'>
                            {obj?.courseDetails?.email}
                          </small>
                          <small className='bg-[#1E90FE] text-white rounded px-2 py-0.5 text-xs mt-1 sm:mt-0'>
                            {obj?.courseDetails?.prize}Rs
                          </small>
                        </div>
                      </div>
                    </td>

                    <td className='py-3 px-6 text-left'>
                      <img
                        src={obj?.paidChallan}
                        alt='Profile'
                        className='w-10 h-10 object-cover border border-[#15833E] cursor-pointer'
                        onClick={() => handleImageClick(obj?.paidChallan)}
                      />
                    </td>
                    <td className=' justify-center items-center text-center'>
                      {getTimeDifference(obj?.uploadedAt)}
                    </td>
                   
                    <td key={obj._id}>
                      <select
                        value={obj.status}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          dispatch(getRequestVerified(obj._id, newStatus));

                          setTimeout(() => {
                            dispatch(getWholeCourseList());
                          }, 2000);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300
      ${
        obj.status === 'Verified'
          ? 'bg-green-500 text-white'
          : obj.status === 'Rejected'
          ? 'bg-red-500 text-white'
          : 'bg-gray-300 text-gray-700'
      }`}
                      >
                        <option value='Pending'>⏳ Pending</option>
                        <option value='Verified'>✅ Verified</option>
                        <option value='Rejected'>❌ Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50'>
              <div className='bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full'>
                <div className='flex justify-end'>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className='text-red-500 text-lg font-bold'
                  >
                    &times;
                  </button>
                </div>
                <img
                  src={previewImage}
                  alt='Full Preview'
                  className='w-full h-auto rounded'
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Circles
            height='40'
            width='40'
            color='#1E90FF'
            ariaLabel='loading'
          />
        </div>
      )}
    </div>
  );
};

export default CourseRequest;
