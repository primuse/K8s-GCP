import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopNav from './navs/topNav.jsx';
import Aside from './navs/aside.jsx';
import {
  ParcelTable
} from './navs/table.jsx';
import InfoBox from './infoBox.jsx';
import { getAllParcels, getUserParcels } from '../actions/parcelActions';
import AdminPagination from './adminPagination.jsx';
import Pagination from './pagination.jsx';
import '../css/modules.css';
import '../css/style.css';
import '../css/dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    const userId = this.props.auth.user.id;

    if (this.props.auth.user.isadmin) {
      this.props.getAllParcels();
      return;
    }
    this.props.getUserParcels(userId);
  }

  render() {
    const { parcels, pages, isLoading } = this.props.parcel;
    const { user } = this.props.auth;
    return <main>
      <Aside user={user}/>
      <section className='grey' id='dash'>
        <TopNav />
        <div id='main-content-page'>
          <InfoBox />
          <ParcelTable parcelText='All' parcels={parcels} isLoading={isLoading} />
          {this.props.auth.user.isadmin
            ? <AdminPagination pages={pages} action={this.props.getAllParcels} />
            : <Pagination pages={pages} action={this.props.getUserParcels} />
          }
        </div>
      </section>
    </main>;
  }
}

Dashboard.propTypes = {
  getAllParcels: PropTypes.func,
  getUserParcels: PropTypes.func,
  auth: PropTypes.object,
  parcel: PropTypes.object,
};


const mapStateToProps = state => ({
  auth: state.auth,
  parcel: state.parcel,
});

export default connect(mapStateToProps, { getAllParcels, getUserParcels })(Dashboard);
