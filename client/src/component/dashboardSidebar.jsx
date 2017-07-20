import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class SideBar extends Component {
  state = { activeItem: 'recipes' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
    const { activeItem } = this.state
    return(
      <Menu vertical pointing>
        <Menu.Item name='recipes' active={activeItem === 'recipes'} onClick={this.handleItemClick} />
        <Menu.Item name='lists' active={activeItem === 'lists'} onClick={this.handleItemClick} />
        <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}

export default SideBar
