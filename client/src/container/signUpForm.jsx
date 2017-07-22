import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setUser } from '../actions'
import { Form, Button, Checkbox, Container, Input } from 'semantic-ui-react'

class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    isChecked: false,
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

    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
    .then(user => {
      console.log('here', user)
      if (user.status === 200){
        this.props.setUser(user)
        localStorage.setItem('jwt', user.jwt )
        this.props.history.push('/')
      }
    }).catch((error) => {
      console.log('sign up error', error.message)
    })
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
            <Button type='submit'>Submit</Button>
          </Form>
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: setUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(SignUpForm)
