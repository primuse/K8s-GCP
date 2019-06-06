import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Pagination extends Component {
  pagination = (index) => {
    const userId = this.props.auth.user.id;
    this.props.action(userId, index);
  }

  renderLinks = pages => Array(pages).fill(0)
    .map((value, index) => <Link to='#' className='links'
      key={index} onClick={() => { this.pagination(index); }}> {index + 1}</Link>);

  render() {
    const { pages } = this.props;
    return <div className='pagination'>
      <span>
        {this.renderLinks(pages)}
      </span>
    </div>;
  }
}

Pagination.propTypes = {
  pages: PropTypes.number,
  action: PropTypes.func,
  admin: PropTypes.bool,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Pagination);
