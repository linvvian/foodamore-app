import React, { Component } from 'react'
import { Form, Button, Checkbox, Grid } from 'semantic-ui-react'

export default class SignUpForm extends Component {
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
    if (!this.state.isChecked) {
      alert('Need to agree')
    }
  }

  render(){
    return(
      <div>
        <Grid>
          <Form onSubmit={this.handleOnSubmit}>
            <Grid.Column column={2}>
              <Form.Input type='text' placeholder='name' label='Name'
                name='name'
                value={this.state.name}
                onChange={this.handleOnChange}
                required={true}
              />
              <Form.Input type='text' placeholder='email' label='Email'
                name='email'
                value={this.state.email}
                onChange={this.handleOnChange}
                required={true}
              />
              <Form.Group>
                <Form.Input type='password' placeholder='password' label='Password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleOnChange}
                  required={true}
                />
                <Form.Input type='password' placeholder='password confirmation' label='Password Confirmation'
                  name='password_confirmation'
                  value={this.state.password_confirmation}
                  onChange={this.handleOnChange}
                  required={true}
                />
              </Form.Group>
              <Form.Field
                control={Checkbox}
                name='isChecked'
                label={{ children: 'I agree to the Terms and Conditions' }}
                onChange={this.handleOnChange}
              />
              <Button type='submit'>Submit</Button>
            </Grid.Column>
          </Form>
        </Grid>
      </div>
    )
  }
}
