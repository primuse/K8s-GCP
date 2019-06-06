import Swal from 'sweetalert2';
import history from '../history';
import {
  LOGIN_USER, LOGIN_ERROR, SIGNUP_ERROR, SIGNUP_USER,
  IS_LOADING
} from './actionTypes';
import handleErrors from '../helpers/errorHelper';


export const loginUser = userData => (dispatch) => {
  dispatch({ type: IS_LOADING });
  const config = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(userData),
  };

  return fetch('https://sendit2019.herokuapp.com/api/v1/auth/login', config)
    .then(handleErrors)
    .then((res) => {
      localStorage.setItem('token', res.data[0].token);
      const { user } = res.data[0];
      dispatch({ type: LOGIN_USER, payload: user });
      history.push('/dashboard');
    })
    .catch((err) => {
      if (err.json) {
        err.json().then((obj) => {
          Swal.fire({
            title: 'Error!',
            text: obj.message,
            type: 'error',
            timer: 3000,
            showConfirmButton: false,
            width: 400,
          });
          dispatch({
            type: LOGIN_ERROR,
            payload: obj.message,
          });
        });
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: obj.message,
        });
      }
    });
};

export const signupUser = userData => (dispatch) => {
  dispatch({ type: IS_LOADING });
  const config = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(userData),
  };

  return fetch('https://sendit2019.herokuapp.com/api/v1/auth/signup', config)
    .then(handleErrors)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      const { user } = res.data;
      dispatch({ type: SIGNUP_USER, payload: user });
      history.push('/dashboard');
    })
    .catch((err) => {
      if (err.json) {
        err.json().then((obj) => {
          Swal.fire({
            title: 'Error!',
            text: obj.message.error,
            type: 'error',
            timer: 3000,
            showConfirmButton: false,
            width: 400,
          });
          dispatch({
            type: SIGNUP_ERROR,
            payload: obj.message.error,
          });
        });
      } else {
        dispatch({
          type: SIGNUP_ERROR,
          payload: obj.message.error,
        });
      }
    });
};
