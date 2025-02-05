import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAccount,
  completeProfile,
  getReadyQuiz,
  getReadyMarks,
} from '../redux/action/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import '../style/signup.css';
import { routes } from '../contant';

export default function RegistrationForm() {
  const { quiz } = useSelector((state) => state.auth);
  const { quizResult } = useSelector((state) => state.auth);
  console.log(quizResult, 'quizResult');
  const navigate = useNavigate();
  const [phase, setPhase] = useState(Number(localStorage.getItem('phase')) || 1);
  const [fileSelected, setFileSelected] = useState();
  const [userAnswers, setUserAnswers] = useState([]);
  const handleSelectAnswer = (answer, selectedOptionIndex) => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers, // Spread the previous answers
      { answer: answer, id: selectedOptionIndex }, // Add the new answer object
    ]);
  };
  const renderQuestions = () =>
    quiz.map((q, index) => (
      <motion.div
        key={index}
        className='p-3 bg-gray-100 rounded-lg shadow-md mb-4 max-w-xs mx-auto'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.2 }}
      >
        <h3 className='text-sm font-semibold mb-2 text-center '>
          {q.question}
        </h3>
        {q.options.map((option, idx) => (
          <div
            onClick={() => handleSelectAnswer(idx, q._id)}
            key={idx}
            className='flex items-center mb-2 justify-start cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-md'
          >
            <input
              type='radio'
              id={`q${index}_${idx}`}
              name={`q${index}`}
              className='mr-2'
            />
            <label
              htmlFor={`q${index}_${idx}`}
              className='text-sm text-gray-700'
            >
              {option}
            </label>
          </div>
        ))}
      </motion.div>
    ));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    verified: true,
    userType: 'Student',
  });

  const [profileData, setProfileData] = useState({
    address: '',
    CNIC: '',
    previousDigree: '',
    profilePhoto: '',
  });
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email == '') {
      toast.error('Please input the email!');
      return;
    }
    if (formData.password == '' || formData.confirmPassword == '') {
      toast.error('Please put in the password feilds!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Password feilds should be match!');
      return;
    }
    localStorage.setItem('registerMail', formData.email);
    dispatch(addAccount(formData, navigate));
    localStorage.setItem('phase', 2);
    setPhase(2);
  };

  useEffect(() => {
    dispatch(getReadyQuiz());
  }, [1000]);
  const handleSubmitProfile = (e) => {
    e.preventDefault();

    if (profileData.address == '') {
      toast.error('Please input the address feild');
      return;
    }

    if (profileData.CNIC == '') {
      toast.error('Please put your CNIC');
      return;
    }

    if (profileData.CNIC == '') {
      toast.error('Please put your previous digree');
      return;
    }
    dispatch(completeProfile(profileData));
    localStorage.setItem('phase', 3);
    setPhase(3);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileData = (e) => {
    if (e.target.name == 'profilePhoto') {
      const { files } = e.target;
      const file = files[0];
      setFileSelected(file?.name);
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setProfileData((prevData) => ({
          ...prevData,
          [e.target.name]: base64String,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setProfileData({
        ...profileData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setFileSelected(file.name);
        setProfileData((prevData) => ({
          ...prevData,
          profilePhoto: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getQuizResult = () => {
    console.log(
      userAnswers.length == quiz.length,
      userAnswers.length,
      quiz.length
    );
    if (userAnswers.length == quiz.length) {
      dispatch(getReadyMarks(userAnswers));
    } else {
      toast.error('Before submit please answer all quiz question');
    }
  };
  return (
    <div className='min-h-screen bg-gradient-to-r from-[#5A70E9] to-[#15B7A7]  items-center justify-center '>
      <nav className='flex fixed top-0 left-0 w-full bg-gray-800 text-white shadow-lg z-50'>
        <motion.div
          className={`py-4 px-2 flex-1 text-center cursor-pointer ${
            phase === 1
              ? 'border-b-4 border-[#1B5E20] bg-[#FFA000]'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => {
            setPhase(1);
            localStorage.setItem('phase', 1);
          }}
          initial={{ scale: 1 }}
          animate={{ scale: phase === 1 ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          ACCOUNT REGISTER
        </motion.div>
        <motion.div
          className={`py-4 px-6 flex-1 text-center cursor-pointer ${
            phase === 2
              ? 'border-b-4 border-[#1B5E20] bg-[#FFA000]'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => {
            setPhase(2);
            localStorage.setItem('phase', 2);
          }}
          initial={{ scale: 1 }}
          animate={{ scale: phase === 2 ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          PROFILE REGISTER
        </motion.div>
        <motion.div
          className={`py-4 px-6 flex-1 text-center cursor-pointer ${
            phase === 3
              ? 'border-b-4 border-[#1B5E20] bg-[#FFA000]'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => {
            setPhase(3);
            localStorage.setItem('phase', 3);
          }}
          initial={{ scale: 1 }}
          animate={{ scale: phase === 3 ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          TEST NOW
        </motion.div>
      </nav>

      <div className='mt-5'>
        <motion.div
          key={phase} // Ensures unique animations for each phase
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100vw', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          {/*  Form 1 */}
          {phase == 1 ? (
            <div className='form-1 container mx-auto px-4 py-8'>
              <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center'>
                  Registration
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className='space-y-4'
                >
                  <div>
                    <input
                      type='text'
                      name='name'
                      placeholder='Enter name'
                      value={formData.name}
                      onChange={handleChange}
                      className='w-full p-2 border border-gray-300 rounded'
                      required
                    />
                  </div>
                  <div>
                    <input
                      type='email'
                      name='email'
                      placeholder='Email address'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full p-2 border border-gray-300 rounded'
                      required
                    />
                  </div>
                  <div>
                    <input
                      type='tel'
                      name='phone'
                      placeholder='Enter Mobile Number'
                      value={formData.phone}
                      onChange={handleChange}
                      className='w-full p-2 border border-gray-300 rounded'
                      required
                    />
                  </div>
                  <div>
                    <input
                      type='password'
                      name='password'
                      placeholder='Password'
                      value={formData.password}
                      onChange={handleChange}
                      className='w-full p-2 border border-gray-300 rounded'
                      required
                    />
                  </div>
                  <div>
                    <input
                      type='password'
                      name='confirmPassword'
                      placeholder='Confirm password'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className='w-full p-2 border border-gray-300 rounded'
                      required
                    />
                  </div>
                  <button
                    type='submit'
                    className='w-full bg-[#1B5E20] text-white py-3 rounded'
                  >
                    REGISTER NOW
                  </button>
                  <div className='text-center mt-4'>
                    <span className='text-gray-600'>
                      Already have an account?{' '}
                    </span>
                    <Link
                      to='/signin'
                      className='text-[#1B5E20]'
                    >
                      Login Here
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            ''
          )}
          {/*  Form 2 */}
          {phase == 2 ? (
            <div className=' form-1 container mx-auto px-4 py-8'>
              <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center'>
                  Profile Detail
                </h2>
                <form
                  onSubmit={handleSubmitProfile}
                  className='space-y-4'
                >
                  <div>
                    <input
                      type='text'
                      name='CNIC'
                      placeholder='Enter your CNIC'
                      value={profileData.CNIC}
                      onChange={handleProfileData}
                      className='w-full p-2 border border-gray-300 rounded'
                      required
                    />
                  </div>
                  <div>
                    <input
                      type='text'
                      name='address'
                      placeholder='Please enter your address'
                      value={profileData.address}
                      onChange={handleProfileData}
                      className='w-full p-2 border border-gray-300 rounded'
                      required
                    />
                  </div>
                  <div>
                    <input
                      type='text'
                      name='previousDigree'
                      placeholder='Your previous digree'
                      value={profileData.previousDigree}
                      onChange={handleProfileData}
                      className='w-full p-2 border border-gray-300 rounded'
                      required
                    />
                  </div>
                  <div
                    className='w-full px-3 py-2 border border-gray-300 rounded-md flex h-[100px] items-center justify-center cursor-pointer'
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e)}
                  >
                    <input
                      id='profilePhoto'
                      name='profilePhoto'
                      type='file'
                      accept='.png, .jpg, .jpeg'
                      onChange={handleProfileData}
                      className='hidden'
                    />
                    {fileSelected ? (
                      <>
                        <p className='text-green-500 mt-2'>
                          Selected File: {fileSelected}
                        </p>
                        <br />
                        <label
                          htmlFor='profilePhoto'
                          className='cursor-pointer bg-gray-500 rounded text-white p-2'
                        >
                          +
                        </label>
                      </>
                    ) : (
                      <label
                        htmlFor='profilePhoto'
                        className='cursor-pointer text-gray-500'
                      >
                        Please Select Profile Picture
                      </label>
                    )}
                  </div>

                  <button
                    type='submit'
                    className='w-full bg-[#1B5E20] text-white py-3 rounded'
                  >
                    SETUP PROFILE
                  </button>
                  <div className='text-center mt-4'>
                    <span className='text-gray-600'>
                      Already have an account?{' '}
                    </span>
                    <Link
                      to='/signin'
                      className='text-[#1B5E20]'
                    >
                      Login Here
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            ''
          )}


          {phase == 3 && Object.keys(quizResult).length <= 0  ? (
            <div className='mb-5 text-center'>
              <h2 className='text-2xl font-bold mb-4'>Quiz</h2>
              <motion.div
                initial='hidden'
                animate='visible'
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
              >
                {renderQuestions()}
                <button
                  onClick={() => getQuizResult()}
                  className='text-center text-[white] py-8 p-2 bg-[#1B5E20] rounded-lg shadow-md mb-4 max-w-xs mx-auto'
                >
                  Submit
                </button>
              </motion.div>
            </div>
          ) : (
            <div className=''>
              {Object.keys(quizResult).length > 0 ? (
                <div className=' p-6 bg-green-200 rounded-lg shadow-md  max-w-sm mx-auto pt-[100px]'>
                  <h2 className='text-2xl font-bold text-center mb-4'>
                    Congratulations!
                  </h2>
                  <p className='text-center text-xl font-semibold'>
                    You scored {quizResult.percentage}% in the Entry Test.
                  </p>
                  <p onClick={()=> navigate(routes.signin)} className='underline cursor-pointer text-center mt-2 text-sm text-gray-600'>
                    Login Now
                  </p>
                </div>
              ) : (
                ''
              )}
            </div>
          )}
        </motion.div>
      </div>

      <ToastContainer />
    </div>
  );
}
