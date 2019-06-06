import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  SEND_RESET_EMAIL, SEND_RESET_EMAIL_ERROR, SET_NEW_PASSWORD,
  PASSWORD_IS_LOADING
} from '../../src/actions/actionTypes';
import { resetPassword, setNewPassword } from '../../src/actions/resetPasswordActions';

const errorRes = {
  message: 'Internal server error'
};

describe('Send reset password link', () => {
  it('dispatches the correct actions on successful fetch request', (done) => {
    fetch.mockResponse(JSON.stringify('Successfully sent email'));

    const expectedActions = [
      { type: PASSWORD_IS_LOADING },
      { type: SEND_RESET_EMAIL, payload: 'Success' }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      emailSent: '',
      error: '',
      isLoading: false,
      newPassword: ''
    }, expectedActions, done);

    store.dispatch(resetPassword('Successfully sent email'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('dispatches the correct actions on unsuccessful fetch request', (done) => {
    fetch.mockReject(new Error(errorRes.message));

    const expectedActions = [
      { type: PASSWORD_IS_LOADING },
      { type: SEND_RESET_EMAIL_ERROR, payload: false }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      emailSent: '',
      error: '',
      isLoading: false,
      newPassword: ''
    }, expectedActions, done);

    store.dispatch(resetPassword(errorRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});

describe('Update User password', () => {
  it('dispatches the correct actions on successful fetch request', (done) => {
    fetch.mockResponse(JSON.stringify('Successfully update password'));

    const expectedActions = [
      { type: PASSWORD_IS_LOADING },
      { type: SET_NEW_PASSWORD, payload: 'Success' }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      emailSent: '',
      error: '',
      isLoading: false,
      newPassword: ''
    }, expectedActions, done);

    store.dispatch(setNewPassword('Successfully update password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('dispatches the correct actions on unsuccessful fetch request', (done) => {
    fetch.mockReject(new Error(errorRes.message));

    const expectedActions = [
      { type: PASSWORD_IS_LOADING },
      { type: SEND_RESET_EMAIL_ERROR, payload: false }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      emailSent: '',
      error: '',
      isLoading: false,
      newPassword: ''
    }, expectedActions, done);

    store.dispatch(setNewPassword(errorRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
