import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSlider,
  getSlider,
  editSlider,
  deleteSlider,
  addLogo,
  getLogo,
  editLogo,
  deleteLogo,
} from '../../redux/action/request';
import { Circles } from 'react-loader-spinner';
import GallerySection from './AppGallery';
import { toast, ToastContainer } from 'react-toastify';
import Ediit from '.././../assets/icons/Ediit';
import Del from '.././../assets/icons/Del';
const SliderPanel = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.auth || []);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [editLogoMode, setLogoEditMode] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null); // To hold the slider being edited
  const [loader, setLoader] = useState(true); // To hold the slider being edited
  useEffect(() => {
    dispatch(getSlider());
    dispatch(getLogo());
    setTimeout(() => {
      setLoader(false);
    }, [4000]);
  }, [dispatch]);

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

  const [logoData, setLogoData] = useState([{ image: '', _id: '' }]);

  const handleLogoChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      if (file) {
        const base64 = await toBase64(file);
        setLogoData({ ...logoData, image: base64 });
      }
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlelogoSubmit = async (e) => {
    e.preventDefault();
    const { image } = logoData;

    if (!image) {
      return toast.error('Please fill all fields');
    }
    try {
      if (editLogoMode) {
        await dispatch(editLogo({ ...logoData, id: logoData._id }));
      } else {
        // If adding new, add the slider
        await dispatch(addLogo(logoData));
      }
      setLogoData({ image: '', _id: '' });
      setIsLogoModalOpen(false);
      setLogoEditMode(false);
      setTimeout(() => {
        dispatch(getLogo());
      }, [2000]);
    } catch (err) {
      toast.error('Failed to save slider');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, image } = formData;

    if (!title || !description || !image) {
      return toast.error('Please fill all fields');
    }
    try {
      if (editMode) {
        // If editing, update the existing slider
        await dispatch(editSlider({ ...formData, id: formData._id }));
      } else {
        // If adding new, add the slider
        await dispatch(addSlider({ title, description, image }));
      }

      setFormData({ title: '', description: '', image: '' });
      setIsModalOpen(false);
      setEditMode(false);
      setSelectedSlider(null);
      setTimeout(() => {
        dispatch(getSlider());
      }, [2000]);
    } catch (err) {
      toast.error('Failed to save slider');
    }
  };

  const handleEdit = (slider) => {
    setFormData({
      title: slider.title,
      description: slider.description,
      image: slider.image,
      _id: slider?._id,
    });
    setSelectedSlider(slider);
    setEditMode(true);
    setIsModalOpen(true);
  };
  const handleLogoEdit = (logo) => {
    setLogoData({
      image: logo.image,
      _id: logo?._id,
    });
    setLogoEditMode(true);
    setIsLogoModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteSlider(id));
      toast.success('Slider deleted successfully');
      setTimeout(() => {
        dispatch(getSlider());
      }, [2000]);
    } catch (err) {
      toast.error('Failed to delete slider');
    }
  };

  const handleLogoDelete = async (id) => {
    try {
      await dispatch(deleteLogo(id));
      toast.success('Logo deleted successfully');
      setTimeout(() => {
        dispatch(getLogo());
      }, [2000]);
    } catch (err) {
      toast.error('Failed to delete slider');
    }
  };

  return (
    <>
      {' '}
      <div className='p-4'>
        <ToastContainer />

        <div className='flex items-center justify-between bg-[#FFFFFF] p-2'>
          <h1 className='text-2xl font-bold'>Logo</h1>
          {reduxData?.logo.length >= 1 ? (
            ''
          ) : (
            <div className='ml-auto flex items-center space-x-4'>
              <button
                onClick={() => setIsLogoModalOpen(true)}
                className='px-4 py-2 bg-[#1E90FE] text-white font-semibold rounded-lg hover:text-black transition-colors duration-300 ease-in-out cursor-pointer'
              >
                Add Logo
              </button>
            </div>
          )}
        </div>

        <div className='overflow-x-auto mt-4'>
          <table className='min-w-full table-auto'>
            <thead className='text-gray-600 uppercase text-sm leading-normal'>
              <tr>
                <th className='py-3 px-6 text-left'>Created</th>
                <th className='py-3 px-6 text-left'>Last Updated</th>
                <th className='py-3 px-6 text-left'>Image</th>
                <th className='py-3 px-6 text-left'>Actions</th>
              </tr>
            </thead>

            <tbody className='text-gray-700 text-sm'>
              {loader ? (
                <tr>
                  <td colSpan='4'>
                    <div className='flex justify-center items-center h-32'>
                      <Circles
                        height='40'
                        width='40'
                        color='#1E90FF'
                        ariaLabel='loading'
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                reduxData?.logo?.map((logo, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    <td className='py-3 px-6 text-left'>
                      {new Date(logo?.createdAt).toLocaleString()}
                    </td>
                    <td className='py-3 px-6 text-left'>
                      {new Date(logo?.lastUpdated).toLocaleString()}
                    </td>
                    <td className='py-3 px-6 text-left'>
                      <img
                        src={logo.image}
                        alt='slider-img'
                        className='w-20 h-12 rounded-md object-cover'
                      />
                    </td>
                    <td className='py-3 px-2 text-left'>
                      <button
                        onClick={() => handleLogoEdit(logo)}
                        className='py-2 text-white'
                      >
                        <Ediit />
                      </button>
                      <button
                        onClick={() => handleLogoDelete(logo._id)}
                        className='px-4 text-white'
                      >
                        <Del />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <hr className='ml-5 mr-5 mt-4' />

        <div className='flex items-center justify-between bg-[#FFFFFF] p-2 mt-5'>
          <h1 className='text-2xl font-bold'>Sliders</h1>
          <div className='ml-auto flex items-center space-x-4'>
            <button
              onClick={() => setIsModalOpen(true)}
              className='px-4 py-2 bg-[#1E90FE] text-white font-semibold rounded-lg hover:text-black transition-colors duration-300 ease-in-out cursor-pointer'
            >
              Add Slider
            </button>
          </div>
        </div>

        <div className='overflow-x-auto mt-4'>
          <table className='min-w-full table-auto'>
            <thead className='text-gray-600 uppercase text-sm leading-normal'>
              <tr>
                <th className='py-3 px-6 text-left'>Title</th>
                <th className='py-3 px-6 text-left'>Description</th>
                <th className='py-3 px-6 text-left'>Image</th>
                <th className='py-3 px-6 text-left'>Actions</th>
              </tr>
            </thead>

            <tbody className='text-gray-700 text-sm'>
              {loader ? (
                <tr>
                  <td colSpan='4'>
                    <div className='flex justify-center items-center h-32'>
                      <Circles
                        height='40'
                        width='40'
                        color='#1E90FF'
                        ariaLabel='loading'
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                reduxData?.slider?.map((slider, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    <td className='py-3 px-6 text-left'>{slider.title}</td>
                    <td className='py-3 px-1 text-left max-w-xs truncate'>
                      {slider.description}
                    </td>

                    <td className='py-3 px-6 text-left'>
                      <img
                        src={slider.image}
                        alt='slider-img'
                        className='w-20 h-12 rounded-md object-cover'
                      />
                    </td>
                    <td className='py-3 px-2 text-left'>
                      <button
                        onClick={() => handleEdit(slider)}
                        className='py-2 text-white'
                      >
                        <Ediit />
                      </button>
                      <button
                        onClick={() => handleDelete(slider._id)}
                        className='px-4 text-white'
                      >
                        <Del />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {isLogoModalOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-xl shadow-xl w-full max-w-md'>
              <h2 className='text-xl font-bold mb-4 text-center'>
                {editMode ? 'Edit Logo' : 'Add Logo'}
              </h2>
              <form
                onSubmit={handlelogoSubmit}
                className='space-y-4'
              >
                <div>
                  <input
                    type='file'
                    name='image'
                    accept='image/*'
                    className='w-full px-2 py-2 border rounded-xl bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200'
                    onChange={handleLogoChange}
                  />
                </div>

                <div className='flex justify-end space-x-3'>
                  <button
                    type='button'
                    onClick={() => setIsLogoModalOpen(false)}
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
        {isModalOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-xl shadow-xl w-full max-w-md'>
              <h2 className='text-xl font-bold mb-4 text-center'>
                {editMode ? 'Edit Slider' : 'Add Slider'}
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
                  <label className='block text-gray-600 mb-1'>
                    Description
                  </label>
                  <textarea
                    name='description'
                    rows='3'
                    className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div>
                  <label className='block text-gray-600 mb-1'>Image</label>
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
      <hr className='ml-5 mr-5' />
      <GallerySection />
    </>
  );
};

export default SliderPanel;
