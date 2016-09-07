import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Slider from 'react-slick'

import './Gallery.scss'

import Loader from 'components/ux/Loader'

const settings = {
  dots: true,
  infinite: true,
  speed: 250,
  slidesToShow: 1,
  slidesToScroll: 1,
}


class Gallery extends Component {

  render() {
    return (
      <div className={'bit-gallery'}>
        <h1>Gallery</h1>
      </div>
    )
    const { data: { error, loading, albums } } = this.props
    if (error) {
      console.log('error', error);
      return <div>ERROR {error.message}</div>
    }
    if (loading) {
      console.log('loading');
      return <div>LOADING</div>
    }
    if (!albums.length) {
      console.log('albums', this.props.data);
      return <div>NO ALBUMS</div>
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
