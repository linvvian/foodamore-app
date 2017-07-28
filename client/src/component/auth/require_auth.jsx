import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../actions'

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      this.props.fetchMessage()
      if (!this.props.authenticated) {
        this.context.router.history.push('/login')
      } else if (localStorage.getItem('jwt')) {
        this.props.setUser(localStorage.getItem('id'))
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.history.push('/login')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, error: state.auth.error }
  }

  return connect(mapStateToProps, actions)(Authentication)
}
