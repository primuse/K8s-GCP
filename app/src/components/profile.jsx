import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileInfo from './navs/profile.jsx';
import TopNav from './navs/topNav.jsx';
import Aside from './navs/aside.jsx';
import '../css/modules.css';
import '../css/style.css';
import '../css/dashboard.css';

class Profile extends Component {
  profileStyle = {
    marginTop: '60px'
  };

  render() {
    const { user } = this.props.auth;
    const { parcel } = this.props;

    return (
      <main>
        <Aside user={user} />
        <section className='grey' id='dash'>
          <TopNav />
          <div id='main-content-page' style={this.profileStyle}>
            <ProfileInfo user={user} parcel={parcel} />
          </div>
        </section>
      </main>
    );
  }
}
Profile.propTypes = {
  auth: PropTypes.object,
  parcel: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
  parcel: state.parcel,
});

export default connect(mapStateToProps)(Profile);
