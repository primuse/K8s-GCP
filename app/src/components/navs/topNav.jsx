import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  bars
} from '../../asset/imgs/ico';
import { SHOW_ASIDE, LOG_OUT } from '../../actions/actionTypes';


export const TopNav = ({ dispatch }) => (
  <nav id='nav'>
    <a href='#' className='toggler mr-1' id='toggle'
    onClick={() => dispatch({ type: SHOW_ASIDE })}>
      <img src={bars} />
    </a>
    <ul className='p-0'>
      <li>
        Dashboard
      </li>
    </ul>
    <ul className='p-0 ml-auto'>
      <li className='mr-1'>
        <Link to='/profile'>
          My Profile
        </Link>
      </li>
      <li>
        <Link to='/' onClick={() => dispatch({ type: LOG_OUT })} >
          Logout
        </Link>
      </li>
    </ul>
  </nav>
);

TopNav.propTypes = {
  dispatch: PropTypes.func
};


export default connect()(TopNav);
