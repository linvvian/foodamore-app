import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'

export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
    const { activeItem } = this.state
    return(
      <Menu className='style-override-navbar' >
        <Menu.Item>Welcome to FoodAmore</Menu.Item>
        {/* <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            Home
        </Menu.Item> */}
      </Menu>
    )
  }
}
