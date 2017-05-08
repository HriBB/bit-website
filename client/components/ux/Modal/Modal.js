import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import classnames from 'classnames'
import merge from 'lodash.merge'

import './Modal.scss'

const defaultStyles = {
  overlay: {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position                : 'absolute',
    top                     : 0,
    left                    : 0,
    right                   : 0,
    bottom                  : 0,
    border                  : 'none',
    background              : 'none',
    overflow                : 'hidden',
    WebkitOverflowScrolling : 'touch',
    borderRadius            : 0,
    outline                 : 'none',
    padding                 : 0
  }
}

const Modal = props => {
  const { centered, children, className, dark, fullscreen, light, ...rest } = props
  const modalClass = classnames('bit-modal', {
    'bit-modal--dark': dark,
    'bit-modal--light': light,
    'bit-modal--centered': centered,
    'bit-modal--fullscreen': fullscreen,
  }, className)
  const styles = merge({}, defaultStyles, {
    overlay: {
      backgroundColor: dark ? 'rgba(0,0,0,0.90)' : 'rgba(255,255,255,0.85)',
    },
  })
  return (
    <ReactModal
      className={modalClass}
      {...rest}
      style={styles}
      portalClassName={'bit-modal-portal'}
      overlayClassName={'bit-modal-overlay'}
    >
      {children}
    </ReactModal>
  )
}

Modal.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool,
  fullscreen: PropTypes.bool,
  isOpen: PropTypes.bool,
  light: PropTypes.bool,
  onRequestClose: PropTypes.func,
}

export default Modal
