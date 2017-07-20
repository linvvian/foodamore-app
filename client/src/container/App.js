import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import NavBar from '../component/navBar'
import LoginForm from '../component/loginForm'
import SignUpForm from '../component/signUpForm'
import DashBoard from '../container/dashboardContainer'
import Auth from '../adapter/authAdapter'

class App extends Component {
  state = {
    auth: {
      isLoggedIn: false,
      user: '',
    }
  }

  componentWillMount(){
    if (localStorage.getItem('jwt')) {
     Auth.currentUser()
     .then(user => {
       if (!user.error) {
         this.setState({
           auth: {
             isLoggedIn: true,
             user: user
           }
         })
       }
     })
    }
   }

  logout(){
    localStorage.removeItem('jwt')
    this.setState({ auth: { isLoggedIn: false, user:{}}})
  }

  logIn = (loginParams) => {
    Auth.login(loginParams)
      .then( user => {
        if (!user.error) {
          this.setState({
            auth: { isLoggedIn: true, user: user}
          }, () => {
            console.log(this.state)
          })
          localStorage.setItem('jwt', user.jwt )
        }
      })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          {/* <Route exact path='/' render={()=>{
              return this.state.auth.isLoggedIn ? <DashBoard /> : <Redirect to="/login"/>
            }} /> */}
          <Route exact path='/' component={DashBoard} />
          <Route path='/signup' component={SignUpForm} />
          <Route path='/login' render={() => {
            return <LoginForm authLogin={this.logIn} />
          }} />
        </div>
      </Router>
    )
  }
}

export default App
