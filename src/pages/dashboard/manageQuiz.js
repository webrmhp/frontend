import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner';
import Del from '../../assets/icons/Del';

import {
  getWholeQuestion,
  addQuizQuestion,
  getQuestionRemoved,
} from '../../redux/action/auth';
import { useDispatch, useSelector } from 'react-redux';

const ManageQuiz = () => {
  const [questionData, setQuestionData] = useState({
    question: '',
    options: ['', '', '', ''],
    testType: 'Entry Test',
    answer: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [1000]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { quiz } = useSelector((state) => state.auth);

  console.log(quiz, 'quizquizquiz');
  useEffect(() => {
    dispatch(getWholeQuestion());
  }, [1000]);

  useEffect(() => {}, [quiz]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    dispatch(addQuizQuestion(questionData));
    setTimeout(() => {
      dispatch(getWholeQuestion());
    }, 2000);
  };
  const removed = (id) => {
    dispatch(getQuestionRemoved(id));
    setTimeout(() => {
      dispatch(getWholeQuestion());
    }, 2000);
  };

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <ToastContainer />
      {!loading ? (
        <>
          {' '}
          <div className='flex items-center justify-between bg-[#FFFFFF] p-2'>
            <h1 className='text-2xl font-bold'>Quiz List</h1>
            <div className='flex justify-end mb-4'>
              <button
                onClick={() => {
                  setQuestionData({
                    question: '',
                    options: ['', '', '', ''],
                    testType: 'Entry Test',
                    answer: 0,
                  });
                  setIsEditing(false);
                  setIsModalOpen(true);
                }}
                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
              >
                Add New Quiz
              </button>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <div className='overflow-x-auto'>
              <div className='overflow-x-auto'>
                <table className='min-w-full table-auto'>
                  <thead className='text-gray-600 uppercase text-sm leading-normal'>
                    <tr>
                      <th className='py-3 px-6 text-left'>#</th>
                      <th className='py-3 px-6 text-left'>Question</th>
                      <th className='py-3 px-6 text-left'>Options</th>
                      <th className='py-3 px-6 text-left'>Action</th>
                    </tr>
                  </thead>
                  <tbody className='text-gray-700 text-sm'>
                    {quiz?.map((q, index) => (
                      <tr
                        key={q._id}
                        className={`border-b border-gray-200 ${
                          index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                        }`}
                      >
                        <td className='py-3 px-6'>{index + 1}</td>
                        <td className='py-3 px-6'>{q.question}</td>
                        <td className='py-3 px-6'>
                          {q.options.map((opt, i) => (
                            <div key={i}>{`${i + 1}. ${opt}`}</div>
                          ))}
                        </td>
                        <td className='py-3 px-6'>
                        <button
                          className='text-red-500 hover:text-red-700 '
                          onClick={() => removed(q._id)}
                        >
                          <Del />
                        </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <div className='fixed inset-0 bg-transparent bg-opacity-60 flex justify-center items-center z-50'>
              <div className='bg-white p-6 rounded-lg shadow-lg max-w-xl w-full'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-bold'>
                    {isEditing ? 'Edit Quiz' : 'Add New Quiz'}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className='text-red-500 text-lg font-bold'
                  >
                    &times;
                  </button>
                </div>

                <input
                  type='text'
                  value={questionData.question}
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      question: e.target.value,
                    })
                  }
                  placeholder='Enter question'
                  className='w-full mb-4 border border-gray-300 p-2 rounded'
                />

                {questionData.options.map((opt, i) => (
                  <input
                    key={i}
                    type='text'
                    value={opt}
                    placeholder={`Option ${i + 1}`}
                    onChange={(e) => {
                      const newOptions = [...questionData.options];
                      newOptions[i] = e.target.value;
                      setQuestionData({ ...questionData, options: newOptions });
                    }}
                    className='w-full mb-2 border border-gray-300 p-2 rounded'
                  />
                ))}

                <select
                  value={questionData.answer}
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      answer: parseInt(e.target.value),
                    })
                  }
                  className='w-full mb-4 border border-gray-300 p-2 rounded'
                >
                  <option value={0}>Select Correct Answer</option>
                  {questionData.options.map((opt, i) => (
                    <option
                      key={i}
                      value={i + 1}
                    >{`${i + 1}. ${opt}`}</option>
                  ))}
                </select>

                <button
                  onClick={() => handleSubmit()}
                  className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full'
                >
                  {isEditing ? 'Update Quiz' : 'Create Quiz'}
                </button>
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

export default ManageQuiz;
