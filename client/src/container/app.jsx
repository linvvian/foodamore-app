import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setUser } from '../actions'

import NavBar from '../component/navBar'
import LoginForm from '../component/loginForm'
import SignUpForm from './signUpForm'
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
         this.props.setUser(user)
         console.log('here', user)
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
          this.props.setUser(user)
          this.setState({
            auth: { isLoggedIn: true, user: user}
          })
          localStorage.setItem('jwt', user.jwt )
        }
      }).catch(error => console.log(error.message))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar handleLogout={this.logout}/>
          <Route exact path='/' render={()=>{
              return this.state.auth.isLoggedIn ? <DashBoard /> : <Redirect to="/login"/>
            }} />
          {/* <Route exact path='/' component={DashBoard} /> */}
          <Route path='/signup' component={SignUpForm} />
          <Route path='/login' render={() => {
            return <LoginForm authLogin={this.logIn} />
          }} />
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: setUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(App)
