import React, { Component } from 'react'
import Draggable from 'react-draggable'
import { Button, Icon, Table, Grid } from 'semantic-ui-react'

class Timer extends Component {
  state = {
    show: 'default',
    timer: 'set',
    isDisabled: false,
    isStartDisabled: true,
    time: {
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
    })
    const { minutes, seconds } = this.state.time
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
    } else {
      this.setState({
        isDisabled: false,
      })
      alert("TIME")
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

  load = () => {
    if (this.state.show === 'default'){
      return (
        <Table.Cell as='td' colSpan={2} className='cell_span_two'>
          <Button primary onClick={this.showTimer}><Icon name='time'/> Timer</Button>
        </Table.Cell>
      )
    }
    let { minutes, seconds } = this.state.time
    if (seconds < 10){
      seconds = '0' + seconds
    }
    if (minutes < 10){
      minutes = '0' + minutes
    }
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell as='td' colSpan={2} className='cell_span_two'>
            <Button primary onClick={this.showTimer}><Icon name='time'/> Hide</Button>
          </Table.Cell>
        </Table.Row>
          <Table.Row>
            <Table.Cell><Button disabled={this.state.isDisabled} primary circular icon='add' name='minutes' onClick={this.addTime}/></Table.Cell>
            <Table.Cell className='right_cell'><Button disabled={this.state.isDisabled} primary circular icon='add' name='seconds' onClick={this.addTime}/></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{minutes}</Table.Cell>
            <Table.Cell className='right_cell'>{seconds}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell><Button disabled={this.state.isDisabled} primary circular icon='minus' name='minutes' onClick={this.addTime}/></Table.Cell>
            <Table.Cell className='right_cell'><Button disabled={this.state.isDisabled} primary circular icon='minus' name='seconds' onClick={this.addTime}/></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell as='td' colSpan={2} className='cell_span_two'>
              <Button content='Start' primary disabled={this.state.isStartDisabled} onClick={this.startTimer}/>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
    )
  }

  render(){
    return(
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
    )
  }
}

export default Timer
