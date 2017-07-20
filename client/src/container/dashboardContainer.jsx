import React, { Component } from 'react'
import { connect } from 'react-redux'
import SideBar from '../component/dashboardSidebar'
import RecipesContainer from './recipeListContainer'
import UserAdapter from '../adapter/userAdapter'

class DashBoard extends Component {
  componentWillMount(){
    
  }

  render(){
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

export default connect(mapStateToProps)(DashBoard)
