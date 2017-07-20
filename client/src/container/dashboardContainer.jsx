import React, { Component } from 'react'
import { connect } from 'react-redux'
import SideBar from '../component/dashboardSidebar'
import RecipesContainer from './recipeListContainer'
import UserAdapter from '../adapter/userAdapter'
import * as actions from '../actions'

class DashBoard extends Component {
  componentDidMount(){
    this.props.fetchUser()
  }

  render(){
    console.log(this.props.user)
    return(
      <div className='dashboard_container'>
        <SideBar />
        <RecipesContainer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}


export default connect(mapStateToProps, actions)(DashBoard)
