import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../modal.jsx';
import NewParcelModalForm from '../forms/newParcelForm.jsx';
import {
  archive, box, home, userSvg, boxOpen
} from '../../asset/imgs/ico';
import { HIDE_ASIDE } from '../../actions/actionTypes';

export class Aside extends Component {
  state = {
    modalDisplay: false,
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.closeAside);
  }

  showModal = () => {
    this.setState({ modalDisplay: true });
  }

  closeModal = () => {
    this.setState({ modalDisplay: false });
  }

  closeAside = (e) => {
    const { dispatch } = this.props;
    const nav = document.getElementById('nav');
    if (this.aside !== null || this.aside !== undefined) {
      if (!this.aside.contains(e.target) && !nav.contains(e.target)) {
        dispatch({ type: HIDE_ASIDE });
        document.removeEventListener('click', this.handleClick);
      }
    }
  }

  showAside = () => {
    document.addEventListener('click', this.closeAside);
    const { show } = this.props.users;
    if (show) return 'fade-in toggled-nav';
    return '';
  }

  render() {
    const { user } = this.props.auth;
    const { modalDisplay } = this.state;
    return <aside className={this.showAside()}>
      <div ref={node => this.aside = node} className='bg-blue' id='menu'>
        <div id='aside-profile'>
          <Link to='/dashboard'>
            <h3 className='m-0 pb-10'>
              Send<span className='head-span'>IT</span>
            </h3>
          </Link>
          <small id='user-id' className='d-block pb-10 white-3'>
            SD0{user.id}
          </small>
          <small>
            <p className='m-0'>Welcome {user.isadmin && <small>ADMIN</small>}</p>
            <p id='username'>{user.firstname} {user.lastname}</p>
          </small>
        </div>
        <ul className='mt-80'>
          <li>
            <img src={home} className='menu-ico' />
            <Link to='/dashboard'>
              <span>Dashboard</span>
            </Link>
          </li>
          {user.isadmin === false && <li>
            <img src={boxOpen}
              className='menu-ico' />
            <Link to='#' data-modal data-target='#parcelmodal' onClick={this.showModal}>
              <span>New Parcel</span>
            </Link>
          </li>}
          <li>
            <img src={archive}
              className='menu-ico' />
            <Link to='/delivered_parcels'>
              <span>Delivered Parcels</span>
            </Link>
          </li>
          <li>
            <img src={box}
              className='menu-ico' />
            <Link to='/inTransit_parcels'>
              <span>In-transit Parcels</span>
            </Link>
          </li>
          {user.isadmin && <li>
            <img src={userSvg}
              className='menu-ico' />
            <Link to='/all_users'>
              <span>All Users</span>
            </Link>
          </li>}
        </ul>
      </div>
      {modalDisplay
        && <Modal modalTitle='New parcel' ModalForm={NewParcelModalForm}
          closeModal={this.closeModal} />
      }
    </aside>;
  }
}

Aside.propTypes = {
  user: PropTypes.object,
  auth: PropTypes.object,
  users: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});

export default connect(mapStateToProps)(Aside);
