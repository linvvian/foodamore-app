import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class SideBar extends Component {
  state = { activeItem: 'all recipes' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.activeItem(name)
  }

  render(){
    const { activeItem } = this.state
    return(
      <Menu vertical pointing floated='left'>
        <Menu.Item name='all recipes' active={activeItem === 'all recipes'} onClick={this.handleItemClick} />
        <Menu.Item name='lists' active={activeItem === 'lists'} onClick={this.handleItemClick} />
        <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}

export default SideBar
