// Action types
const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
const GET_REDY_QUIZ = 'GET_REDY_QUIZ';
const GET_REDY_QUIZ_RESULT = 'GET_REDY_QUIZ_RESULT';

const GET_STATES_REQUEST = 'GET_STATES_REQUEST'; // New action type
const GET_STATES_SUCCESS = 'GET_STATES_SUCCESS'; // New action type
const GET_STATES_FAILURE = 'GET_STATES_FAILURE'; // New action type

const GET_ACTIVITY_POINTS_SUCCESS = 'GET_POINST_SUCCESS';
const GET_POINTS_HISTORY_SUCCESS = 'GET_POINST_HISTORY_SUCCESS';

const GET_ALL_COURSE = 'GET_ALL_COURSE';
const GET_COURSE_DETAIL = 'GET_COURSE_DETAIL';
const GET_MY_ADD_TO_CART = 'GET_MY_ADD_TO_CART'
// Initial state
const initialState = {
  course: [],
  courseDetail: {},
  pointsHistory: [],
  activityPoints: {},
  states: {},
  quiz: [],
  quizResult: {},
  profile: null,
  loading: false,
  error: '',
  linkSent: false,
  addToCartCourse : []
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_ADD_TO_CART:
      return { ...state, loading: true, addToCartCourse: action.payload };
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true, error: '' };
    case GET_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case GET_COURSE_DETAIL:
      return { ...state, loading: false, courseDetail: action.payload };
    case GET_REDY_QUIZ:
      return { ...state, loading: false, quiz: action.payload };
    case GET_REDY_QUIZ_RESULT:
      return { ...state, loading: false, quizResult: action.payload };
    case GET_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // New cases for fetching states
    case GET_STATES_REQUEST:
      return { ...state, loading: true, error: '' };

    case GET_STATES_SUCCESS:
      return { ...state, loading: false, states: action.payload };

    case GET_STATES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ACTIVITY_POINTS_SUCCESS:
      return { ...state, loading: false, activityPoints: action.payload };
    case GET_POINTS_HISTORY_SUCCESS:
      return { ...state, loading: false, pointsHistory: action.payload };
    case GET_ALL_COURSE:
      return { ...state, loading: false, course: action.payload };
    default:
      return state;
  }
};

export default authReducer;
