import React, { useState, useEffect } from 'react';
import TruckImage from '../../assets/image/Truck.png';
import BicycleImage from '../../assets/image/Bicycle.png';
import Commercial from '../../assets/image/Mini.png';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  getAllRequestList,
  searchRequestList,
  getRequestById,
  getCompanyList,
  addComment,
  addQuotation,
  policyUploaded,
  varifyActivityPoint,
} from '../../redux/action/request';

import {
  getCourseList,
  addCourse,
  deleteCourse,
  updateCourse,
} from '../../redux/action/auth';
import { ToastContainer } from 'react-toastify';
import { getUserList } from '../../redux/action/auth';
import { useDispatch, useSelector } from 'react-redux';
import DownloadIcon from '../../assets/icons/download';
import { Circles } from 'react-loader-spinner';

const SerachPanel = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { userslist } = useSelector((state) => state.auth);
  const { requestById } = useSelector((state) => state.auth);
  const { companyList } = useSelector((state) => state.auth);
  const [policyUpload, setPolicyUpload] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [quotation, setQuotation] = useState(null);
  const [comment, setComment] = useState('');
  const [uploadPolicy, setUploadPolicy] = useState(null);
  const [policyExpire, setPolicyExpire] = useState(null);
  const [quotationDetail, setQuotationDetail] = useState([
    {
      companyName: '',
      coverAmount: '',
      cashlessCharge: '',
      activityPoints: 0,
      companyLogo: '',
      premiumAmount: '',
      paymentLink: '',
    },
  ]);
  const { courseData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCourseList());
  }, [1000]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [1000]);
  const { employee } = useSelector((state) => state.auth);
  const addForm = () => {
    if (quotationDetail.length < 3) {
      setQuotationDetail([
        ...quotationDetail,
        {
          companyName: '',
          coverAmount: '',
          cashlessCharge: '',
          activityPoints: 0,
          companyLogo: '',
          premiumAmount: '',
        },
      ]);
    } else {
      alert('You can only add up to 3 quotations.');
    }
  };

  const uploadRequestPolicy = () => {
    const policyData = {
      policyUploaded: true,
      policyExpire: policyExpire,
      policyUrl: policyUpload,
    };
    dispatch(policyUploaded(uploadPolicy, policyData));
    setUploadPolicy(null);
  };

 

  // Handle input change for a specific form
  const handleInputChange = (index, field, value) => {
    if (field == 'companyName') {
      for (let x = 0; x <= companyList.length; x++) {
        if (companyList[x]?.companyName == value) {
          const updatedDetails = [...quotationDetail];
          updatedDetails[index]['companyLogo'] = companyList[x].companyLogo;
          setQuotationDetail(updatedDetails);
        }
      }
    }

    const updatedDetails = [...quotationDetail];
    updatedDetails[index][field] = value;
    setQuotationDetail(updatedDetails);
  };

  // Submit functionality (you can replace this with your API call or further logic)
  const handleSubmit = () => {
    const data = { quotationDetail: quotationDetail };
    setTimeout(() => {
      dispatch(getRequestById(requestById._id));
    }, 2000);
    dispatch(addQuotation(requestById?._id, data));
    setQuotation(null);
  };

  useEffect(() => {
    dispatch(getUserList());
  }, [1000]);

  useEffect(() => {}, [requestById]);
  const [serachPram, setSerachPram] = useState({
    vehicleType: '',
    requestType: '',
    userId: '',
    fuelType: '',
    policyType: '',
    startDate: '',
    endDate: '',
  });
  const onSerach = () => {
    const data = removeEmptyStrings();
    dispatch(searchRequestList(data));
  };

  const removeEmptyStrings = () => {
    const filteredParams = {};
    console.log(serachPram);
    for (const key in serachPram) {
      if (serachPram[key] !== '') {
        filteredParams[key] = serachPram[key];
      }
    }

    return filteredParams;
  };
  useEffect(() => {
    dispatch(getAllRequestList());
    dispatch(getCompanyList());
  }, [1000]);
  const getSpecificRequest = (id) => {
    dispatch(getRequestById(id));
  };

  const handleExport = () => {
    // Assuming `requestVehicleStat` is the data you want to export, modify it to flatten the nested structure if necessary
    const exportData = courseData.map((vehicle) => ({
      _id: vehicle._id,
      userId: vehicle.userId,
      vehicleType: vehicle.vehicleType,
      policyType: vehicle.policyType,
      previousPolicyType: vehicle.previousPolicytype,
      previousYearClaim: vehicle.previousYearclame,
      policyExpiryDate: vehicle.policyExpirydate,
      make: vehicle.make,
      vehicleModel: vehicle.vehicleModel,
      GVC: vehicle.GVC,
      registerNumber: vehicle.registerNumber,
      manufactureDate: vehicle.manufactureDate,
      fuelType: vehicle.fuelType,
      paymentVerified: vehicle.paymentVarified,
      requestSent: vehicle.requestSent,
      quotationMade: vehicle.quotationMade,
      paymentDone: vehicle.paymentDone,
      policyUploaded: vehicle.policyUploaded,
      ownerName: vehicle.ownerDetail?.ownerName,
      ownerPhone: vehicle.ownerDetail?.ownerPhone,
      ownerAddress: vehicle.ownerDetail?.ownerAddress,
      ownerEmail: vehicle.ownerDetail?.ownerEmail,
      vehicleDetailURL: vehicle.vehicleDetailURL,
      previousPolicyURL: vehicle.previousPolicyURL,
      ncbOfPreviousPolicy: vehicle.ncbOfPreviousPolicy,
      ODInsurer: vehicle.ODInsurer,
      paymentStatus: vehicle.paymentDetail?.status,
      activityPointsReceived: vehicle.paymentDetail?.activityPointsReceived,
      registerDate: vehicle.registerDate,
      userName: vehicle.userDetails?.name,
      userPhone: vehicle.userDetails?.phone,
      userEmail: vehicle.userDetails?.email,
      userCNIC: vehicle.userDetails?.CNIC,
      userAddress: vehicle.userDetails?.address,
      userProfession: vehicle.userDetails?.profession,
      userType: vehicle.userDetails?.userType,
    }));

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert the modified JSON data into a worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Requests Data');

    // Generate and download the Excel file
    XLSX.writeFile(wb, `requests_list.xlsx`);
  };

  const addRequestComment = () => {
    const commentData = {
      discription: comment,
      requestId: commentId.requestId,
      userId: commentId.userId,
    };
    dispatch(addComment(commentData));
    setCommentId(null);
  };
  const truncateText = (text, maxLength = 100) => 
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  const onChangeUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file

    if (file) {
      try {
        const Base64 = await convertToBase64(file);
        setPolicyUpload(Base64);
        console.log(Base64, 'Base64'); // Logs the Base64 string
      } catch (error) {
        console.error('Error converting to Base64:', error);
      }
    } else {
      console.warn('No file selected!');
    }
  };

  const varifyActivityPoints = () => {
    dispatch(varifyActivityPoint(requestById?._id));
    setTimeout(() => {
      dispatch(getRequestById(requestById?._id));
    }, [1000]);
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Remove the 'data:application/pdf;base64,' prefix
        const base64Data = reader.result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const goBack = () => {
    dispatch({
      type: 'GET_ALL_REQUEST_BYID',
      payload: {}, // Ensure response format matches expectations
    });
  };
  return (
    <>
      {!loading ? (
        <>
          <ToastContainer />
          {Object.keys(requestById).length > 0 && (
            <div className='sticky top-5 mt-3 left-5'>
              <button
                onClick={goBack}
                className='bg-blue-500 text-white p-2 rounded-full hover:bg-gray-700'
              >
                ← Back
              </button>
            </div>
          )}

          {Object.keys(requestById).length === 0 ? (
            <div className='p-4 bg-gray-100'>
              <div className='flex justify-between items-center mb-4'>
                <h1 className='text-xl font-bold'>Serach Course</h1>
                <span
                  onClick={() => handleExport()}
                  className='px-4 py-2 bg-[#1E90FE] text-white font-semibold rounded-lg  transition-colors duration-300 ease-in-out cursor-pointer'
                >
                  {' '}
                  Export Excel
                </span>
              </div>

              {/* Filter Section */}
              <div className='grid grid-cols-5 gap-4 mb-2'>
                <div className='relative'>
                  <select
                    className='border p-2 rounded w-full'
                    value={serachPram?.vehicleType}
                    onChange={(e) =>
                      setSerachPram({
                        ...serachPram,
                        vehicleType: e.target.value,
                      })
                    }
                  >
                    <option
                      value=''
                      disabled
                      selected
                    >
                      Search by Vehicles type
                    </option>
                    <option value='Car'>Car</option>
                    <option value='Bike'>Bike</option>
                    <option value='Commercial Vehicle'>
                      Commercial Vehicle
                    </option>
                  </select>
                </div>

                <select
                  className='border p-2 rounded'
                  value={serachPram?.requestType}
                  onChange={(e) =>
                    setSerachPram({
                      ...serachPram,
                      requestType: e.target.value,
                    })
                  }
                >
                  <option
                    value=''
                    disabled
                    selected
                  >
                    Search by Status
                  </option>
                  <option value='requestSent'>Review Pending</option>
                  <option value='quotationMade'>Quotation Made</option>
                  <option value='paymentDone'>Payment Done</option>
                  <option value='policyUploaded'>Policy Uploaded</option>
                </select>

                <select
                  className='border p-2 rounded'
                  value={serachPram?.userId}
                  onChange={(e) =>
                    setSerachPram({ ...serachPram, userId: e.target.value })
                  }
                >
                  <option
                    value=''
                    disabled
                    selected
                  >
                    Search By User
                  </option>
                  {userslist.map((user, index) => (
                    <option
                      key={index}
                      value={user._id}
                    >
                      {user.name}
                    </option>
                  ))}
                </select>

                <select
                  className='border p-2 rounded'
                  value={serachPram?.policyType}
                  onChange={(e) =>
                    setSerachPram({ ...serachPram, policyType: e.target.value })
                  }
                >
                  <option
                    value=''
                    disabled
                    selected
                  >
                    Policy Type
                  </option>
                  <option value='Own Damaged'>Own Damaged</option>
                  <option value='Comprehensive'>Comprehensive</option>
                  <option value='Third Party'>Third Party</option>
                </select>

                <select
                  className='border p-2 rounded'
                  value={serachPram?.fuelType}
                  onChange={(e) =>
                    setSerachPram({ ...serachPram, fuelType: e.target.value })
                  }
                >
                  <option
                    value=''
                    disabled
                    selected
                  >
                    Fuel Type
                  </option>
                  <option value='CNG'>CNG</option>
                  <option value='Petrol'>Petrol</option>
                  <option value='Diesel'>Diesel</option>
                  <option value='Electric'>Electric</option>
                </select>
                <select
                  className='border p-2 rounded'
                  onChange={(e) =>
                    setSerachPram({
                      ...serachPram,
                      commented: e.target.value === 'true',
                    })
                  }
                >
                  <option
                    value=''
                    disabled
                    selected
                  >
                    Commented
                  </option>
                  <option value='true'>Yes</option>
                  <option value='false'>No</option>
                </select>
                <div>
                  <DatePicker
                    selected={serachPram?.startDate}
                    onChange={(update) => {
                      setSerachPram({
                        ...serachPram,
                        startDate: update[0],
                        endDate: update[1],
                      });
                    }}
                    startDate={serachPram?.startDate}
                    endDate={serachPram?.endDate}
                    selectsRange
                    placeholderText='Start Date - End Date'
                    className='border p-2 rounded w-[11rem] placeholder-[black]'
                  />
                </div>
                <select
                  className='border p-2 rounded'
                  value={serachPram?.userId}
                  onChange={(e) =>
                    setSerachPram({ ...serachPram, userId: e.target.value })
                  }
                >
                  <option
                    value=''
                    disabled
                    selected
                  >
                    Search By Employee
                  </option>
                  {employee.map((user, index) => (
                    <option
                      key={index}
                      value={user._id}
                    >
                      {user.name}
                    </option>
                  ))}
                </select>

                <button
                  type='button'
                  placeholder='Search Here...'
                  className='border p-2 left-4 rounded bg-[#1D90FE] text-[white]'
                  onClick={() => {
                    onSerach();
                  }}
                >
                  {' '}
                  Serach
                </button>

                <div className='col-span-1 flex gap-2'>
                  <button
                    onClick={() => {
                      dispatch(getAllRequestList());
                      setSerachPram({
                        vehicleType: '',
                        requestType: '',
                        userId: '',
                        fuelType: '',
                        policyType: '',
                        commented: false,
                      });
                    }}
                    className='bg-[white] px-4 py-2 rounded border-2 border-[#1E90FE] hover:bg-[#1D90FE] hover:text-[white]'
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Cards Section */}
              <div className='grid grid-cols-3 gap-4'>
                {courseData.map((item, index) => (
                  <div
                    key={index}
                    className='p-4 transition bg-white border rounded shadow-md'
                  >
                    <div className='flex items-center gap-4 mb-4'>
                      <div className='w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center'>
                        <img
                          src={item?.courseImage}
                          alt='No logo'
                          className='w-10 h-10 object-contain'
                        />
                      </div>
                      <h2 className='text-lg font-semibold'>{item?.title}</h2>
                    </div>
                    <p className='text-gray-700'>{item?.prize} Rs</p>
                    <p className='text-blue-500 font-bold'>{item.subject}</p>
                    <p className='text-gray-500'>
                      Course Type: {item.courseType}
                    </p>
                    <button
                      onClick={() => getSpecificRequest(item._id)}
                      className='mt-4 w-full bg-[#1D90FE] text-white py-1 rounded-lg'
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div class='bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto space-y-4'>
                <div class='flex items-center justify-between'>
                  <div class='flex items-center space-x-2'>
                    <p class='text-sm font-semibold text-gray-700'>
                      <strong className='bg-[#3B82F6]  text-[white] p-2 rounded m-1'>{requestById?.title}</strong>
                      <br />
                    </p>
                  </div>
                
                </div>

                <h2 class='text-xl font-bold text-gray-800'>
                  {requestById?.vehicleModel}
                </h2>

                <div class='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 text-sm text-gray-700'>
                  
                  
                  <p>
                    <span class='font-semibold'>Subject:</span> <br />
                    <span class='text-blue-500'>
                      {requestById?.subject}
                    </span>
                  </p>
                  <p>
                    <span class='font-semibold'>Discription:</span>
                    <br />
                    <span class='text-blue-500'>
                    {truncateText(requestById?.discription || "No description available")}
                    </span>
                  </p>
                  {requestById?.skill ? (
                    <p>
                      <span class='font-semibold'>Skill:</span>
                      <br />
                      <span class='text-blue-500'>
                        {requestById?.skill}
                      </span>
                    </p>
                  ) : (
                    ''
                  )}

                  {requestById?.duration ? (
                    <p>
                      <span class='font-semibold'>
                      Duration
                      </span>{' '}
                      <br />
                      <a
                        href='#'
                        class='text-blue-500 hover:underline'
                      >
                        {requestById?.duration}
                      </a>
                    </p>
                  ) : (
                    <p>
                      <span class='font-semibold'>
                      Language
                      </span>
                      <br />
                      <a
                        href='#'
                        class='text-blue-500 hover:underline'
                      >
                        {requestById?.language}
                      </a>
                    </p>
                  )}

                  <p>
                    <span class='font-semibold'>Registration Date:</span>
                    <br />
                    <span className='text-blue-500'>
                      {(() => {
                        const addedAt = new Date(requestById?.addedAt);
                        addedAt.setMonth(addedAt.getMonth() - 1);
                        return addedAt.toISOString().split('T')[0];
                      })()}
                    </span>
                  </p>

                  <div className='inline-flex items-center gap-20'>
                   

                    {/* Previous Policy Button */}
                    {requestById?.previousPolicyURL ? (
                      <div className='flex flex-col items-center gap-2'>
                        <span className='font-semibold'>Previous Policy</span>
                        <button
                          className='bg-blue-500 text-white font-semibold px-4 py-1 rounded mt-2'
                          onClick={() => {
                            fetch(requestById?.previousPolicyURL)
                              .then((response) => response.blob())
                              .then((blob) => {
                                const link = document.createElement('a');
                                link.href = URL.createObjectURL(blob); // Convert the Blob to a downloadable URL
                                link.download = 'Previous_Policy.pdf'; // Provide a default filename for the download
                                document.body.appendChild(link);
                                link.click(); // Trigger the download
                                document.body.removeChild(link); // Clean up
                              })
                              .catch((error) =>
                                console.error('Download error:', error)
                              ); // Catch any errors
                          }}
                        >
                          Download
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                <h2 class='text-xl font-bold text-gray-800'>Video</h2>


                {requestById?.policyUploaded ? (
                  <>
                    {' '}
                    <h2 class='text-xl font-bold text-gray-800'>
                      Uploaded Policy
                    </h2>{' '}
                    <h6
                      className='cursor-pointer flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full shadow relative flex items-center justify-center text-center text-blue-500'
                      onClick={() => {
                        window.open(`${requestById?.policyUrl}`, '_blank');
                      }}
                    >
                      You have uploaded the Policy file{' '}
                      <DownloadIcon className='ml-2' />
                    </h6>
                  </>
                ) : (
                  ''
                )}

              

                <div className='flex justify-center'>
                  <button
                    onClick={() => setQuotation(requestById?._id)}
                    class='bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600'
                  >
                    Add Video
                  </button>
                </div>
              </div>
            </>
          )}

          {quotation && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto'>
              <div className='bg-white p-6 rounded-lg shadow-lg w-1/3 overflow-y-auto'>
                <h2 className='text-xl font-bold mb-4'>Add Video</h2>
                <div
                    className='border p-4 mb-4 rounded'
                  >
                   

                
                  
                    <div className='mb-2'>
                      <input
                        type='text'
                        className='w-full p-2 border border-gray-300 rounded'
                        placeholder='Title'
                        // value={form.paymentLink}
                    
                      />
                    </div>
                    <div className='mb-2'>
                      <input
                        type='test'
                        placeholder='discription'
                        className='w-full p-2 border border-gray-300 rounded'
                        // value={form.premiumAmount}
                        
                        
                      />
                    </div>
                    <div className='mb-2'>
                      <input
                        type='text'
                        placeholder='link'
                        className='w-full p-2 border border-gray-300 rounded'
                        // value={form.premiumAmount}
                        
                        
                      />
                    </div>
                    
                    

                   
                  </div>
                <div className='flex justify-between'>
                 

                  <motion.button
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all'
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.05 }} // Scale effect on hover
                    whileTap={{ scale: 0.95 }} // Slightly shrink when clicked
                    initial={{ opacity: 0 }} // Start with opacity 0
                    animate={{ opacity: 1 }} // Fade in animation
                    transition={{ duration: 0.3 }} // Set duration for animation
                  >
                    Submit Video
                  </motion.button>
                </div>
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
    </>
  );
};

export default SerachPanel;
