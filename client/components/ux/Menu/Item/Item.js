import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import ReactDOM, { findDOMNode } from 'react-dom'
import Portal from 'react-portal'
import classnames from 'classnames'

const KEYCODES = {
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  UP: 38,
  DOWN: 40,
}

export default class Item extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    closeMenu: PropTypes.func,
    onClick: PropTypes.func,
    tabIndex: PropTypes.number,
  }

  onClick = (e) => {
    const { closeMenu, onClick } = this.props
    if (onClick) onClick(this.props)
    closeMenu()
  }

  onKeyDown = (e) => {
    if (e.keyCode === KEYCODES.UP || e.keyCode === KEYCODES.DOWN) {
      const node = findDOMNode(this)
      const children = node.parentNode.children
      const i = [].indexOf.call(children, node)
      const len = children.length
      const next = e.keyCode === KEYCODES.DOWN ? (i+1)%len : (i+len-1)%len
      children[next].focus()
    } else if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
      this.onClick()
    }
  }

  render() {
    const { children, tabIndex } = this.props
    return (
      <li className={'bit-menu__item'} tabIndex={tabIndex} onClick={this.onClick} onKeyDown={this.onKeyDown}>
        {children}
      </li>
    )
  }

}
