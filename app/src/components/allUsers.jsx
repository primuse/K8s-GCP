import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../history';
import TopNav from './navs/topNav.jsx';
import Aside from './navs/aside.jsx';
import { UserTable } from './navs/userTable.jsx';
import { getAllUsers } from '../actions/userActions';
import AdminPagination from './adminPagination.jsx';
import '../css/modules.css';
import '../css/style.css';
import '../css/dashboard.css';

class AllUsers extends Component {
  componentDidMount() {
    if (!localStorage.token) {
      localStorage.clear();
      history.push('/');
      return;
    }
    this.props.getAllUsers();
  }

  render() {
    const { user } = this.props.auth;
    const { allUsers, pages, isLoading } = this.props.users;

    return <main>
      <Aside user={user} />
      <section className='grey' id='dash'>
        <TopNav />
        <div id='main-content-page'>
          <UserTable allUsers={allUsers} isLoading={isLoading} />
          <AdminPagination pages={pages} action={this.props.getAllUsers} />
        </div>
      </section>
    </main>;
  }
}

AllUsers.propTypes = {
  getAllUsers: PropTypes.func,
  users: PropTypes.object,
  auth: PropTypes.object,
};


const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, { getAllUsers })(AllUsers);
