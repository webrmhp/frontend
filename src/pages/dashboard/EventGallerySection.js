import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addEvent,
  getEvent,
  editEvent,
  deleteTestimonail,
} from '../../redux/action/request';
import { toast, ToastContainer } from 'react-toastify';
import Ediit from '../../assets/icons/Ediit';
import Del from '../../assets/icons/Del';
const EventGallerySection = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.auth || []);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    eventDate: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [guest, setSelectedGuest] = useState();

  useEffect(() => {
    dispatch(getEvent());
  }, [1000]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      if (file) {
        const base64 = await toBase64(file);
        setFormData({ ...formData, image: base64 });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, image, description } = formData;
    if (!title || !image || !description) {
      return toast.error('Please fill all fields');
    }
    try {
      if (editMode) {
        // If editing, update the existing Testimonail
        await dispatch(editEvent({ ...formData, id: formData.id }));
      } else {
        // If adding new, add the Testimonail
        await dispatch(addEvent(formData));
      }

      setFormData({
        title: '',
        image: '',
        description: '',
        eventDate: '',
      });
      setIsModalOpen(false);
      setEditMode(false);
      setSelectedGuest(null);
      setTimeout(() => {
        dispatch(getEvent());
      }, [2000]);
    } catch (err) {
      toast.error('Failed to save Testimonial');
    }
  };

  const handleEdit = (data) => {
    setFormData({
      title: data?.title,
      image: data?.image,
      description: data?.description,
      eventDate: data?.eventDate,
      _id: data?._id,
    });
    setSelectedGuest(data);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTestimonail(id));
      setTimeout(() => {
        dispatch(getEvent());
      }, [2000]);
    } catch (err) {
      toast.error('Failed to delete Event');
    }
  };

  return (
    <div className='p-4'>
      <ToastContainer />

      <div className='flex items-center justify-between bg-[#FFFFFF] p-2 mt-2'>
        <h1 className='text-2xl font-bold'>Event List</h1>
        <div className='ml-auto flex items-center space-x-4'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='px-4 py-2 bg-[#1E90FE] text-white font-semibold rounded-lg hover:text-black transition-colors duration-300 ease-in-out cursor-pointer'
          >
            Add Event
          </button>
        </div>
      </div>

      <div className='overflow-x-auto mt-4'>
        <table className='min-w-full table-auto'>
          <thead className='text-gray-600 uppercase text-sm leading-normal'>
            <tr>
              <th className='py-3 px-6 text-left'>Title</th>
              <th className='py-3 px-6 text-left'>Description</th>
              <th className='py-3 px-6 text-left'>Event Date</th>
              <th className='py-3 px-6 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-gray-700 text-sm'>
            {reduxData?.event?.map((data, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <td className='py-3 px-6 text-left'>
                  <div className='flex items-center space-x-3'>
                    {/* Profile Image */}
                    <img
                      src={data.image}
                      alt='testimonial-img'
                      className='w-12 h-12 rounded-full object-cover border-2 border-[#15833E] shadow-md'
                    />

                    {/* Title */}
                    <div>
                      <span className='font-medium text-gray-800 text-sm'>
                        {data.title}
                      </span>
                    </div>
                  </div>
                </td>

                <td className='py-3 px-8 max-w-xs text-sm text-gray-700 leading-relaxed'>
                  {data?.description}
                </td>

                <td className='py-3 px-6 text-left'>
                  {new Date(data?.eventDate).toLocaleString()}
                </td>
                <td className='py-3 px-2 text-left'>
                  <button
                    onClick={() => handleEdit(data)}
                    className=' py-2  text-white   '
                  >
                    <Ediit />
                  </button>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className='px-4  text-white '
                  >
                    <Del />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-6 rounded-xl shadow-xl w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4 text-center'>
              {editMode ? 'Edit Event' : 'Add Event'}
            </h2>
            <form
              onSubmit={handleSubmit}
              className='space-y-4'
            >
              <div>
                <label className='block text-gray-600 mb-1'>Title</label>
                <input
                  type='text'
                  name='title'
                  className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-1'>Description</label>
                <input
                  name='description'
                  rows='3'
                  className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
                  value={formData.description}
                  placeholder='Describe the event more...'
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className='block text-gray-600 mb-1'>Event Date</label>
                <input
                  name='eventDate'
                  type='date'
                  className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
                  value={formData.eventDate}
                  placeholder='Describe the event more...'
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-1'>Photo</label>
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  className='w-full px-2 py-2 border rounded-xl bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200'
                  onChange={handleChange}
                />
              </div>

              <div className='flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
                >
                  {editMode ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallerySection;
