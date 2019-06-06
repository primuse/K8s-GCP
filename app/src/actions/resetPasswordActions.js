import Swal from 'sweetalert2';
import {
  SEND_RESET_EMAIL, SEND_RESET_EMAIL_ERROR, SET_NEW_PASSWORD,
  PASSWORD_IS_LOADING
} from './actionTypes';
import handleErrors from '../helpers/errorHelper';

export const resetPassword = email => (dispatch) => {
  dispatch({ type: PASSWORD_IS_LOADING });
  const config = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(email),
  };

  return fetch('https://sendit2019.herokuapp.com/api/v1/reset/email', config)
    .then(handleErrors)
    .then(() => {
      Swal.fire({
        title: 'Success',
        text: 'A reset link has been sent to your mail',
        type: 'success',
        timer: 3000,
        showConfirmButton: false,
        width: 400,
      });
      dispatch({ type: SEND_RESET_EMAIL, payload: 'Success' });
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
            type: SEND_RESET_EMAIL_ERROR,
            payload: false,
          });
        });
      } else {
        dispatch({
          type: SEND_RESET_EMAIL_ERROR,
          payload: false,
        });
      }
    });
};

export const setNewPassword = password => (dispatch) => {
  dispatch({ type: PASSWORD_IS_LOADING });
  const urlParams = new URLSearchParams(window.location.search),
    token = urlParams.get('auth'),
    userId = urlParams.get('id');
  const config = {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    }),
    body: JSON.stringify(password),
  };

  return fetch(`https://sendit2019.herokuapp.com/api/v1/reset/${userId}`, config)
    .then(handleErrors)
    .then(() => {
      Swal.fire({
        title: 'Success',
        text: 'Successfuly updated Password',
        type: 'success',
        timer: 3000,
        showConfirmButton: false,
        width: 400,
      });
      dispatch({ type: SET_NEW_PASSWORD, payload: 'Success' });
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
            type: SEND_RESET_EMAIL_ERROR,
            payload: false,
          });
        });
      } else {
        dispatch({
          type: SEND_RESET_EMAIL_ERROR,
          payload: false,
        });
      }
    });
};
