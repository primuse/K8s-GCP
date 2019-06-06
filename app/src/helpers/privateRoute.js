import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';


const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
      {...rest}
      render={props => (auth.isAuthenticated ? (
          <Component {...props} />
      ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
      ))
      }
    />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  auth: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
