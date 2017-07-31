import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Loader, Message } from 'semantic-ui-react'
import * as actions from '../actions'

class ProfileForm extends Component {
  state = { name: '', email: '', old_password: '', password: '', password_confirmation: '', message: '', showAlert: 'hidden' }

  componentWillMount = () => {
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email,
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      name: nextProps.user.name,
      email: nextProps.user.email,
    })
  }

  handleOnChange = (event, data) => {
    const { name, value } = data
    this.setState({
      [name]: value,
    })
  }

  handleOnSubmit = () => {
    if (this.validate()) return false
    this.props.updateUser({...this.state, id: this.props.user_id})
    this.setState({ old_password: '', password: '', password_confirmation: '', message: '', showAlert: 'hidden' })
  }

  load = () => {
    if (!this.props.user) return <Loader />
    return(
      <Form onSubmit={this.handleOnSubmit} className='update_form'>
        <h1>Update Your Profile</h1>
        <Form.Field>
          <Input type='text' placeholder='name'
          name='name'
          value={this.state.name}
          onChange={this.handleOnChange}
          required={true}
          />
        </Form.Field>
        <Form.Field>
          <Input type='text' placeholder='email'
          name='email'
          value={this.state.email}
          onChange={this.handleOnChange}
          required={true}
          />
        </Form.Field>
        <Form.Field>
          <Input type='password' placeholder='old password'
          name='old_password'
          value={this.state.old_password}
          onChange={this.handleOnChange}
          required={true}
          />
        </Form.Field>
        <Form.Field>
          <Input type='password' placeholder='new password'
          name='password'
          value={this.state.password}
          onChange={this.handleOnChange}
          required={true}
          />
        </Form.Field>
        <Form.Field>
          <Input type='password' placeholder='password confirmation'
          name='password_confirmation'
          value={this.state.password_confirmation}
          onChange={this.handleOnChange}
          required={true}
          />
        </Form.Field>
        <Button primary className='button_basic' type='submit'>Submit</Button>
      </Form>
    )
  }

  validate = () => {
    if (this.state.password !== this.state.password_confirmation) {
      this.setState({ message: 'Passwords need to be the same', showAlert: false })
      return true
    } else {
      this.setState({ message: undefined, showAlert: true })
      return false
    }
  }

  render(){
    return(
      <div>
        {this.load()}
        <Message warning hidden={this.state.showAlert}><Message.Header>{this.state.message}</Message.Header></Message>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user_id: state.auth.id, user: state.user }
}

export default connect(mapStateToProps, actions)(ProfileForm)
