import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { Menu, Icon } from 'semantic-ui-react'

class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderLogInOut = (activeItem) => {
    <Menu.Item as={NavLink} to='/login' name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
  }

  render(){
    const { activeItem } = this.state
    return(
      <Menu pointing secondary className='navbar_override'>

        <Menu.Item><Icon name='food' /><Icon name='heart' /> FoodAmore</Menu.Item>
        <Menu.Item as={NavLink} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} ><Icon name='home' /> Home</Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>Welcome! </Menu.Item>
          <Menu.Item as={NavLink} to='/logout' name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
        </Menu.Menu>

      </Menu>
    )
  }
}

export default NavBar
