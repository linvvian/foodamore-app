import React, { Component } from 'react'
import { Grid, Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  }

  handleOnChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleOnSubmit = (event, data) => {
    event.preventDefault()
  }

  render(){
    return(
      <div>
        <Grid>
          <Grid.Column>
            <Form onSubmit={this.handleOnSubmit}>
              <div className='title_header'><h1>FoodAmore</h1></div>
              <Form.Field>
                <input type='text' placeholder='email'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
                <input type='password' placeholder='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleOnChange}
                />
              </Form.Field>

              <Button type='submit'>Submit</Button>
            </Form>
            <Link to='/signup'>Or Sign Up</Link>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LoginForm
