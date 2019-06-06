import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOGIN_USER, LOGIN_ERROR, SIGNUP_ERROR, SIGNUP_USER,
  IS_LOADING
} from '../../src/actions/actionTypes';
import { loginUser, signupUser } from '../../src/actions/authActions';

const res = {
  data: {
    user: {
      firstName: 'tiku',
      lastName: 'okoye'
    },
    token: '5647htt2441a'
  }
};

const errorRes = {
  message: 'Internal server error'
};

describe('Login user', () => {
  it('dispatches the correct actions on successful fetch request', (done) => {
    fetch.mockResponse(JSON.stringify(res));

    const expectedActions = [
      { type: IS_LOADING },
      { type: LOGIN_USER, payload: res.data.user }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      user: {},
      isAuthenticated: false,
      isLoading: false
    }, expectedActions, done);

    store.dispatch(loginUser(res))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('dispatches the correct actions on unsuccessful fetch request', (done) => {
    fetch.mockReject(new Error(errorRes.message));

    const expectedActions = [
      { type: IS_LOADING },
      { type: LOGIN_ERROR, payload: errorRes.message }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      user: {},
      isAuthenticated: false,
      isLoading: false
    }, expectedActions, done);

    store.dispatch(loginUser(errorRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});

describe('Signup user', () => {
  it('dispatches the correct actions on successful fetch request', (done) => {
    fetch.mockResponse(JSON.stringify(res));

    const expectedActions = [
      { type: IS_LOADING },
      { type: SIGNUP_USER, payload: res.data.user }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      user: {},
      isAuthenticated: false,
      isLoading: false
    }, expectedActions, done);

    store.dispatch(signupUser(res))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('dispatches the correct actions on unsuccessful fetch request', (done) => {
    fetch.mockReject(new Error(errorRes.message));

    const expectedActions = [
      { type: IS_LOADING },
      { type: SIGNUP_ERROR, payload: errorRes.message }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      user: {},
      isAuthenticated: false,
      isLoading: false
    }, expectedActions, done);

    store.dispatch(signupUser(errorRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
