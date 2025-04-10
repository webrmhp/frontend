import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addGuest,
  getSlider,
  editGuest,
  deleteSlider,
  getGuest,
} from '../../redux/action/request';
import { toast, ToastContainer } from 'react-toastify';
import Ediit from '.././../assets/icons/Ediit';
import Del from '.././../assets/icons/Del';
const GallerySection = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.auth || []);
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    image: '',
    link: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [guest, setSelectedGuest] = useState();

  useEffect(() => {
    dispatch(getGuest());
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
    const { status, name, image } = formData;
    if (!status || !name || !image) {
      return toast.error('Please fill all fields');
    }
    try {
      if (editMode) {
        // If editing, update the existing slider
        await dispatch(editGuest({ ...formData, id: formData.id }));
      } else {
        // If adding new, add the slider
        await dispatch(addGuest(formData));
      }

      setFormData({ name: '', status: '', image: '', link: '' });
      setIsModalOpen(false);
      setEditMode(false);
      setSelectedGuest(null);
      setTimeout(() => {
        dispatch(getGuest());
      }, [2000]);
    } catch (err) {
      toast.error('Failed to save slider');
    }
  };

  const handleEdit = (data) => {
    setFormData({
      name: data?.name,
      status: data?.status,
      image: data?.image,
      link: data?.link,
      _id: data?._id,
    });
    setSelectedGuest(data);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteSlider(id));
      toast.success('Guest removed successfully');
      setTimeout(() => {
        dispatch(getSlider());
      }, [2000]);
    } catch (err) {
      toast.error('Failed to delete guest');
    }
  };
  return (
    <div className='p-4'>
      <ToastContainer />

      <div className='flex items-center justify-between bg-[#FFFFFF] p-2 mt-2'>
        <h1 className='text-2xl font-bold'>Guest List</h1>
        <div className='ml-auto flex items-center space-x-4'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='px-4 py-2 bg-[#1E90FE] text-white font-semibold rounded-lg hover:text-black transition-colors duration-300 ease-in-out cursor-pointer'
          >
            Add Guest
          </button>
        </div>
      </div>

      <div className='overflow-x-auto mt-4'>
        <table className='min-w-full table-auto'>
          <thead className='text-gray-600 uppercase text-sm leading-normal'>
            <tr>
              <th className='py-3 px-6 text-left'>Name</th>
              <th className='py-3 px-6 text-left'>Blog Link</th>
              <th className='py-3 px-6 text-left'>Added</th>
              <th className='py-3 px-6 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-gray-700 text-sm'>
            {reduxData?.guest?.map((Guest, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <td className='py-3 px-6 text-left d-flex'>
                  <img
                    src={Guest.image}
                    alt='guest-img'
                    className='w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm mr-2'
                  />
                  <span className='font-medium text-gray-800 mt-1'>
                    {Guest.name}
                    <br />
                    <span className='text-[blue]'>{Guest.status}</span>
                  </span>
                </td>
                <td className='py-3 px-6 text-left'>
                  {Guest?.link ? <a href={Guest?.link}>More Detail</a> : ''}
                </td>
                <td className='py-3 px-6 text-left'>
                  {new Date(Guest?.addedAt).toLocaleString()}
                </td>
                <td className='py-3 px-2 text-left'>
                  <button
                    onClick={() => handleEdit(Guest)}
                    className=' py-2  text-white   '
                  >
                    <Ediit />
                  </button>
                  <button
                    onClick={() => handleDelete(Guest._id)}
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
              {editMode ? 'Edit Guest' : 'Add Guest'}
            </h2>
            <form
              onSubmit={handleSubmit}
              className='space-y-4'
            >
              <div>
                <label className='block text-gray-600 mb-1'>Name</label>
                <input
                  type='text'
                  name='name'
                  className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-1'>Status</label>
                <input
                  name='status'
                  rows='3'
                  className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
                  value={formData.status}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-1'>
                  Related Blog Link
                </label>
                <input
                  name='link'
                  className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
                  value={formData.link}
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

export default GallerySection;
