import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import PropTypes from 'prop-types'

import { Form, Button, Checkbox, Container, Input } from 'semantic-ui-react'

class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    isChecked: false,
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillUpdate(nextProps) {
    console.log("updating signin", nextProps, this.context)
    if (nextProps.authenticated) {
      this.context.router.history.push('/')
    }
  }

  handleOnChange = (event, data) => {
    const { name, value } = data
    let newValue = name === 'isChecked' ? !value : value
    this.setState({
      [name]: newValue,
    })
  }

  handleOnSubmit = (event, data) => {
    event.preventDefault()
    if (!this.state.isChecked){
      alert('Need to agree')
    }
    this.props.signupUser(this.state)
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    } else if (this.state.password !== this.state.password_confirmation) {
      <div className='alert alert-danger'>
        <strong>Passwords must match</strong>
      </div>
    }
  }

  render(){
    return(
      <div>
        <Container className='form_container'>
          <h1>Create An Account</h1>
          <Form onSubmit={this.handleOnSubmit}>
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
            <Form.Group widths='equal'>
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
            </Form.Group>
            <Form.Field
              control={Checkbox}
              name='isChecked'
              onChange={this.handleOnChange}
              label={{ children: 'I agree to the Terms and Conditions' }}
            />
            {this.renderAlert()}
            <Button primary className='button_basic' type='submit'>Submit</Button>
          </Form>
        </Container>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { authenticated: state.auth.authenticated, errorMessage: state.auth.error, user_id: state.auth.id }
}

export default connect(mapStateToProps, actions)(SignUpForm)
