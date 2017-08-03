import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class SideBar extends Component {
  state = { activeItem: this.props.currentItem }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.activeItem(name)
  }

  render(){
    const { activeItem } = this.state
    return(
      <Menu vertical pointing>
        <Menu.Item name='your recipes' active={activeItem === 'your recipes'} onClick={this.handleItemClick} />
        <Menu.Item name='discover new recipe' active={activeItem === 'discover new recipe'} onClick={this.handleItemClick} />
        <Menu.Item name='your lists' active={activeItem === 'your lists'} onClick={this.handleItemClick} />
        <Menu.Item name='add a new recipe' active={activeItem === 'add a new recipe'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}

export default SideBar
