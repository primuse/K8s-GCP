import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle } from 'better-react-spinkit';
import { changeParcelStatus } from '../../actions/parcelActions';

export class StatusModalForm extends Component {
  state = {
    status: '',
  }

  componentWillUnmount() {
    // Clear State
    this.setState({
      status: '',
    });
  }

  save = (event) => {
    event.preventDefault();
    const data = this.state;
    this.props.changeParcelStatus(data);
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { status } = this.state;
    const { isLoading } = this.props.parcel;

    return <form id='statusForm' onSubmit={this.save}>
      <div className='form-row'>
        <input type='text' id='status' placeholder='In-transit, Delivered, Canceled'
          onChange={this.onChange} name='status' value={status} required />
      </div>
      <button type='submit' className='btn xsm is-outlined white'>Save
      {isLoading && (
        <span style={{ float: 'right', padding: '3px 3px 0 10px' }}>
          <Circle color={'rgba(255,255,255,1)'} />
        </span>
      )}
      </button>
    </form>;
  }
}


StatusModalForm.propTypes = {
  changeParcelStatus: PropTypes.func,
  parcel: PropTypes.object
};

const mapStateToProps = state => ({
  parcel: state.parcel,
});

export default connect(
  mapStateToProps,
  { changeParcelStatus }
)(StatusModalForm);
