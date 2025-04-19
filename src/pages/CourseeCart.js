import { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/action/auth';
import axios from 'axios';
import {
  getMyAddToCartCourse,
  removeMyAllCourse,
  uploadChallan,
  getMyPaidCourse,
} from '../redux/action/request';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Upload, X } from 'lucide-react';
pdfMake.vfs = pdfFonts?.pdfMake?.vfs;

export default function Cart() {
  const { profile } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const { addToCartCourse } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const fileInputRef = useRef(null);
  useEffect(() => {
    dispatch(getMyAddToCartCourse('AddToCart'));
  }, [dispatch]);
  const { paidCourse } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMyPaidCourse());
  }, [1000]);

  useEffect(() => {
    console.log(paidCourse);
  }, [paidCourse]);

  const toggleModal = () => {
    setShowInvoiceModal(!showInvoiceModal);
  };

  const handleCheckboxChange = (courseId, isChecked) => {
    if (isChecked) {
      setSelectedCourses((prev) => {
        const updatedCourses = [...prev, courseId];
        const course = addToCartCourse.find(
          (course) => course?.courseDetails._id === courseId
        );
        setTotal(total + course?.courseDetails?.prize);
        return updatedCourses;
      });
    } else {
      setSelectedCourses((prev) => {
        const updatedCourses = prev.filter((id) => id !== courseId);
        const course = addToCartCourse.find(
          (course) => course?.courseDetails._id === courseId
        );
        setTotal(total - course?.courseDetails?.prize);
        return updatedCourses;
      });
    }
  };

  const removeCourseFromCart = () => {
    const data = { courseIds: selectedCourses };
    dispatch(removeMyAllCourse(data));
    setTimeout(() => {
      dispatch(getMyAddToCartCourse('AddToCart'));
      setSelectedCourses([]);
    }, 2000);
  };

  const generateInvoice = () => {
    toggleModal();
  };

  const download = () => {
    const totalAmount = addToCartCourse.reduce(
      (total, course) => total + course?.courseDetails?.prize,
      0
    );

    const docDefinition = {
      content: [
        { text: 'Invoice', style: 'header' },
        { text: 'Selected Courses:', style: 'subheader' },
        ...addToCartCourse.map((course) => ({
          text: `${course?.courseDetails?.title} - Rs: ${course?.courseDetails?.prize}`,
          style: 'bodyText',
        })),
        {
          text: `Grand Total: Rs ${totalAmount}`,
          style: 'totalAmount',
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          color: 'blue',
        },
        subheader: {
          fontSize: 16,
          italics: true,
          margin: [0, 10, 0, 5],
        },
        bodyText: {
          fontSize: 12,
          margin: [0, 5],
        },
        totalAmount: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 5],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download('invoice.pdf');
  };
  const [Id, setId] = useState('');
  const [challan, setChallan] = useState('');

  const handleFileRead = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setChallan(reader.result);
      };
      reader.onerror = (error) => {
        console.error('Error converting file:', error);
      };
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    handleFileRead(droppedFile);
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    handleFileRead(selectedFile);
  };

  // Handle onClick for file input trigger
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Ensure that the ref is available before clicking
    }
  };

  const onSubmit = () => {
    if (!Id || Id == '') {
      toast.error('Please select any course');
      return;
    }
    if (!challan) {
      toast.error('Please upload paid challen');
      return;
    }
    dispatch(uploadChallan(Id, { paidChallan: challan }));

    setTimeout(() => {
      dispatch(getMyAddToCartCourse('AddToCart'));
      dispatch(getMyPaidCourse());
      setIsOpen(false);
      setChallan('');
    }, 3000);
  };

  const [showModal, setShowModal] = useState(false);
  const [accountPassword, setAccountPassword] = useState('');
  const [showLMSPassword, setShowLMSPassword] = useState(false);
  const [error, setError] = useState('');

  // const REACT_APP_API_BASE_URL = 'http://localhost:3000';
  const REACT_APP_API_BASE_URL = 'https://backend-bay-six-18.vercel.app';
  const handleVerifyPassword = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${REACT_APP_API_BASE_URL}/users/verify-password`,
        { password: accountPassword, email: profile?.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.statusCode == 200) {
        setShowLMSPassword(true);
        setShowModal(false);
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };
  return (
    <>
      <section className='    p-4 sm:p-8  '>
        <div className='container'>
          <div className='flex items-center justify-between m-2'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
              Your Cart
            </h1>
            <button
              onClick={() => setIsOpen(true)}
              className='flex items-center gap-2 px-4 py-2 bg-[#166534] text-white rounded hover:bg-[#166534] transition-all'
            >
              <Upload className='w-5 h-5' />
              Add New Request
            </button>
          </div>
          <div className='flex flex-col lg:flex-row gap-6'>
            {/* Course List */}
            <div className='w-full lg:w-8/12'>
              <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6'>
                {addToCartCourse.length > 0 ? (
                  <div className='overflow-x-auto'>
                    <table className='w-full'>
                      <thead>
                        <tr className='bg-gray-100'>
                          <th className='p-2 sm:p-3 text-left'>Select</th>
                          <th className='p-2 sm:p-3 text-left'>Thumbnail</th>
                          <th className='p-2 sm:p-3 text-left'>Course</th>
                          <th className='p-2 sm:p-3 text-left hidden sm:table-cell'>
                            Duration
                          </th>
                          <th className='p-2 sm:p-3 text-left'>Fee</th>
                          <th className='p-2 sm:p-3 text-left'>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addToCartCourse.map((course) => (
                          <tr
                            key={course.id}
                            className='border-b border-gray-200 hover:bg-gray-50 transition-all'
                          >
                            <td className='p-2 sm:p-3'>
                              <input
                                type='checkbox'
                                className='form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded'
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    course?.courseDetails?._id,
                                    e.target.checked
                                  )
                                }
                              />
                            </td>
                            <td className='p-2 sm:p-3'>
                              <img
                                src={course?.courseDetails.courseImage}
                                alt={course?.courseDetails?.title}
                                className='w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg'
                              />
                            </td>
                            <td className='p-2 sm:p-3'>
                              <p className='text-sm sm:text-base text-gray-800 font-medium'>
                                {course?.courseDetails?.title}
                              </p>
                            </td>
                            <td className='p-2 sm:p-3 text-gray-600 hidden sm:table-cell'>
                              {course?.courseDetails?.duration}
                            </td>

                            <td className='p-2 sm:p-3 text-gray-800 font-semibold'>
                              Rs: {course?.courseDetails?.prize}
                            </td>
                            <td className='p-2 sm:p-3'>
                              <label className='cursor-pointer flex items-center gap-2'>
                                <span
                                  className={`
      px-2 py-1 rounded-full text-xs font-medium
      ${
        course?.status === 'AddToCart'
          ? 'bg-yellow-100 text-yellow-700'
          : course?.status === 'Pending'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-green-100 text-green-700'
      }
    `}
                                >
                                  {course?.status === 'AddToCart'
                                    ? 'New in Cart'
                                    : course?.status === 'Pending'
                                    ? 'Under Review'
                                    : 'Verified'}
                                </span>
                              </label>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className='text-center py-6'>
                    <p className='text-gray-600'>
                      No courses in your cart yet.
                    </p>
                  </div>
                )}
                {/* Remove Selected Button */}
                <div className='mt-4 sm:mt-6'>
                  <button
                    onClick={removeCourseFromCart}
                    disabled={selectedCourses.length === 0}
                    className={`w-full px-4 py-2 sm:px-6 sm:py-2 rounded-lg transition-all text-sm sm:text-base ${
                      selectedCourses.length === 0
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    Remove From Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className='w-full lg:w-4/12'>
              <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6'>
                <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6'>
                  Cart Summary
                </h2>
                <div className='space-y-3 sm:space-y-4'>
                  <div className='flex justify-between'>
                    <span className='text-sm sm:text-base text-gray-600'>
                      Subtotal
                    </span>
                    <span className='text-sm sm:text-base text-gray-800 font-semibold'>
                      Rs {total}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm sm:text-base text-gray-600'>
                      Discount (0%)
                    </span>
                    <span className='text-sm sm:text-base text-gray-800 font-semibold'>
                      Rs 0
                    </span>
                  </div>
                  <div className='border-t border-gray-200 pt-3 sm:pt-4'>
                    <div className='flex justify-between'>
                      <span className='text-sm sm:text-base text-gray-800 font-bold'>
                        Total
                      </span>
                      <span className='text-sm sm:text-base text-gray-800 font-bold'>
                        Rs {total}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={generateInvoice}
                  disabled={selectedCourses.length === 0}
                  className={`w-full mt-4 sm:mt-6 px-4 py-2 sm:px-6 sm:py-2 rounded-lg transition-all text-sm sm:text-base ${
                    selectedCourses.length === 0
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Generate Invoice
                </button>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]'>
            <div className='bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md relative'>
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className='absolute top-2 right-2 text-gray-600 hover:text-black'
              >
                <X className='w-5 h-5' />
              </button>

              {/* Modal Content */}
              <h2 className='text-xl font-semibold mb-4'>Add Course Request</h2>

              {/* Dropdown Input */}

              <select
                className='w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600'
                value={Id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              >
                <option value={''}>Select Course</option>
                {addToCartCourse?.map((data, index) => (
                  <option value={data?._id}>
                    {data?.courseDetails?.title}
                  </option>
                ))}
              </select>

              <div
                className='flex z-[999] flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-green-600 transition-all'
                onClick={handleClick} // Use handleClick instead of directly triggering .click()
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {challan ? (
                  <>
                    {' '}
                    <button
                      onClick={() => setChallan('')}
                      className='text-gray-600 hover:text-black'
                    >
                      <X className='w-5 h-5' />
                    </button>
                    <img
                      src={challan}
                      alt='Preview'
                      className='mt-1 w-full max-w-xs rounded-lg shadow'
                    />
                  </>
                ) : (
                  <>
                    <Upload
                      size={32}
                      className='text-gray-500 mb-2'
                    />
                    <p className='text-sm text-gray-500'>
                      Click or drag & drop your file here
                    </p>
                    <input
                      type='file'
                      accept='image/png, image/jpeg'
                      ref={fileInputRef}
                      className='hidden'
                      onChange={handleChange}
                    />
                  </>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={() => {
                  onSubmit();
                }}
                className='w-full mt-4 bg-[#166534] text-white py-2 rounded hover:bg-[#14532d]'
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Invoice Modal */}
        {showInvoiceModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md mx-4'>
              <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4'>
                Invoice
              </h3>
              <p className='text-sm sm:text-base text-gray-600 mb-6'>
                Your invoice has been successfully generated! Download or print
                your fee slip below.
              </p>
              <div className='flex justify-end gap-3 sm:gap-4'>
                <button
                  onClick={toggleModal}
                  className='px-4 py-2 sm:px-6 sm:py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm sm:text-base'
                >
                  Close
                </button>
                <button
                  onClick={download}
                  className='px-4 py-2 sm:px-6 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base'
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {paidCourse.length > 0 ? (
        <section className='mb-3 m-3'>
          <div className='container '>
            <div className='flex items-center justify-between '>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                Your Course Request
              </h1>
            </div>

            <div className='flex flex-col lg:flex-row gap-6'>
              <div className='w-full lg:w-8/12 '>
                {profile?.LMSStatus ? (
                  <div className='bg-green-100 text-green-800 px-3 py-2 rounded-md shadow-md text-sm text-center mb-3'>
                    <marquee
                      behavior='scroll'
                      direction='left'
                      scrollAmount='5'
                    >
                      ✅ <strong>Your LMS has been successfully set up.</strong>{' '}
                      You can now access your learning dashboard (LMS).
                    </marquee>
                  </div>
                ) : (
                  <div className='bg-yellow-100 text-yellow-800 px-3 py-2 rounded-md shadow-md text-sm text-center mb-3'>
                    <marquee
                      behavior='scroll'
                      direction='left'
                      scrollAmount='5'
                    >
                      🚧 <strong>Your LMS is not yet Active.</strong> As soon as
                      it is configured, we will let you know. Or you can contact
                      Admin <strong>032452526727</strong>
                    </marquee>
                  </div>
                )}
                {profile?.LMSStatus && (
                  <div className='mt-4 flex bg-[#DCFCE7] rounded p-2 mb-3 w-50'>
                    <span>
                      LMS Email: <strong>{profile?.email}</strong>
                      <br />
                      LMS Password:{' '}
                      <strong className='flex items-center gap-2'>
                        {showLMSPassword ? (
                          <>
                            {profile?.lmsPassword}
                            <i
                              className='fas fa-eye-slash cursor-pointer text-gray-600'
                              onClick={() => setShowLMSPassword(false)}
                            ></i>
                          </>
                        ) : (
                          <>
                            <span
                              onClick={() => setShowModal(true)}
                              className='cursor-pointer'
                            >
                              ••••••••
                            </span>
                            <i
                              className='fas fa-eye cursor-pointer text-gray-600'
                              onClick={() => setShowModal(true)}
                            ></i>
                          </>
                        )}
                      </strong>
                    </span>
                  </div>
                )}{' '}
                <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6'>
                  {paidCourse.length > 0 ? (
                    <div className='overflow-x-auto'>
                      <table className='w-full'>
                        <thead>
                          <tr className='bg-gray-100'>
                            <th className='p-2 sm:p-3 text-left'>Thumbnail</th>
                            <th className='p-2 sm:p-3 text-left'>Course</th>

                            <th className='p-2 sm:p-3 text-left'>Challen</th>
                            <th className='p-2 sm:p-3 text-left hidden sm:table-cell'>
                              Uploaded Date
                            </th>
                            <th className='p-2 sm:p-3 text-left'>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paidCourse.map((course) => (
                            <tr
                              key={course.id}
                              className='border-b border-gray-200 hover:bg-gray-50 transition-all'
                            >
                              <td className='p-2 sm:p-3'>
                                <img
                                  src={course?.courseDetails.courseImage}
                                  alt={course?.courseDetails?.title}
                                  className='w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border-2 border-[#166534] rounded'
                                />
                              </td>
                              <td className='p-2 sm:p-3'>
                                <p className='text-sm sm:text-base text-gray-800 font-medium mt-3'>
                                  {course?.courseDetails?.title}
                                </p>
                              </td>

                              <td className='p-2 sm:p-3 text-gray-800 font-semibold'>
                                <div className='relative'>
                                  <img
                                    src={course?.paidChallan}
                                    alt={course?.courseDetails?.title}
                                    onClick={() => {
                                      if(course?.status === 'Rejected'){
                                        handleImageClick(course?.paidChallan);

                                      }else{

                                      }
                                    }}
                                    className='w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border-2 border-[#166534] cursor-pointer  duration-200 z-[1]'
                                  />

                                  {/* Conditionally Render Upload Icon on 'Rejected' */}
                                  {course?.status === 'Rejected' && (
                                    <div
                                      className='relative top-[-30px] left-5    z-[9] cursor-pointer'
                                      onClick={() => {
                                        handleImageClick(course?.paidChallan);
                                        setId(course?._id);
                                      }}
                                    >
                                      <Upload className='text-[white] border-1 border-[white] bg-[#0F3D24] rounded w-6 h-6 hover:scale-105 transition-all' />
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className='p-2 sm:p-3 text-gray-600 hidden sm:table-cell'>
                                {new Date(
                                  course?.uploadedAt
                                ).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </td>

                              <td className='p-2 sm:p-3'>
                                <label className='cursor-pointer flex items-center gap-2'>
                                  <span
                                    className={`
      px-2 py-1 rounded-full text-xs font-medium
      ${
        course?.status === 'AddToCart'
          ? 'bg-yellow-100 text-yellow-700'
          : course?.status === 'Pending'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-red-100 text-red-700'
      }
    `}
                                  >
                                    {course?.status === 'AddToCart'
                                      ? 'New in Cart'
                                      : course?.status === 'Pending'
                                      ? 'Under Review'
                                      : 'Rejected'}
                                  </span>
                                </label>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className='text-center py-6'>
                      <p className='text-gray-600'>
                        No courses in your cart yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
              <div className='bg-white p-4 rounded-xl shadow-lg max-w-md w-full'>
                <div className='flex justify-end'>
                  <button
                    onClick={closeModal}
                    className='text-xl font-bold'
                  >
                    ×
                  </button>
                </div>
                <div
                  className='flex z-[999] flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-green-600 transition-all'
                  onClick={handleClick} // Use handleClick instead of directly triggering .click()
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  {challan ? (
                    <>
                      {' '}
                      <button
                        onClick={() => setChallan('')}
                        className='text-gray-600 hover:text-black'
                      >
                        <X className='w-5 h-5' />
                      </button>
                      <img
                        src={challan}
                        alt='Preview'
                        className='mt-1 w-full max-w-xs rounded-lg shadow'
                      />
                    </>
                  ) : (
                    <>
                      <Upload
                        size={32}
                        className='text-gray-500 mb-2'
                      />
                      <p className='text-sm text-gray-500'>
                        Click or drag & drop your file here
                      </p>
                      <input
                        type='file'
                        accept='image/png, image/jpeg'
                        ref={fileInputRef}
                        className='hidden'
                        onChange={handleChange}
                      />
                    </>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={() => {
                    onSubmit();
                  }}
                  className='w-full mt-4 bg-[#166534] text-white py-2 rounded hover:bg-[#14532d]'
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          {showModal && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
              <div className='bg-white p-6 rounded shadow-md w-96'>
                <h2 className='text-lg font-semibold mb-4'>Confirm Password</h2>
                <input
                  type='password'
                  placeholder='Enter your account password'
                  className='w-full p-2 border border-gray-300 rounded mb-4'
                  value={accountPassword}
                  onChange={(e) => setAccountPassword(e.target.value)}
                />
                {error && <p className='text-red-600 text-sm mb-2'>{error}</p>}
                <div className='flex justify-end gap-2'>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setAccountPassword('');
                      setError('');
                    }}
                    className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVerifyPassword}
                    className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      ) : (
        ''
      )}
    </>
  );
}
