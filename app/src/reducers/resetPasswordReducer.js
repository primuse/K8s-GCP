import {
  SEND_RESET_EMAIL, SEND_RESET_EMAIL_ERROR, PASSWORD_IS_LOADING,
  SET_NEW_PASSWORD
} from '../actions/actionTypes';

const initialState = {
  emailSent: '',
  error: '',
  isLoading: false,
  newPassword: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_RESET_EMAIL:
      return {
        ...state,
        isLoading: false,
        emailSent: action.payload,
      };
    case PASSWORD_IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SEND_RESET_EMAIL_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SET_NEW_PASSWORD:
      return {
        ...state,
        isLoading: false,
        newPassword: action.payload,
      };
    default:
      return state;
  }
};
