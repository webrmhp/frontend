import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideosById } from '../redux/action/request';
import Header from '../components/Header';
import Footer from '../components/footur';

const CourseVideo = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const { courseVidosData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.id) {
      dispatch(getVideosById(data.id));
    }
  }, [data?.id, dispatch]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleOpenModal = (videoLink) => {
    setCurrentVideo(videoLink);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      {courseVidosData && courseVidosData.length > 0 ? (
        <h1 className='text-center mt-3'>
          Let's enjoy <span className='text-[blue]'>course</span>
        </h1>
      ) : (
        ''
      )}
      <div className='course-videos-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-5'>
        {courseVidosData && courseVidosData.length > 0 ? (
          courseVidosData.map((video) => (
            <div
              key={video.id}
              className='course-video-item'
            >
              <div className='max-w-sm rounded-lg overflow-hidden shadow-lg border'>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className='w-full h-48 object-cover cursor-pointer'
                  onClick={() => handleOpenModal(video.link)} // Open modal on thumbnail click
                />
                <div className='p-4'>
                  <h3 className='text-xl font-semibold'>{video.title}</h3>
                  <p className='text-gray-700 mt-2'>{video.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className='text-center mt-3'>
            No videos available for this course.
          </h1>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-4 rounded-lg relative'>
            <button
              className='absolute top-2 right-2 text-xl'
              onClick={handleCloseModal}
            >
              X
            </button>
            <div
              className='video-container'
              style={{
                position: 'relative',
                maxWidth: '100%',
                padding: '10px',
                margin: '20px auto',
                border: '2px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
              dangerouslySetInnerHTML={{
                __html: currentVideo,
              }}
            ></div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CourseVideo;
