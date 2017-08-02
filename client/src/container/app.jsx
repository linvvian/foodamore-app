import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from '../component/navBar'
import LoginForm from '../component/login_form'
import LogOut from '../component/auth/logout'
import SignUpForm from './signUp_form'
import RecipeDetail from './recipeDetail_container'
import DashBoard from '../container/dashboard_container'
import RequireAuth from '../component/auth/require_auth'
import Profile from './profile_container'
import NoMatch from '../component/nomatch_component'

class App extends Component {
  render() {
    return (
      <Router>
        <div className='overlay'>
          <NavBar />
          <Switch>
            <Route exact path='/' component={RequireAuth(DashBoard)} />
            <Route exact path='/signup' component={SignUpForm} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/logout' component={LogOut} />
            <Route exact path='/profile' component={RequireAuth(Profile)} />
            <Route path='/recipes/:recipeId' component={RecipeDetail}/>
            <Route path='/lists/:listId' render={() => {
              return <DashBoard activeItem='lists' />
            }} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
