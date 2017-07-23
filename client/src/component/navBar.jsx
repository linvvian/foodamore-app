import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'

export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
    const { activeItem } = this.state
    return(
      <Menu className='navbar_override'>
        <Menu.Item className='navbar_link'>Welcome to FoodAmore</Menu.Item>

        <Menu.Item
            as={NavLink}
            to='/'
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            className='navbar_link'
          >
            Home
        </Menu.Item>
        <Menu.Item
            as={NavLink}
            to='/login'
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.props.handleLogout}
            position='right'
            className='navbar_link'
          >
            Log Out
        </Menu.Item>

      </Menu>
    )
  }
}
