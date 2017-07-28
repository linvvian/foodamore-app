import React, { Component } from 'react'

import CanvasComponent from '../component/fireworks'

class Profile extends Component {
  state = { }

  showFireworks = () => {
    return <CanvasComponent />
  }

  makeItHappen = () => {
    this.setState({ isShow: !this.state.isShow })
  }

  render(){

    return(
      <div>
        <button onClick={this.makeItHappen}>Something Fun</button>
        <div className='fireworks'>
        {this.showFireworks()}
        </div>
      </div>
    )
  }
}

export default Profile
