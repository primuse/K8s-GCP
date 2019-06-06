import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick = (e) => {
    const { closeModal } = this.props;
    if (this.modal !== null || this.modal !== undefined) {
      if (!this.modal.contains(e.target)) {
        closeModal();
        document.removeEventListener('click', this.handleClick);
      }
    }
  };


  render() {
    const { modalTitle, ModalForm } = this.props;
    return <div className='modal'>
      <div ref={node => this.modal = node} className='modal-box'>
        <div className='modal-content'>
          <h2 className='text-center white'>{ modalTitle }</h2>
          <ModalForm />
        </div>
      </div>
    </div>;
  }
}

Modal.propTypes = {
  modalTitle: PropTypes.string,
  ModalForm: PropTypes.func,
  closeModal: PropTypes.func,
};

export default Modal;
