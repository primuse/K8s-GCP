import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Circle } from 'better-react-spinkit';
import { loginUser } from '../../actions/authActions';

export class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  };

  componentWillUnmount() {
    // Clear State
    this.setState({
      email: '',
      password: '',
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = (event) => {
    event.preventDefault();
    const data = this.state;

    this.props.loginUser(data);
  }

  render() {
    const { email, password } = this.state;
    const { isLoading } = this.props.auth;

    return <form id="login-form" className="text-center" onSubmit={this.login}>
        <div className="form-row">
          <input type="email" id="email" name="email" value={email}
          placeholder="Email" required onChange={this.onChange} />
        </div>
        <div className="form-row">
          <input type="password" id="pwd" name="password" value={password}
          placeholder="Password" required onChange={this.onChange} />
        </div>
        <button type="submit" className="btn lg is-outlined mb-14">Login
          {isLoading && (
          <span style={{ float: 'right', padding: '3px 3px 0 10px' }}>
            <Circle color={'rgba(255,255,255,1)'} />
          </span>
          )}
        </button>
        <div>
          <Link to="/reset">Forgot Password?</Link>
        </div>
      </form>;
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(LoginForm);
