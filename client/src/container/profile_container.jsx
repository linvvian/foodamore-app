import React, { Component } from 'react'
import Sound from 'react-sound'

class Profile extends Component {
  state = { isPlaying: 'PAUSED' }

  playAudio = () => {
    const value = this.state.isPlaying === 'PLAYING' ? 'PAUSED' : 'PLAYING'
    this.setState({
      isPlaying: value,
    })
  }

  render(){
    const audiosrc = '../assets/dog-howling-yapping-daniel_simon.mp3'
    return(
      <div>
        {/* <Sound url={audiosrc} playStatus={this.state.isPlaying} />
        <button onClick={this.playAudio}>Play</button> */}
      </div>
    )
  }
}

export default Profile
