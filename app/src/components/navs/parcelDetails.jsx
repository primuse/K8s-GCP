import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DestinationModalForm from '../forms/changeDestinationForm.jsx';
import CancelParcelModal from '../forms/cancelParcelModal.jsx';
import LocationParcelForm from '../forms/changeLocationForm.jsx';
import StatusParcelForm from '../forms/changeParcelStatusForm.jsx';
import Modal from '../modal.jsx';
import { getUserParcel } from '../../actions/parcelActions';
import { parcelBox } from '../../asset/imgs/ico/index';

class ParcelDetails extends Component {
  state = {
    modalDisplay: false,
    modalContent: ''
  };

  componentDidMount() {
    const { parcelId } = this.props;
    this.props.getUserParcel(parcelId);
  }

  showModal = (form) => {
    this.setState({ modalDisplay: true, modalContent: form });
  }

  closeModal = () => {
    this.setState({ modalDisplay: false });
  }

  render() {
    const parcel = this.props.parcel.userParcel;
    const { user } = this.props;
    const { modalDisplay, modalContent } = this.state;

    return <div id='parcel' className='dash-cont d-flex mt-40'>
      <div id='map'>
        <img src={parcelBox} />
      </div>
      <div className='parcel-details p-10'>
        <h4 id='parcel-Id' className='parcel-title text-center m-0 mb-24'>
          PO{parcel.id}</h4>
        <div id='details' className='pb-10'>
          <div>
            <h6>Name:</h6>
            <h6>Destination:</h6>
            <h6>Pickup Location:</h6>
            <h6>Current Location:</h6>
            <h6>Addressed to:</h6>
            <h6>Phone Number</h6>
            <h6>Price:</h6>
            <h6>Sent On:</h6>
            <h6>Delivered On:</h6>
            <h6>Status:</h6>
          </div>
          <div className='space'></div>
          <div>
            <p>{parcel.parcelname}</p>
            <p>{parcel.destination}</p>
            <p>{parcel.pickuplocation}</p>
            <p>{parcel.currentlocation}</p>
            <p>{parcel.receiver}</p>
            <p>{parcel.phonenumber}</p>
            <p>N{parcel.price}</p>
            <p>{parcel.senton}</p>
            <p>{parcel.deliveredon ? parcel.deliveredon : 'Not yet delivered'}</p>
            <p>{parcel.status}</p>
          </div>
        </div>
        <div id='details_btns' className='parcel-footer-btns'>
          {user.isadmin
            ? <a href='#' data-modal data-target='#location-modal'
              className='btn sm bg-blue mr-3 white'
              onClick={() => this.showModal('changeLocation')}>Change Location</a>
            : <a href='#' data-modal data-target='#destination-modal'
              className='btn sm bg-blue mr-1 white'
              onClick={() => this.showModal('changeDestination')}>Change Destination</a>
          }
          {user.isadmin
            ? <a href='#' data-modal data-target='#update-modal'
              className='btn sm is-outlined-blue'
              onClick={() => this.showModal('changeStatus')}>Update Status</a>
            : <a href='#' data-modal data-target='#cancel-modal'
              className='btn sm is-outlined-blue'
              onClick={() => this.showModal('cancelParcel')}>Cancel Parcel</a>
          }
        </div>
      </div>
      {modalDisplay
        && <Modal modalTitle= {
          modalContent === 'changeDestination' ? 'Change Destination'
            : modalContent === 'changeLocation' ? 'Change Location'
              : modalContent === 'changeStatus' ? 'Update Status' : ''
        }
        ModalForm= {
          modalContent === 'changeDestination' ? DestinationModalForm
            : modalContent === 'cancelParcel' ? CancelParcelModal
              : modalContent === 'changeLocation' ? LocationParcelForm
                : modalContent === 'changeStatus' ? StatusParcelForm : ''
        }
        closeModal={this.closeModal} />
      }
    </div>;
  }
}

ParcelDetails.propTypes = {
  parcel: PropTypes.object,
  user: PropTypes.object,
  getUserParcel: PropTypes.func,
  parcelId: PropTypes.number
};

const mapStateToProps = state => ({
  parcel: state.parcel,
});

export default connect(mapStateToProps, { getUserParcel })(ParcelDetails);
