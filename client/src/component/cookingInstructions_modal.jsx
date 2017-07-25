import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal, Form, Input, Grid } from 'semantic-ui-react'

class ShowInstructionsModal extends Component {
  render(){
    return(
      <Modal trigger={<Button primary className='button_basic2' floated='right'><Icon name='food' /> Cook It</Button>}>
        <Modal.Header>Steps</Modal.Header>
        <div id='steps_modal'>
        <Modal.Content>
          <Modal.Description>
            <Grid container centered={true} verticalAlign='middle' column={3}>
              <Grid.Column width={2}>
                <Button circular primary className='button_basic' icon='arrow left' floated='left'/>
              </Grid.Column>
              <Grid.Column width={12}>
                <Header><div id='steps_text'>{this.props.instructions[0].step}</div></Header>
              </Grid.Column>
              <Grid.Column width={2}>
                <Button circular primary className='button_basic' icon='arrow right' floated='right'/>
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return { instructions: state.recipe.instructions }
}

export default connect(mapStateToProps)(ShowInstructionsModal)
