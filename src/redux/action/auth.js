// Import Dependencies
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../config/firebaseConfig'; // Import the auth object
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { routes } from '../../contant';

const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
const GET_REDY_QUIZ = 'GET_REDY_QUIZ';
const GET_REDY_QUIZ_RESULT = 'GET_REDY_QUIZ_RESULT';


const API_BASE_URL = 'http://localhost:3000';

export const completeProfile = (data) => async (dispatch) => {
  const email = localStorage.getItem('registerMail');
  try {
    const response = await axios.post(`${API_BASE_URL}/users/profile-detail`, {
      email,
      ...data,
    });
    if (response) {
      toast.success(
        response?.data?.message || 'Congratulation your profile is setup now!'
      );
    }
    return response;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};

export const firebaseResetPasswordEmail = (email) => async (dispatch) => {
  try {
    const userCredential = await sendPasswordResetEmail(auth, email);
    return userCredential;
  } catch (error) {
    return error;
  }
};

export const resetPassword = (password, navigate) => async (dispatch) => {
  try {
    const email = localStorage.getItem('userEmail');
    const response = await axios.patch(`${API_BASE_URL}/users/reset-password`, {
      email,
      password,
    });

    if (response) {
      toast.success(response?.data?.message || 'Password change successfully');
      setTimeout(() => {
        navigate(routes.signin);
      }, 2000);
    }
    return response;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};

export const getProfile = () => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });

  try {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const response = await axios.get(
      `${API_BASE_URL}/users/get-by-id/?id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Set the token here
        },
      }
    );

    dispatch({ type: GET_PROFILE_SUCCESS, payload: response?.data?.data });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const editProfile = (data) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    delete data.password;
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${API_BASE_URL}/users/edit-profile/?id=${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Set the token here
        },
      }
    );

    dispatch({ type: GET_PROFILE_SUCCESS, payload: response?.data?.data });
    toast.success(response?.data?.message || 'Profile updated successfully');
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.message);
  }
};

const firebaseVarifyEmail = async (email, password = '12345678') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    let res = await sendEmailVerification(userCredential.user);
    return res;
  } catch (error) {
    return error;
  }
};

export const addAccount = (formData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/account-setup`,
      formData
    );
    if (response) {
      firebaseVarifyEmail(formData?.email);
      toast.success(response?.data?.message || 'Account created successfully!');
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

export const getReadyQuiz = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quiz/get-list?type=Entry Test`);
    dispatch({ type: GET_REDY_QUIZ, payload: response?.data?.data });
    return response;
  } catch (error) {
    return error;
  }
};

export const getReadyMarks = (userAnswers) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/quiz/get-marks-ready?type=Entry Test`, // URL with query parameters
      { userAnswers } // Send the userAnswers array in the body
    );    
    dispatch({ type: GET_REDY_QUIZ_RESULT, payload: response?.data?.data });
    return response;
  } catch (error) {
    return error;
  }
};

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, formData);
    if (response?.data?.status) {
      localStorage.setItem('token', response?.data?.data?.token);
      localStorage.setItem('userId', response?.data?.data?.user?._id);
      setTimeout(() => {
        navigate(routes.main);
      }, 2000);
      toast.success(response?.data?.data?.message || 'Login Successfull');
    } else {
      toast.error(response?.data?.message);
    }
    return response;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};
