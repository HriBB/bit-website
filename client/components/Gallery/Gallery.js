import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Slider from 'react-slick'

import './Gallery.scss'

const settings = {
  dots: true,
  infinite: true,
  speed: 250,
  slidesToShow: 1,
  slidesToScroll: 1,
}

class Gallery extends Component {

  render() {
    const { data: { errors, loading, albums } } = this.props
    if (errors) {
      console.log('errors', errors);
      return <div>ERROR {errors.message}</div>
    }
    if (loading) {
      console.log('loading');
      return <div>LOADING</div>
    }
    const images = albums[0].images
    return (
      <div className={'bit-gallery'}>
        <Slider {...settings}>
          {images.map(image =>
            <div className={'photo'} key={image.id} style={{backgroundImage: `url(${image.url})`}}></div>
          )}
        </Slider>
      </div>
    )
  }

}

const GET_ALBUMS = gql`
  query albums {
    albums {
      id
      name
      images {
        id
        url
        width
        height
        version
      }
    }
  }
`

const withData = graphql(GET_ALBUMS)
const GalleryWithData = withData(Gallery)

export default GalleryWithData
