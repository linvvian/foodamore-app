import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Loader } from 'semantic-ui-react'
import * as actions from '../actions'

class ProfileForm extends Component {
  state = { name: '', email: '', password: '', password_confirmation: '',}

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
          <Input type='password' placeholder='password'
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

  render(){
    return(
      <div>
        {this.load()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user_id: state.auth.id, user: state.user }
}

export default connect(mapStateToProps, actions)(ProfileForm)
