import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Wrap extends Component {

  constructor(props) {
    super(props)
    this.state = { number: 1 }
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true
  }

  onClick = () => {
    console.log('click');
    this.setState({ number: this.state.number + 1 })
  }

  render() {
    console.log('render wrap');
    return (
      <div style={{border: '1px solid red'}}>
        <h2 onClick={this.onClick}>{`AAA ${this.state.number}`}</h2>
        {this.props.children}
      </div>
    )
  }

}
