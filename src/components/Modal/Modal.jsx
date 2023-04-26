import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    tags: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { tags, largeImage } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={largeImage} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
