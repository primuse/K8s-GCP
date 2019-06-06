import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router, Route, Switch
} from 'react-router-dom';
import history from './history';
import PrivateRoute from './helpers/privateRoute';
import ResetPassword, { Login, Reset, Signup } from './components/auth/login.jsx';
import Dashboard from './components/dashboard.jsx';
import DeliveredParcel from './components/deliveredParcel.jsx';
import InTransitParcel from './components/inTransitParcel.jsx';
import Profile from './components/profile.jsx';
import Details from './components/details.jsx';
import AllUsers from './components/allUsers.jsx';
import store from './store';


const MainApp = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/reset' component={Reset} />
        <Route exact path='/set_password' component={ResetPassword} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/delivered_parcels' component={DeliveredParcel} />
        <PrivateRoute exact path='/inTransit_parcels' component={InTransitParcel} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/details/:parcelId' component={Details} />
        <PrivateRoute exact path='/all_users' component={AllUsers} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<MainApp />, document.getElementById('app'));

export default MainApp;
