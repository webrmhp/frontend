import React, { useEffect } from 'react';
import imag1 from '../assets/image/eventsone/1.jpg';
import Header from '../components/Header';
import Footer from '../components/footur';
import { getEvent } from '../redux/action/request';
import { useDispatch, useSelector } from 'react-redux';

const Event = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.auth || []);
  useEffect(() => {
    dispatch(getEvent());
  }, [1000]);
  return (
    <>
      <Header />
      <div className='container mt-5'>
        <div className='row'>
          {reduxData?.event?.map((card, index) => (
            <div
              className='col-md-4 col-sm-6 mb-4'
              key={index}
            >
              <div
                className='card shadow-sm'
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'translateY(-10px)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'translateY(0)')
                }
              >
                {/* Image Wrapper with Date Bubble */}
                <div className='position-relative'>
                  <img
                    src={card.image}
                    className='card-img-top'
                    alt={`Card ${index + 1}`}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div
                    className='position-absolute top-0 end-0 bg-success text-white rounded-pill px-2 py-1 m-2 small'
                    style={{ fontSize: '12px' }}
                  >
                    {card.title} ||{' '}
                    {new Date(card.eventDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    })}
                  </div>
                </div>

                <div className='card-body d-flex flex-column justify-content-center text-center'>
                  <h5 className='card-title'>{card.title}</h5>
                  <p className='card-text'>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Event;
