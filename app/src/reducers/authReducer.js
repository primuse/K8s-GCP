import hasID from '../helpers/validator';
import {
  LOGIN_USER, LOGIN_ERROR, SIGNUP_ERROR, SIGNUP_USER,
  IS_LOADING
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: '',
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: hasID(action.payload),
        user: action.payload,
        isLoading: false
      };
    case SIGNUP_USER:
      return {
        ...state,
        isAuthenticated: hasID(action.payload),
        user: action.payload,
        isLoading: false
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
        isLoading: false
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
        isLoading: false
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};
