import Swal from 'sweetalert2';
import handleErrors from '../helpers/errorHelper';
import {
  GET_DELIVERED_USER_ORDERS, GET_INTRANSIT_USER_ORDERS, GET_CANCELED_USER_ORDERS,
  GET_CREATED_USER_ORDERS, GET_All_USER_ORDERS, PARCEL_IS_LOADING,
  CREATE_NEW_PARCEL, ERROR, SET_PAGES, CHANGE_PARCEL_DESTINATION, GET_USER_PARCEL,
  CANCEL_PARCEL, CHANGE_PARCEL_LOCATION, CHANGE_PARCEL_STATUS
} from './actionTypes';

let parcelID;

export const getUserParcels = (userId, offset = 0) => (dispatch) => {
  dispatch({ type: PARCEL_IS_LOADING });
  const token = localStorage.getItem('token'), config = {
    method: 'GET',
    headers: new Headers({
      'x-access-token': token
    }),
  };
  return fetch(
    `https://sendit2019.herokuapp.com/api/v1/users/${userId}/parcels?offset=${offset}`,
    config
  )
    .then(handleErrors)
    .then((res) => {
      const parcels = Object.values(res.data),
        deliveredParcels = parcels.filter(parcel => parcel.status === 'Delivered'),
        inTransitParcels = parcels.filter(parcel => parcel.status === 'In-transit'),
        createdParcels = parcels.filter(parcel => parcel.status === 'Created'),
        canceledParcels = parcels.filter(parcel => parcel.status === 'Canceled');

      dispatch({ type: GET_DELIVERED_USER_ORDERS, payload: deliveredParcels });
      dispatch({ type: GET_INTRANSIT_USER_ORDERS, payload: inTransitParcels });
      dispatch({ type: GET_CREATED_USER_ORDERS, payload: createdParcels });
      dispatch({ type: GET_CANCELED_USER_ORDERS, payload: canceledParcels });
      dispatch({ type: GET_All_USER_ORDERS, payload: parcels });
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
            type: ERROR,
            payload: obj.message,
          });
        });
      } else {
        dispatch({
          type: ERROR,
          payload: obj.message,
        });
      }
    });
};

export const getUserParcel = parcelId => (dispatch) => {
  dispatch({ type: PARCEL_IS_LOADING });
  const token = localStorage.getItem('token'), config = {
    method: 'GET',
    headers: new Headers({
      'x-access-token': token
    }),
  };
  return fetch(
    `https://sendit2019.herokuapp.com/api/v1/parcels/${parcelId}`,
    config
  )
    .then(handleErrors)
    .then((res) => {
      const parcel = res.data[0];
      parcelID = parcel.id;
      dispatch({ type: GET_USER_PARCEL, payload: parcel });
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
            type: ERROR,
            payload: obj.message,
          });
        });
      } else {
        dispatch({
          type: ERROR,
          payload: obj.message,
        });
      }
    });
};

export const getAllParcels = (offset = 0) => (dispatch) => {
  dispatch({ type: PARCEL_IS_LOADING });
  const token = localStorage.getItem('token'), config = {
    method: 'GET',
    headers: new Headers({
      'x-access-token': token
    }),
  };
  return fetch(
    `https://sendit2019.herokuapp.com/api/v1/parcels?offset=${offset}`,
    config
  )
    .then(handleErrors)
    .then((res) => {
      const parcels = Object.values(res.data),
        deliveredParcels = parcels.filter(parcel => parcel.status === 'Delivered'),
        inTransitParcels = parcels.filter(parcel => parcel.status === 'In-transit'),
        createdParcels = parcels.filter(parcel => parcel.status === 'Created'),
        canceledParcels = parcels.filter(parcel => parcel.status === 'Canceled');

      dispatch({ type: GET_DELIVERED_USER_ORDERS, payload: deliveredParcels });
      dispatch({ type: GET_INTRANSIT_USER_ORDERS, payload: inTransitParcels });
      dispatch({ type: GET_CREATED_USER_ORDERS, payload: createdParcels });
      dispatch({ type: GET_CANCELED_USER_ORDERS, payload: canceledParcels });
      dispatch({ type: GET_All_USER_ORDERS, payload: parcels });
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
            type: ERROR,
            payload: err,
          });
        });
      } else {
        dispatch({
          type: ERROR,
          payload: obj.message,
        });
      }
    });
};

export const createNewParcel = data => (dispatch) => {
  dispatch({ type: PARCEL_IS_LOADING });
  const token = localStorage.getItem('token');
  const config = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    }),
    body: JSON.stringify(data),
  };
  return fetch(
    'https://sendit2019.herokuapp.com/api/v1/parcels',
    config
  )
    .then(handleErrors)
    .then((res) => {
      const parcel = res.rows;
      Swal.fire({
        title: 'Success!',
        text: 'Successfully created parcel',
        type: 'success',
        timer: 3000,
        showConfirmButton: false,
        width: 400,
      });
      dispatch({ type: CREATE_NEW_PARCEL, payload: parcel });
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
            type: ERROR,
            payload: obj.message,
          });
        });
      } else {
        dispatch({
          type: ERROR,
          payload: obj.message,
        });
      }
    });
};

export const changeParcelDestination = destination => (dispatch) => {
  dispatch({ type: PARCEL_IS_LOADING });
  const token = localStorage.getItem('token');
  const config = {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    }),
    body: JSON.stringify(destination),
  };
  return fetch(
    `https://sendit2019.herokuapp.com/api/v1/parcels/${parcelID}/destination`,
    config
  )
    .then(handleErrors)
    .then(async () => {
      await Swal.fire({
        title: 'Success!',
        text: 'Successfully Updated destination',
        type: 'success',
        timer: 3000,
        showConfirmButton: false,
        width: 400,
      });
      dispatch({ type: CHANGE_PARCEL_DESTINATION, payload: 'Success' });
      window.location.reload(true);
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
            type: ERROR,
            payload: obj.message,
          });
        });
      } else {
        dispatch({
          type: ERROR,
          payload: obj.message,
        });
      }
    });
};

export const cancelParcel = () => (dispatch) => {
  dispatch({ type: PARCEL_IS_LOADING });
  const token = localStorage.getItem('token');
  const config = {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    })
  };
  return fetch(
    `https://sendit2019.herokuapp.com/api/v1/parcels/${parcelID}/cancel`,
    config
  )
    .then(handleErrors)
    .then(async () => {
      await Swal.fire({
        title: 'Success!',
        text: 'Successfully Canceled Parcel',
        type: 'success',
        timer: 3000,
        showConfirmButton: false,
        width: 400,
      });
      dispatch({ type: CANCEL_PARCEL, payload: 'Success' });
      window.location.reload(true);
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
            type: ERROR,
            payload: obj.message,
          });
        });
      } else {
        dispatch({
          type: ERROR,
          payload: obj.message,
        });
      }
    });
};


export const changeParcelLocation = currentLocation => (dispatch) => {
  dispatch({ type: PARCEL_IS_LOADING });
  const token = localStorage.getItem('token');
  const config = {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    }),
    body: JSON.stringify(currentLocation),
  };
  return fetch(
    `https://sendit2019.herokuapp.com/api/v1/parcels/${parcelID}/currentlocation`,
    config
  )
    .then(handleErrors)
    .then(async () => {
      await Swal.fire({
        title: 'Success!',
        text: 'Successfully Updated location',
        type: 'success',
        timer: 3000,
        showConfirmButton: false,
        width: 400,
      });
      dispatch({ type: CHANGE_PARCEL_LOCATION, payload: 'Success' });
      window.location.reload(true);
    })
    .catch((err) => {
      if (err.json) {
        err.json().then((obj) => {
          dispatch({
            type: ERROR,
            payload: obj.message,
          });
          Swal.fire({
            title: 'Error!',
            text: obj.message,
            type: 'error',
            timer: 3000,
            showConfirmButton: false,
            width: 400,
          });
        });
      } else {
        dispatch({
          type: ERROR,
          payload: obj.message,
        });
      }
    });
};

export const changeParcelStatus = status => (dispatch) => {
  dispatch({ type: PARCEL_IS_LOADING });
  const token = localStorage.getItem('token');
  const config = {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    }),
    body: JSON.stringify(status),
  };
  return fetch(
    `https://sendit2019.herokuapp.com/api/v1/parcels/${parcelID}/status`,
    config
  )
    .then(handleErrors)
    .then(async () => {
      await Swal.fire({
        title: 'Success!',
        text: 'Successfully Updated status',
        type: 'success',
        timer: 3000,
        showConfirmButton: false,
        width: 400,
      });
      dispatch({ type: CHANGE_PARCEL_STATUS, payload: 'Success' });
      window.location.reload(true);
    })
    .catch((err) => {
      if (err.json) {
        err.json().then((obj) => {
          dispatch({
            type: ERROR,
            payload: obj.message,
          });
          Swal.fire({
            title: 'Error!',
            text: obj.message,
            type: 'error',
            timer: 3000,
            showConfirmButton: false,
            width: 400,
          });
        });
      } else {
        dispatch({
          type: ERROR,
          payload: obj.message,
        });
      }
    });
};
