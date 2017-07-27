import React, { Component } from 'react'
import Draggable from 'react-draggable'
import { Button, Icon, Table, Input } from 'semantic-ui-react'
import draw from './fireworks'

class Timer extends Component {
  state = {
    show: 'default',
    timer: 'set',
    isDisabled: false,
    isStartDisabled: true,
    isShown: 'visible',
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
    this.setState({
      isDisabled: true,
      isStartDisabled: true,
      isShown: 'hidden',
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
        isShown: 'visible'
      })
      alert("TIME")
      const ctx = this.refs.canvas.getContext('2d')
      ctx.fillRect(0,0, 100, 100)
    }
  }

  addTime = (event, { name, icon }) => {
    const number = icon === 'add' ? this.state.time[name] + 1 : (this.state.time[name] === 0 ? 0 : this.state.time[name] - 1)
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
      }
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
            <Table.Cell>{hours}</Table.Cell>
            <Table.Cell>{minutes}</Table.Cell>
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
              <Button content='Start' primary className='button_basic3' disabled={this.state.isStartDisabled} onClick={this.startTimer}/>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
    )
  }

  render(){
    return(
      <div><canvas ref="canvas" />
      <Draggable
        axis='both'
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div>
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