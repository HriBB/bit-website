import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import { NavLink, Route, Switch } rom 'react-router-dom'

//import paper from 'paper'
//import invariant from 'fbjs/lib/invariant'
//import emptyObject from 'fbjs/lib/emptyObject'
//import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler'

import Wrap from './Wrap'

const App = (props) => {
  return (
    <div className={'bit-app'}>
      <h1>App</h1>
      <Wrap>
        <Paper/>
      </Wrap>
    </div>
  )
}


class Paper extends Component {

  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    console.log('render canvas');
    return (
      <div>
        <h2>Canvas</h2>
        <canvas width={800} height={600} ref={ref => this._canvasRef = ref}/>
      </div>
    )
  }

}

/*
const PaperRenderer = ReactFiberReconciler({
  appendChild(parentInstance, child) {
    if (child.parentNode === parentInstance) {
      child.eject();
    }

    child.inject(parentInstance);
  },

  appendInitialChild(parentInstance, child) {
    if (typeof child === 'string') {
      // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
      invariant(false, 'Text children should already be flattened.');
      return;
    }

    child.inject(parentInstance);
  },

  commitTextUpdate(textInstance, oldText, newText) {
    // Noop
  },

  commitMount(instance, type, newProps) {
    // Noop
  },

  commitUpdate(instance, type, oldProps, newProps) {
    //instance._applyProps(instance, newProps, oldProps);
  },

  createInstance(type, props, internalInstanceHandle) {
    let instance;

    switch (type) {
      case 'Layer':
        instance = new paper.Layer()
        break
    }

    invariant(instance, 'PaperReact does not support the type "%s"', type);

    //instance._applyProps(instance, props);

    return instance;
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return text;
  },

  finalizeInitialChildren(domElement, type, props) {
    return false;
  },

  insertBefore(parentInstance, child, beforeChild) {
    invariant(
      child !== beforeChild,
      'PaperReact: Can not insert node before itself'
    );

    child.injectBefore(beforeChild);
  },

  prepareForCommit() {
    // Noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    return true;
  },

  removeChild(parentInstance, child) {
    destroyEventListeners(child);

    child.eject();
  },

  resetAfterCommit() {
    // Noop
  },

  resetTextContent(domElement) {
    // Noop
  },

  getRootHostContext() {
    return emptyObject;
  },

  getChildHostContext() {
    return emptyObject;
  },

  scheduleAnimationCallback: window.requestAnimationFrame,

  scheduleDeferredCallback: window.requestIdleCallback,

  shouldSetTextContent(props) {
    return (
      typeof props.children === 'string' ||
      typeof props.children === 'number'
    );
  },

  useSyncScheduling: true,
});
*/

export default App
