import React, { Component } from 'react'
import { Menu, Button, Sidebar, Icon } from 'semantic-ui-react'
import ProfileForm from '../component/profile_form'
import CanvasComponent from '../component/fireworks'

class Profile extends Component {
  state = { visible: false, activeItem: 'profile' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  showFireworks = () => {
    return <div className='fireworks'><CanvasComponent /></div>
  }

  loadWhich = () => {
    switch (this.state.activeItem) {
      case 'profile':
        return <ProfileForm />
      case 'special':
        return this.showFireworks()
      default:

    }
  }

  render(){
    const { visible } = this.state
    return(
      <div>
        <Button primary className='button_basic' onClick={this.toggleVisibility} icon='ellipsis vertical' />
        <Sidebar.Pushable as='div' className='profile_container'>
          <Sidebar as={Menu} className='profile_menu' animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='profile' onClick={this.handleItemClick}>
              <Icon name='user' />
              Profile
            </Menu.Item>
            <Menu.Item name='special' onClick={this.handleItemClick}>
              <Icon name='gift' />
              Special
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher as='div' className='profile_content_container'>
            {this.loadWhich()}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default Profile
