import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Editor, { createEmptyValue } from 'react-rte'

import './ReactRTE.scss'

export default class ReactRTE extends Component {

  constructor(props) {
    super(props);
    this.state = { value: createEmptyValue() }
  }

  onChange = (value) => {
    this.setState({ value })
    //console.log(value.toString('html'));
  }

  render() {
    return (
      <Editor
        className={'ReactRTE'}
        toolbarClassName={'ReactRTE-toolbar'}
        editorClassName={'ReactRTE-content'}
        placeholder={'About BIT ...'}
        value={this.state.value}
        onChange={this.onChange}
      />
    )
  }
}
