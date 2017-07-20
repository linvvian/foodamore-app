import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import NavBar from '../component/navBar'
import LoginForm from '../component/loginForm'
import SignUpForm from '../component/signUpForm'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path='/' component={LoginForm} />
          <Route path='/signup' component={SignUpForm} />
        </div>
      </Router>
    )
  }
}

export default App
