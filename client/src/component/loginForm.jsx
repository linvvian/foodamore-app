import React, { Component } from 'react'
import { Container, Grid, Button, Form, Divider } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'

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

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.authLogin(this.state)
    this.props.history.push('/')
  }

  render(){
    return(
      <Container className='form_container'>
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

              <Button type='submit' fluid>Submit</Button>
            </Form>
            <Divider horizontal>Or</Divider>
            <Button as={Link} to='/signup' fluid>Or Sign Up</Button>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default withRouter(LoginForm)
