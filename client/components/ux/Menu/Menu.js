import React, { Component, PropTypes, Children, cloneElement } from 'react'
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations'
import ReactDOM, { findDOMNode } from 'react-dom'
import Portal from 'react-portal'
import classnames from 'classnames'

import './Menu.scss'

export default class Menu extends Component {

  static propTypes = {
    align: PropTypes.oneOf(['left', 'right']),
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    target: PropTypes.element.isRequired,
    valign: PropTypes.oneOf(['bottom', 'top'])
  }

  static defaultProps = {
    align: 'left',
    valign: 'bottom',
  }

  constructor(props) {
    super(props)
    this.node = null
    this.portal = null
    this.menu = null
    this.open = false
    this.onDocumentKeydown = this.onDocumentKeydown.bind(this)
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this)
    this.onTargetMouseUp = this.onTargetMouseUp.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.open) {
      this.renderMenu(nextProps)
    }
  }

  componentWillUnmount() {
    if (this.open) {
      this.closeMenu()
    }
  }

  onDocumentKeydown(e) {
    const ESCAPE = 27
    if (e.keyCode === ESCAPE) {
      this.closeMenu()
    }
  }

  onDocumentMouseUp = (e) => {
    const portal = findDOMNode(this.portal)
    if (portal.contains(e.target) || (e.button && e.button !== 0)) return
    e.stopPropagation()
    this.closeMenu()
  }

  onTargetMouseUp = (e) => {
    if (!this.open) {
      this.renderMenu(this.props)
    }
  }

  positionMenu() {
    const { align, valign } = this.props
    const { innerWidth, innerHeight, scrollX, scrollY } = window
    const target = findDOMNode(this).getBoundingClientRect()
    const portal = findDOMNode(this.portal).getBoundingClientRect()
    let menuX, menuY, originX, originY

    if (align === 'left') {
      //
      // left
      //
      menuX = target.left + scrollX
      originX = 'left'
      //
      // move to right
      //
      if ((menuX + portal.width) > (innerWidth + scrollX)) {
        menuX = target.right + scrollX - portal.width
        originX = 'right'
      }
    } else {
      //
      // right
      //
      menuX = target.right + scrollX - portal.width
      originX = 'right'
      //
      // move to left
      //
      if (menuX < 0) {
        menuX = target.left + scrollX
        originX = 'left'
      }
    }

    if (valign === 'top') {
      //
      // top
      //
      menuY = target.top - portal.height + scrollY
      originY = 'bottom'
      //
      // move to bottom
      //
      if (menuY < 0) {
        menuY = target.bottom + scrollY
        originY = 'top'
      }
    } else {
      //
      // bottom
      //
      menuY = target.bottom + scrollY
      originY = 'top'
      //
      // move to top
      //
      if ((menuY + portal.height) > (innerHeight + scrollY)) {
        menuY = target.top - portal.height + scrollY
        originY = 'bottom'
      }
    }

    // set initial style
    this.node.style.left = `${menuX}px`
    this.node.style.top = `${menuY}px`
    this.node.style.transform = 'scale3d(0.01, 0.01, 1)'
    this.node.style.transformOrigin = `${originX} ${originY}`

    // do the animation
    setTimeout(() => {
      this.node.style.opacity = '1'
      this.node.style.transform = 'scale3d(1, 1, 1)'
      this.node.style.transition = 'transform 0.2s ease'
    }, 20)
  }

  renderMenu(props) {
    const { children, className } = props
    if (!this.node) {
      this.node = document.createElement('div')
      this.node.className = classnames('bit-menu', className)
      document.body.appendChild(this.node)
      document.addEventListener('keydown', this.onDocumentKeydown)
      document.addEventListener('mouseup', this.onDocumentMouseUp)
    }
    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <MenuList>{children}</MenuList>,
      this.node
    )
    this.open = true
    this.positionMenu()
  }

  closeMenu() {
    document.removeEventListener('keydown', this.onDocumentKeydown)
    document.removeEventListener('mouseup', this.onDocumentMouseUp)
    ReactDOM.unmountComponentAtNode(this.node)
    document.body.removeChild(this.node)
    this.portal = null
    this.node = null
    this.open = false
  }

  render() {
    return cloneElement(this.props.target, {
      onMouseUp: this.onTargetMouseUp
    })
  }

}

class MenuList extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    const { children } = this.props
    return (
      <ul className={'bit-menu__list'}>
        {children}
      </ul>
    )
  }

}

export class MenuItem extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    const { children } = this.props
    return (
      <li className={'bit-menu__item'}>
        {children}
      </li>
    )
  }

}
