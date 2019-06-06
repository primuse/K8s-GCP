/* eslint-disable camelcase */
import {
  SEND_RESET_EMAIL, SEND_RESET_EMAIL_ERROR, PASSWORD_IS_LOADING,
  SET_NEW_PASSWORD
} from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/resetPasswordReducer';

describe('Reset Password reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      emailSent: '',
      error: '',
      isLoading: false,
      newPassword: ''
    });
  });
  it('should send reset email', () => {
    const successAction = {
      type: SEND_RESET_EMAIL,
      payload: 'Success',
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        emailSent: 'Success'
      });
  });
  it('should show an error message', () => {
    const errorAction = {
      type: SEND_RESET_EMAIL_ERROR,
      payload: 'Internal server errror',
    };
    expect(reducer({}, errorAction))
      .toEqual({
        isLoading: false,
        error: 'Internal server errror'
      });
  });
  it('should update user password', () => {
    const successAction = {
      type: SET_NEW_PASSWORD,
      payload: 'Success',
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        newPassword: 'Success'
      });
  });
  it('should show loading', () => {
    const successAction = {
      type: PASSWORD_IS_LOADING,
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: true,
      });
  });
});
