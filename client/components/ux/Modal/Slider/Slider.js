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

const Slider = props => {
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
          <Slick {...sliderSettings}>
            {children}
          </Slick>
        </Content>
        <Footer dark centered>
          Image Name
        </Footer>
      </Layout>
    </Modal>
  )
}

Slider.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
}

export default Slider
