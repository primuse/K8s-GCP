import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle } from 'better-react-spinkit';
import { cancelParcel } from '../../actions/parcelActions';

export class CancelParcelModal extends Component {
  cancel = (event) => {
    event.preventDefault();
    this.props.cancelParcel();
  }

  render() {
    const { isLoading } = this.props.parcel;

    return <form id='cancelForm' onSubmit={this.cancel} className='text-center'>
      <h5 className='white'>Are you sure? You cannot undo this action</h5>
      <button type='submit' id='cancelButton'
      className='btn xsm is-outlined mr-2 white'>Continue
      {isLoading && (
          <span style={{ float: 'right', padding: '3px 3px 0 10px' }}>
            <Circle color={'rgba(255,255,255,1)'} />
          </span>
      )}
      </button>
    </form>;
  }
}

CancelParcelModal.propTypes = {
  cancelParcel: PropTypes.func,
  parcel: PropTypes.object
};

const mapStateToProps = state => ({
  parcel: state.parcel,
});

export default connect(
  mapStateToProps,
  { cancelParcel }
)(CancelParcelModal);
