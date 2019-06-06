import { combineReducers } from 'redux';
import authReducer from './authReducer';
import parcelReducer from './parcelReducer';
import userReducer from './userReducer';
import resetPasswordReducer from './resetPasswordReducer';
import { LOG_OUT } from '../actions/actionTypes';


const appReducer = combineReducers({
  auth: authReducer,
  parcel: parcelReducer,
  users: userReducer,
  setPassword: resetPasswordReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    localStorage.clear();
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
