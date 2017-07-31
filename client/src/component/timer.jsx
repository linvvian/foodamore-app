import React, { Component } from 'react'
import Draggable from 'react-draggable'
import Sound from 'react-sound'
import { Button, Icon, Table, Input } from 'semantic-ui-react'

class Timer extends Component {
  state = {
    show: 'default',
    isDisabled: false,
    isStartDisabled: true,
    isShown: 'visible',
    isPlaying: 'PAUSED',
    isPaused: false,
    timeUp: false,
    playPosition: 9455,
    time: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  }

  showTimer = () => {
    const value = this.state.show === 'default' ? 'timer' : 'default'
    this.setState({
      show: value,
    })
  }

  startTimer = () => {
    if (this.state.isPaused) return
    this.setState({
      isDisabled: true,
      isStartDisabled: true,
      isShown: 'hidden',
      timeUp: false,
    })
    const { minutes, seconds, hours } = this.state.time
    if (seconds !== 0) {
      this.setState({
        time: { ...this.state.time, seconds: seconds - 1 }
      })
      setTimeout(this.startTimer, 1000)
    } else if (minutes > 0) {
      this.setState({
        time: { ...this.state.time, seconds: 59, minutes: minutes - 1 }
      })
      setTimeout(this.startTimer, 1000)
    } else if (hours > 0) {
      this.setState({
        time: { ...this.state.time, seconds: 59, minutes: 59, hours: hours - 1 }
      })
      setTimeout(this.startTimer, 1000)
    } else {
      this.setState({
        isDisabled: false,
        isShown: 'visible',
        timeUp: true,
        isPlaying: 'PLAYING',
      })
      // alert("TIME")
    }
  }

  addTime = (event, { name, icon }) => {
    const number = icon === 'add' ? (this.state.time[name] === 59 ? 0 : this.state.time[name] + 1) : (this.state.time[name] === 0 ? 59 : this.state.time[name] - 1)
    this.setState({
      isStartDisabled: false,
      time: {
        ...this.state.time,
        [name]: number,
      }
    })
  }

  handleInputChange = (event, { name, value }) => {
    this.setState({
      time: {
        ...this.state.time,
        [name]: value,
      },
    })
  }

  onFocus = (event) => {
    const { name } = event.target
    event.target.value = ''
  }

  onBlur = (event) => {
    const { name, value } = event.target
    const newValue = value ? value : event.target.value = 0
    this.setState({
      time: {
        ...this.state.time,
        [name]: newValue,
      }
    })
  }

  resetTimer = () => {
    this.setState({
      isPlaying: 'PAUSED',
      timeUp: false,
      playPosition: 9455,
    })
  }

  onPlaying = ({ position, duration}) => {
    this.setState({ playPosition: position })
  }

  pauseTimer = () => {
    this.setState({ isPaused: !this.state.isPaused }, () => {
      if (this.state.isPaused) {
        this.setState({ isDisabled: false })
      }
      this.startTimer()
    })
  }

  pauseUNPAUSE = () => {
    if (this.state.isPaused)
      return <Button primary className='button_basic3' onClick={this.pauseTimer}>Start</Button>
    return <Button primary className='button_basic3' onClick={this.pauseTimer}>Pause</Button>
  }

  whichButton = () => {
    if(this.state.timeUp) return <Button primary onClick={this.resetTimer}>Reset</Button>
    if(this.state.isShown === 'hidden') return this.pauseUNPAUSE()
    return <Button content='Start' primary className='button_basic3' disabled={this.state.isStartDisabled} onClick={this.startTimer}/>
  }

  load = () => {
    if (this.state.show === 'default'){
      return (
        <Table.Cell as='td' colSpan={3} className='cell_span_two'>
          <Button primary className='button_basic3' onClick={this.showTimer}><Icon name='time'/> Timer</Button>
        </Table.Cell>
      )
    }
    let { minutes, seconds, hours } = this.state.time
    if (seconds < 10){
      seconds = '0' + seconds
    }
    if (minutes < 10){
      minutes = '0' + minutes
    }
    if (hours < 10){
      hours = '0' + hours
    }
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell as='td' colSpan={3} className='cell_span_two'>
            <Button primary className='button_basic3' onClick={this.showTimer}><Icon name='time'/> Hide</Button>
          </Table.Cell>
        </Table.Row>
          <Table.Row>
            <Table.Cell><Button disabled={this.state.isDisabled} primary className='button_basic3' circular icon='add' name='hours' onClick={this.addTime}/></Table.Cell>
            <Table.Cell><Button disabled={this.state.isDisabled} primary className='button_basic3' circular icon='add' name='minutes' onClick={this.addTime}/></Table.Cell>
            <Table.Cell><Button disabled={this.state.isDisabled} primary className='button_basic3' circular icon='add' name='seconds' onClick={this.addTime}/></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{hours} {'  :'}</Table.Cell>
            <Table.Cell>{minutes} {'  :'}</Table.Cell>
            <Table.Cell>{seconds}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell><Button disabled={this.state.isDisabled} primary className='button_basic3' circular icon='minus' name='hours' onClick={this.addTime}/></Table.Cell>
            <Table.Cell><Button disabled={this.state.isDisabled} primary className='button_basic3' circular icon='minus' name='minutes' onClick={this.addTime}/></Table.Cell>
            <Table.Cell><Button disabled={this.state.isDisabled} primary className='button_basic3' circular icon='minus' name='seconds' onClick={this.addTime}/></Table.Cell>
          </Table.Row>
          <Table.Row className='timer_input_row'>
            <Table.Cell id='timer_input'>
              <Input inverted transparent onFocus={this.onFocus} onBlur={this.onBlur} name='hours' style={{ visibility: this.state.isShown }} className='timer_input' value={this.state.time.hours} onChange={this.handleInputChange} />
            </Table.Cell>
            <Table.Cell id='timer_input'>
              <Input inverted transparent onFocus={this.onFocus} onBlur={this.onBlur} name='minutes' style={{ visibility: this.state.isShown }} className='timer_input' value={this.state.time.minutes} onChange={this.handleInputChange} />
            </Table.Cell>
            <Table.Cell id='timer_input'>
              <Input inverted transparent onFocus={this.onFocus} onBlur={this.onBlur} name='seconds' style={{ visibility: this.state.isShown }} className='timer_input' value={this.state.time.seconds} onChange={this.handleInputChange} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell as='td' colSpan={3} className='cell_span_two'>
              {this.whichButton()}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
    )
  }

  render(){
    const audiosrc = 'https://archive.org/download/StarWarsTheImperialMarchDarthVadersTheme/Star%20Wars-%20The%20Imperial%20March%20(Darth%20Vader\'s%20Theme).mp3'

    return(
      <div className='timer_div'>
      <Draggable
        axis='both'
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div>
          <Sound url={audiosrc} playStatus={this.state.isPlaying} position={this.state.playPosition} onPlaying={this.onPlaying}/>
          <Table basic inverted id='timer_table' className="handle">
            {this.load()}
          </Table>
        </div>
      </Draggable>
      </div>
    )
  }
}

export default Timer
