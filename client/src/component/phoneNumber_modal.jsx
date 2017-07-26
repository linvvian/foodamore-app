import React, { Component } from 'react'
import { Button, Icon, Modal, Input, Form, Flag, Message } from 'semantic-ui-react'

class PhoneNumberModal extends Component {
  state = {
    open: false,
    isHidden: true,
    isDisabled: true,
    first: '',
    second: '',
    third: '',
  }

  open = () => this.setState({ open: true })
  closeAndSend = () => {
    this.setState({ open: false })
    const number = `+1${this.state.first}${this.state.second}${this.state.third}`
    // this.props.textList(number)
  }

  handleOnChange = (event, { name, value }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { first, second, third } = this.state
      if (!first) {
        this.setState({ isHidden: false })
      } else {
        this.setState({ isHidden: true })
      }
      if (!first || !second || !third) {
        this.setState({ isDisabled: true, })
      } else if (first && second && third){
        this.setState({ isDisabled: false, })
      }
    })
  }

  render() {
    const { open } = this.state

    return (
      <Modal
        dimmer={false}
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={<Button basic color='green' ><Icon name='checkmark' /> Ok</Button>}
      >
        <Modal.Header>Number</Modal.Header>
        <Modal.Content>
          <Message warning content='All Required' hidden={this.state.isHidden}/>
          <Form>
            <Form.Group inline>
              <Form.Field>
                <label>Number <Flag name='us' /> +1</label>
                <Input placeholder='(xxx)' value={this.state.first} name='first' onChange={this.handleOnChange}/>
              </Form.Field>
              <Form.Field>
                <Input placeholder='xxx' value={this.state.second} name='second' onChange={this.handleOnChange}/>
              </Form.Field>
              <Form.Field>
                <Input placeholder='xxxx' value={this.state.third} name='third' onChange={this.handleOnChange}/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary className='button_basic' icon='check' content='Send' disabled={this.state.isDisabled} onClick={this.closeAndSend} />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default PhoneNumberModal
