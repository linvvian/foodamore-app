import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal, Form, Input, Grid, Segment } from 'semantic-ui-react'

class ShowInstructionsModal extends Component {
  state = {
    stepIndex: 0,
  }

  nextStep = (event, { name }) => {
    const max = this.props.instructions.length - 1
    const step = this.state.stepIndex
    event.preventDefault()
    const number = name === 'next' ? (step === max ? 0 : step + 1) : (step === 0 ? max : step - 1)

    this.setState({
      stepIndex: number
    })
  }

  render(){
    const { stepIndex } = this.state
    return(
      <Modal trigger={<Button primary className='button_basic2' floated='right'><Icon name='food' /> Cook It</Button>}>
        <Modal.Header>Steps</Modal.Header>
        <Modal.Content>
          <div id='steps_modal'>
          <Modal.Description>
            <Header>{stepIndex + 1}</Header>
            <Grid verticalAlign='middle' column={3}>
              <Grid.Column width={2}>
                <Button circular primary id='arrow_button' name='back' className='button_basic' icon='arrow left' floated='left' onClick={this.nextStep} />
              </Grid.Column>
              <Grid.Column width={12}>
                <Segment stacked>
                <h1>{this.props.instructions[stepIndex].step}</h1>
                </Segment>
              </Grid.Column>
              <Grid.Column width={2}>
                <Button circular primary id='arrow_button' name='next' className='button_basic' icon='arrow right' floated='right' onClick={this.nextStep} />
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </div>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return { instructions: state.recipe.instructions }
}

export default connect(mapStateToProps)(ShowInstructionsModal)
