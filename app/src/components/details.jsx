import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopNav from './navs/topNav.jsx';
import Aside from './navs/aside.jsx';
import ParcelDetails from './navs/parcelDetails.jsx';
import '../css/modules.css';
import '../css/style.css';
import '../css/dashboard.css';


const Details = (props) => {
  const { user } = props.auth;
  const parcelId = +props.match.params.parcelId;

  return <main>
    <Aside user={user} />
    <section className='grey' id='dash'>
      <TopNav />
      <div id='main-content-page'>
        <ParcelDetails user={user} parcelId={parcelId} />
      </div>
    </section>
  </main>;
};

Details.propTypes = {
  auth: PropTypes.object,
  parcel: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
  parcel: state.parcel,
});

export default connect(mapStateToProps)(Details);
