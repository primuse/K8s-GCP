import Swal from 'sweetalert2';
import handleErrors from '../helpers/errorHelper';
import {
  SET_PAGES, USER_IS_LOADING, GET_All_USERS,
  GET_ERROR
} from './actionTypes';


export const getAllUsers = (offset = 0) => (dispatch) => {
  dispatch({ type: USER_IS_LOADING });
  const token = localStorage.getItem('token'), config = {
    method: 'GET',
    headers: new Headers({
      'x-access-token': token
    }),
  };
  return fetch(
    `https://sendit2019.herokuapp.com/api/v1/users?offset=${offset}`,
    config
  )
    .then(handleErrors)
    .then((res) => {
      dispatch({ type: GET_All_USERS, payload: res.data });
      dispatch({ type: SET_PAGES, payload: res.pages });
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
            type: GET_ERROR,
            payload: err,
          });
        });
      } else {
        dispatch({
          type: GET_ERROR,
          payload: err,
        });
      }
    });
};
