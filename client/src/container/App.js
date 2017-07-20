import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import NavBar from '../component/navBar'
import LoginForm from '../component/loginForm'
import SignUpForm from '../component/signUpForm'
import DashBoard from '../container/dashboardContainer'

class App extends Component {
  state = {
    auth: {
      isLoggedIn: false,
      user: {}
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path='/' render={()=>{
              return this.state.auth.isLoggedIn ? <DashBoard /> : <Redirect to="/login"/>
            }} />
          <Route path='/signup' component={SignUpForm} />
          <Route path='/login' component={LoginForm} />
        </div>
      </Router>
    )
  }
}

export default App
