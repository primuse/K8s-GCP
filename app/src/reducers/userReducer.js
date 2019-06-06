/* eslint-disable camelcase */
import {
  GET_All_USERS, SHOW_ASIDE, HIDE_ASIDE, SET_PAGES,
  USER_IS_LOADING, GET_ERROR
} from '../actions/actionTypes';

const initialState = {
  allUsers: [],
  show: false,
  pages: null,
  isLoading: false,
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_All_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case SHOW_ASIDE:
      return {
        ...state,
        show: true,
        isLoading: false
      };
    case HIDE_ASIDE:
      return {
        ...state,
        show: false,
        isLoading: false
      };
    case SET_PAGES:
      return {
        ...state,
        pages: action.payload,
        isLoading: false
      };
    case USER_IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
