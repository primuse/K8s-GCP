import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AdminPagination extends Component {
  pagination = (index) => {
    this.props.action(index);
  }

  renderLinks = pages => Array(pages).fill(0)
    .map((value, index) => <Link to='#' className='links'
    key={index} onClick={() => { this.pagination(index); }}> {index + 1 }</Link>);

  render() {
    const { pages } = this.props;
    return <div className='pagination'>
      <span>
        {this.renderLinks(pages)}
      </span>
    </div>;
  }
}

AdminPagination.propTypes = {
  pages: PropTypes.number,
  action: PropTypes.func,
  admin: PropTypes.bool,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminPagination);
