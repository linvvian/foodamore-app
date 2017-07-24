import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Logout extends Component {
  componentWillMount () {
    this.props.signoutUser()
  }

  render () {
    return <div>Sorry to see you go...<Redirect to='/login' /></div>
  }
}

export default connect(null, actions)(Logout)
