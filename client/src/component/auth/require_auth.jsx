import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//This is a higher order component to authorize a user
export default function(ComposedComponent) {
  //use the context property to access the router history
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.history.push('/login')
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
    return { authenticated: state.auth.authenticated }
  }

  return connect(mapStateToProps)(Authentication)
}
