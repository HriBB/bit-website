import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import config from 'config'

import Button from '../components/ux/Button'
import Card, { Image, Title, Content, Actions } from '../components/ux/Card'
import Menu, { MenuItem } from '../components/ux/Menu'
import IconButton from 'components/ux/IconButton'

const image = require('./fashion.jpg')

const centered = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

storiesOf('Menu', module)
  .add('default', () => (
    <Menu target={<Button>Open menu</Button>}>
      <MenuItem>One</MenuItem>
      <MenuItem>Two</MenuItem>
      <MenuItem>Three</MenuItem>
    </Menu>
  ))
  .add('bottom left', () => (
    <div style={centered}>
      <Menu target={<Button>Menu</Button>} valign={'bottom'} align={'left'}>
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
        <MenuItem>Three</MenuItem>
      </Menu>
    </div>
  ))
  .add('bottom right', () => (
    <div style={centered}>
      <Menu target={<Button>Menu</Button>} valign={'bottom'} align={'right'}>
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
        <MenuItem>Three</MenuItem>
      </Menu>
    </div>
  ))
  .add('top left', () => (
    <div style={centered}>
      <Menu target={<Button>Menu</Button>} valign={'top'} align={'left'}>
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
        <MenuItem>Three</MenuItem>
      </Menu>
    </div>
  ))
  .add('top right', () => (
    <div style={centered}>
      <Menu target={<Button>Menu</Button>} valign={'top'} align={'right'}>
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
        <MenuItem>Three</MenuItem>
      </Menu>
    </div>
  ))

  .add('overflow hidden parent', () => {
    const divStyle = { margin: '0 auto', textAlign: 'center' }
    const cardStyle = { margin: '50px 0 0 0' }
    const imageStyle = { width: '240px' }
    return (
      <div style={divStyle}>
        <Card style={cardStyle}>
          <Image style={imageStyle} src={image} alt={''}>
            <Menu target={<IconButton name={'more_vert'}/>} align={'right'}>
              <MenuItem>One</MenuItem>
              <MenuItem>Two</MenuItem>
              <MenuItem>Three</MenuItem>
            </Menu>
            <Title>Card</Title>
          </Image>
        </Card>
      </div>
    )
  })
