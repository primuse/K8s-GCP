import React from 'react';
import PropTypes from 'prop-types';
import {
  userBlack
} from '../../asset/imgs/ico';

const ProfileInfo = ({ user, parcel }) => (
    <div id='user-cont' className='d-flex'>
      <div id='user-desc'>
        <img src={userBlack} id='user-img' />
        <div className='text-center'>
          <h2 id='id'>SDO{user.id}</h2>
          <span id='profile-name' className='d-block mb-14'>
            <h4 id='firstName' className='d-inline'>{user.firstname}</h4>
            <h4 id='lastName' className='d-inline'>{user.lastname}</h4>
          </span>
          <small id='email'>{user.email}</small>
          <h5 id='registered'>Registered On {user.registered}</h5>
        </div>
      </div>
      <div id='user-info' className='text-center'>
        <h1 className='mb-6'>My Parcels</h1>
        <div className='d-flex content-between mb-6'>
          <div>
            <small>Created</small>
            <h4 id='created'>{parcel.createdParcels.length}</h4>
          </div>
          <div>
            <small>Delivered</small>
            <h4 id='delivered' className='green'>{parcel.deliveredParcels.length}</h4>
          </div>
          <div>
            <small>In-transit</small>
            <h4 id='in-transit' className='blue'>{parcel.inTransitParcels.length}</h4>
          </div>
          <div>
            <small>Cancelled</small>
          <h4 id='canceled' className='red'>{parcel.canceledParcels.length}</h4>
          </div>
        </div>
      </div>
    </div>
);

ProfileInfo.propTypes = {
  user: PropTypes.object,
  parcel: PropTypes.object
};

export default ProfileInfo;
