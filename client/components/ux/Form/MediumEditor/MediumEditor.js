import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Editor, { createEmptyValue } from 'react-rte'

import 'medium-draft/lib/index.css'
import './MediumEditor.scss'

export default class MediumEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { value: createEmptyValue() }
    this.onChange = (value) => this.setState({ value })
  }

  render() {
    return (
      <Editor
        ref={ref => this.editor = ref}
        editorState={this.state.value}
        onChange={this.onChange}
      />
    )
  }
}
