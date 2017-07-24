import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Grid, Button, Form, Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import * as actions from '../actions'

class LoginForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    email: '',
    password: '',
  }

  componentWillUpdate(nextProps) {
    console.log("updating signin", nextProps, this.context)
    if (nextProps.authenticated) {
      console.log('should redirect')
      this.context.router.history.push('/')
    }
  }

  handleOnChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.signinUser(this.state)
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
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
              {this.renderAlert()}
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

function mapStateToProps (state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated, user_id: state.auth.id }
}

export default connect(mapStateToProps, actions)(LoginForm)
