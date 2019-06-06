import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle } from 'better-react-spinkit';
import { changeParcelDestination } from '../../actions/parcelActions';

export class DestinationModalForm extends Component {
  state = {
    destination: '',
  }

  componentWillUnmount() {
    // Clear State
    this.setState({
      destination: '',
    });
  }

  save = (event) => {
    event.preventDefault();
    const data = this.state;
    this.props.changeParcelDestination(data);
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { destination } = this.state;
    const { isLoading } = this.props.parcel;

    return <form id='changeDestination' className='text-right' onSubmit={this.save}>
      <div className='form-row'>
        <input type='text' id='destination' name='destination'
        onChange={this.onChange} value={destination} required />
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

DestinationModalForm.propTypes = {
  changeParcelDestination: PropTypes.func,
  parcel: PropTypes.object
};

const mapStateToProps = state => ({
  parcel: state.parcel,
});

export default connect(
  mapStateToProps,
  { changeParcelDestination }
)(DestinationModalForm);
