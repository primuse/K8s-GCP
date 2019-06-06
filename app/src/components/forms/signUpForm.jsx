import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Circle } from 'better-react-spinkit';
import { signupUser } from '../../actions/authActions';

export class SignupForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  componentWillUnmount() {
    // Clear State
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  signUp = (event) => {
    event.preventDefault();
    const data = this.state;

    this.props.signupUser(data);
  }

  render() {
    const {
      firstName, lastName, email, password
    } = this.state;
    const { isLoading } = this.props.auth;
    return (
      <form id='signupForm' onSubmit={this.signUp}>
        <div className='column is-two form-row'>
          <input
            type='text'
            name='firstName'
            value={firstName}
            id='firstName'
            placeholder='First name'
            required
            onChange={this.onChange}
          />
          <input
            type='text'
            name='lastName'
            value={lastName}
            id='lastName'
            placeholder='Last name'
            required
            onChange={this.onChange}
          />
        </div>
        <div className='column is-two form-row'>
          <input
            type='email'
            name='email'
            value={email}
            id='email'
            placeholder='Email'
            required
            onChange={this.onChange}
          />
          <input
            type='password'
            name='password'
            value={password}
            id='password'
            placeholder='Password'
            required
            onChange={this.onChange}
          />
        </div>
        <button type='submit' className='btn lg is-outlined'>
          Signup
          {isLoading && (
            <span style={{ float: 'right', padding: '3px 3px 0 10px' }}>
              <Circle color={'rgba(255,255,255,1)'} />
            </span>
          )}
        </button>
      </form>
    );
  }
}

SignupForm.propTypes = {
  signupUser: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signupUser })(SignupForm);
