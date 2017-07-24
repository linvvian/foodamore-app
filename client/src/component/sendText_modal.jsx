import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Popup, Header, Icon, Modal, Form, TextArea } from 'semantic-ui-react'
import PhoneNumberModal from './phoneNumber_modal'
import { sendSms } from '../adapter/twilioClient'

class SendText extends Component {
  state = { open: false, ingredientsList: '', }

  componentWillMount = () => {
    const ingredientsListed = this.props.ingredients.map(item => item.name)
    const list = ingredientsListed.join('\n')
    this.setState({
      ingredientsList: list,
    })
  }

  handleListChange = (event, data) => {
    this.setState({
      ingredientsList: data.value
    })
  }

  renderList = () => {
    return (
      <Form>
        <Form.Field>
          <TextArea autoHeight onChange={this.handleListChange} value={this.state.ingredientsList} />
        </Form.Field>
      </Form>
    )
  }

  renderButton = () => {
    return <Button className='button_basic' primary floated='right'><Popup
      trigger={<div><Icon name='shopping basket' />Send Text List</div>}
      content='Send a SMS Shopping List of the ingredients'
      hideOnScroll
    /></Button>
  }

  sendTextList = (number) => {
    sendSms(number, this.state.ingredientsList)
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render(){
    const { open } = this.state
    return(
      <Modal trigger={this.renderButton()} size='small' open={open} onOpen={this.open} onClose={this.close}>
        <Header icon='shopping basket' content='Shopping List' />
        <Modal.Content>
          {this.renderList()}
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' onClick={this.close}>
            <Icon name='remove' /> Cancel
          </Button>
          <PhoneNumberModal textList={this.sendTextList} />
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return { ingredients: state.recipe.ingredients }
}

export default connect(mapStateToProps)(SendText)
