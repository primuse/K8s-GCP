import {
  GET_All_USER_ORDERS, GET_CANCELED_USER_ORDERS,
  GET_CREATED_USER_ORDERS, GET_DELIVERED_USER_ORDERS,
  GET_INTRANSIT_USER_ORDERS, PARCEL_IS_LOADING, CREATE_NEW_PARCEL,
  SET_PAGES, CHANGE_PARCEL_DESTINATION, ERROR, GET_USER_PARCEL,
  CANCEL_PARCEL, CHANGE_PARCEL_LOCATION, CHANGE_PARCEL_STATUS
} from '../actions/actionTypes';

const initialState = {
  error: '',
  isLoading: false,
  parcels: [],
  userParcel: {},
  deliveredParcels: [],
  inTransitParcels: [],
  createdParcels: [],
  canceledParcels: [],
  newParcel: [],
  changeDestination: '',
  changeLocation: '',
  pages: null,
  cancelParcel: '',
  changeStatus: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_All_USER_ORDERS:
      return {
        ...state,
        isLoading: false,
        parcels: action.payload,
      };
    case GET_DELIVERED_USER_ORDERS:
      return {
        ...state,
        isLoading: false,
        deliveredParcels: action.payload,
      };
    case GET_INTRANSIT_USER_ORDERS:
      return {
        ...state,
        isLoading: false,
        inTransitParcels: action.payload,
      };
    case GET_CREATED_USER_ORDERS:
      return {
        ...state,
        isLoading: false,
        createdParcels: action.payload,
      };
    case GET_CANCELED_USER_ORDERS:
      return {
        ...state,
        isLoading: false,
        canceledParcels: action.payload,
      };
    case GET_USER_PARCEL:
      return {
        ...state,
        isLoading: false,
        userParcel: action.payload,
      };
    case CREATE_NEW_PARCEL:
      return {
        ...state,
        isLoading: false,
        newParcel: action.payload,
      };
    case PARCEL_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case CHANGE_PARCEL_DESTINATION:
      return {
        ...state,
        isLoading: false,
        changeDestination: action.payload
      };
    case CHANGE_PARCEL_LOCATION:
      return {
        ...state,
        isLoading: false,
        changeLocation: action.payload
      };
    case CHANGE_PARCEL_STATUS:
      return {
        ...state,
        isLoading: false,
        changeStatus: action.payload
      };
    case CANCEL_PARCEL:
      return {
        ...state,
        isLoading: false,
        cancelParcel: action.payload
      };
    case SET_PAGES:
      return {
        ...state,
        pages: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
