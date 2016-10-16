import React, { Component, PropTypes } from 'react'
import ReactModal from 'react-modal'
import classnames from 'classnames'
import Slick from 'react-slick'

import {
  Layout,
  Header,
  Content,
  Footer,
  Title,
  IconButton,
  Modal,
} from 'components/ux'

import './Slider.scss'

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 250,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export default class Slider extends Component {

  static propTypes = {
    afterChange: PropTypes.func,
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    close: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    title: PropTypes.string.isRequired,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.index !== this.props.index) {
      this.slider.slickGoTo(this.props.index)
    }
  }

  render() {
    const { afterChange, children, className, close, index, subTitle, title, ...rest } = this.props
    const modalClass = classnames('bit-modal-slider', className)
    const settings = Object.assign({}, sliderSettings, {
      ref: ref => this.slider = ref,
      initialSlide: index,
      afterChange,
    })
    return (
      <Modal className={modalClass} {...rest} dark>
        <Layout>
          <Header dark>
            <Title flex centered>{title}</Title>
            <IconButton name={'close'} onClick={close}/>
          </Header>
          <Content>
            <Slick {...settings}>
              {children}
            </Slick>
          </Content>
          <Footer dark centered>
            {subTitle}
          </Footer>
        </Layout>
      </Modal>
    )
  }

}
