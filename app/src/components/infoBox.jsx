import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class InfoBox extends Component {
  render() {
    const created = this.props.parcel.createdParcels.length,
      inTransit = this.props.parcel.inTransitParcels.length,
      delivered = this.props.parcel.deliveredParcels.length;
    return (
      <div id='info-cont' className='mb-34'>
        <div className='info-box'>
          <small>Created</small>
          <h4 id='created' className='m-0'>{created}</h4>
        </div>
        <div className='info-box'>
          <small>In Transit</small>
          <h4 id='in-transit' className='m-0 blue'>{inTransit}</h4>
        </div>
        <div className='info-box'>
          <small>Delivered</small>
          <h4 id='delivered' className='m-0 green'>{delivered}</h4>
        </div>
      </div>
    );
  }
}

InfoBox.propTypes = {
  parcels: PropTypes.array,
  parcel: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
  parcel: state.parcel,
});

export default connect(mapStateToProps)(InfoBox);
