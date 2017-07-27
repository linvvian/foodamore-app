import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { Menu, Icon } from 'semantic-ui-react'

class NavBar extends Component {
  state = { activeItem: 'blah', }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderLogInOut = (activeItem) => {
    return this.props.isLoggedIn ? <NavLink to='/logout'><Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} /></NavLink> : <NavLink to='/login'><Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick} /></NavLink>
  }

  render(){
    const { activeItem } = this.state
    return(
      <Menu inverted pointing secondary size='large' className='navbar_override'>

        <Menu.Item><Icon name='food' /><Icon name='heart' /> FoodAmore</Menu.Item>
        <NavLink to='/' >
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} >
            <Icon name='home' /> Home
          </Menu.Item>
        </NavLink>
        <NavLink to='/profile'>
          <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick} >
            <Icon name='user outline' /> Profile
          </Menu.Item>
        </NavLink>

        <Menu.Menu position='right'>
          <Menu.Item>Welcome! </Menu.Item>
          {this.renderLogInOut()}
        </Menu.Menu>

      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.auth.authenticated }
}

export default connect(mapStateToProps)(NavBar)
