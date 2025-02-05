// Import Dependencies
import axios from 'axios';
import { toast } from 'react-toastify';
const GET_STATES_REQUEST = 'GET_STATES_REQUEST';
const GET_STATES_SUCCESS = 'GET_STATES_SUCCESS';

const GET_ACTIVITY_POINTS_SUCCESS = 'GET_POINST_SUCCESS';

const GET_POINTS_HISTORY_SUCCESS = 'GET_POINST_HISTORY_SUCCESS';

const GET_ALL_COURSE = 'GET_ALL_COURSE';
const GET_COURSE_DETAIL = 'GET_COURSE_DETAIL';
const GET_MY_ADD_TO_CART = 'GET_MY_ADD_TO_CART';

const API_BASE_URL = 'http://localhost:3000';

export const addRequest = (data) => async (dispatch) => {
  console.log(data, 'data');
  try {
    const token = localStorage.getItem('token'); // Replace with how you store/retrieve the token

    const response = await axios.post(`${API_BASE_URL}/request/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Add your token here
      },
    });

    if (response) {
      toast.success(response?.data?.message || 'Your Request has been created');
    }
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const fetchStates = (userId) => async (dispatch) => {
  dispatch({ type: GET_STATES_REQUEST }); // Dispatching request action
  try {
    const token = localStorage.getItem('token'); // Replace with your token retrieval logic
    const response = await axios.get(
      `${API_BASE_URL}/request/states/?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      dispatch({ type: GET_STATES_SUCCESS, payload: response.data?.data });
    }
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const getMyActivityPoints = (userId) => async (dispatch) => {
  dispatch({ type: GET_STATES_REQUEST }); // Dispatching request action
  try {
    const token = localStorage.getItem('token'); // Replace with your token retrieval logic
    const response = await axios.get(
      `${API_BASE_URL}/request/get-activity-point/?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data) {
      dispatch({
        type: GET_ACTIVITY_POINTS_SUCCESS,
        payload: response.data?.data,
      });
    }
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const getMyActivityHistory = (userId, obj) => async (dispatch) => {
  console.log('response', 'hhh9999999999999999999999999');

  try {
    const token = localStorage.getItem('token'); // Replace with your token retrieval logic

    // Convert the `obj` to query parameters
    const params = new URLSearchParams({
      userId,
      startDate: obj.startDate,
      endDate: obj.endDate,
    }).toString();

    let config = {
      method: 'get',
      url: `http://localhost:3000/request/activity-point-history?${params}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Execute Axios request
    const response = await axios.request(config);

    console.log(JSON.stringify(response.data), 'hhh9999999999999999999999999');

    // Dispatch action if data is present
    if (response.data) {
      dispatch({
        type: GET_POINTS_HISTORY_SUCCESS,
        payload: response.data?.data,
      });
    }

    return response.data;
  } catch (error) {
    // Handle errors
    console.error(error);
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};





export const getCourse = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); 
    let config = {
      method: 'get',
      url: `${API_BASE_URL}/course/list`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Execute Axios request
    const response = await axios.request(config);
    // Dispatch action if data is present
    if (response.data) {
      dispatch({
        type: GET_ALL_COURSE,
        payload: response.data?.data,
      });
    }

    return response.data;
  } catch (error) {
    // Handle errors
    console.error(error);
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const getCourseById = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); 
    let config = {
      method: 'get',
      url: `${API_BASE_URL}/course/get-by-id?id=${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Execute Axios request
    const response = await axios.request(config);
    // Dispatch action if data is present
    if (response.data) {
      dispatch({
        type: GET_COURSE_DETAIL,
        payload: response.data?.data,
      });
    }

    return response.data;
  } catch (error) {
    // Handle errors
    console.error(error);
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const getMyAddToCartCourse = (status) => async (dispatch) => {
  try {
    // status may be "Pending" or "Paid"
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId'); 
    let config = {
      method: 'get',
      url: `${API_BASE_URL}/add-to-card/get-all?userId=${userId}&status=${status}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Execute Axios request
    const response = await axios.request(config);
    // Dispatch action if data is present
    console.log(response.data, "response.data")
    if (response.data) {
      dispatch({
        type: GET_MY_ADD_TO_CART,
        payload: response.data?.data,
      });
    }

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const removeMyAllCourse = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); 
    let config = {
      method: 'delete',
      url: `${API_BASE_URL}/add-to-card/delete`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data:data
    };


    const response = await axios.request(config);
    // getMyAddToCartCourse('Pending')
    if (response.data) {
      toast.success(response?.data?.message || 'Course are removed from your cart');
      // getMyAddToCartCourse('Pending')
    }

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};


export const enrollCourseNow = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); 
    let config = {
      method: 'post',
      url: `${API_BASE_URL}/add-to-card/add`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data :data
    };

    const response = await axios.request(config);
    console.log(response, "response")
    if (response.data) {
      toast.success(response?.data?.message);

    }

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};






