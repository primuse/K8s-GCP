import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle } from 'better-react-spinkit';
import { changeParcelLocation } from '../../actions/parcelActions';

export class LocationModalForm extends Component {
  state = {
    currentLocation: '',
  }

  componentWillUnmount() {
    // Clear State
    this.setState({
      currentLocation: '',
    });
  }

  save = (event) => {
    event.preventDefault();
    const data = this.state;
    this.props.changeParcelLocation(data);
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { currentLocation } = this.state;
    const { isLoading } = this.props.parcel;

    return <form id='locationForm' className='text-right' onSubmit={this.save}>
    <div className='form-row'>
      <input type='text' id='currentLocation'
      onChange={this.onChange} name='currentLocation' value={currentLocation} required />
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

LocationModalForm.propTypes = {
  changeParcelLocation: PropTypes.func,
  parcel: PropTypes.object
};

const mapStateToProps = state => ({
  parcel: state.parcel,
});

export default connect(
  mapStateToProps,
  { changeParcelLocation }
)(LocationModalForm);
