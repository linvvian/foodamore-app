import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
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
          <Route path='/lists/:listId' render={() => {
            return <DashBoard activeItem='lists' />
          }} />
        </div>
      </Router>
    )
  }
}

export default App
