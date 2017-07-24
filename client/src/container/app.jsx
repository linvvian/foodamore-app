import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setUser } from '../actions'

import NavBar from '../component/navbar'
import LoginForm from '../component/login_form'
import LogOut from '../component/auth/logout'
import SignUpForm from './signUp_form'
import RecipeDetail from './recipeDetail_container'
import DashBoard from '../container/dashboard_container'
import RequireAuth from '../component/auth/require_auth'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path='/' component={RequireAuth(DashBoard)} />
          <Route path='/signup' component={SignUpForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/logout' component={LogOut} />
          <Route path='/recipes/:recipeId' component={RecipeDetail}/>
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(App)
