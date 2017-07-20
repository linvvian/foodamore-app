import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'

export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
    const { activeItem } = this.state
    return(
      <Menu>
        <Menu.Item>Welcome to FoodAmore</Menu.Item>

        <Menu.Item
            as={NavLink}
            to='/'
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            Home
        </Menu.Item>
        <Menu.Item
            as={NavLink}
            to='/logout'
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
            position='right'
          >
            Log Out
        </Menu.Item>

      </Menu>
    )
  }
}
