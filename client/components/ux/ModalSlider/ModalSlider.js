import React, { Component, PropTypes } from 'react'
import ReactModal from 'react-modal'
import classnames from 'classnames'
import Slider from 'react-slick'

import './ModalSlider.scss'

import { Layout, Header, Content, Footer, Title } from 'components/ux/Layout'
import IconButton from 'components/ux/IconButton'
import Modal from 'components/ux/Modal'

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 250,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const ModalSlider = props => {
  const { children, className, close, ...rest } = props
  const modalClass = classnames('bit-modal-slider', className)
  return (
    <Modal className={modalClass} {...rest} dark>
      <Layout>
        <Header dark>
          <Title flex>Gallery</Title>
          <IconButton name={'close'} onClick={close}/>
        </Header>
        <Content>
          <Slider {...sliderSettings}>
            {children}
          </Slider>
        </Content>
        <Footer>
          Image Name
        </Footer>
      </Layout>
    </Modal>
  )
}

ModalSlider.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
}

export default ModalSlider
