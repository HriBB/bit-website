import React, { PropTypes } from 'react'
import classnames from 'classnames'

import './Image.scss'

const Image = props => {
  const { className, src, alt, ...rest } = props
  const imageClass = classnames('bit-card-image', className)
  return (
    <img className={imageClass} src={src} alt={alt} {...rest}/>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default Image
