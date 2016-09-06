import React, { Component, PropTypes } from 'react'

import Content from 'components/ux/Content'
import Title from 'components/ux/Title'

export default class About extends Component {

  render() {
    return (
      <Content className={'bit-admin-about'}>
        <Title>About</Title>
      </Content>
    )
  }

}
