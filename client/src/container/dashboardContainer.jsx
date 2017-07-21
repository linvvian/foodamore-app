import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import SideBar from '../component/dashboardSidebar'
import RecipesContainer from './recipeListContainer'
import NewRecipeForm from '../component/newRecipeForm'
import UserAdapter from '../adapter/userAdapter'
import * as actions from '../actions'

class DashBoard extends Component {
  state = {
    activeItem: 'all recipes'
  }

  componentDidMount(){
    this.props.fetchUser()
  }

  activeItem = (name) => {
    this.setState({ activeItem: name })
  }

  loadItem = () => {
    switch (this.state.activeItem) {
      case 'all recipes':
        return <RecipesContainer />
      case 'new recipe':
        return <NewRecipeForm />
      default:

    }
  }

  render(){
    return(
      <div className='dashboard_container'>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={3}>
              <SideBar activeItem={this.activeItem}/>
            </Grid.Column>
            <Grid.Column width={13}>
              {this.loadItem()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, lists: state.lists, recipes: state.recipes }
}


export default connect(mapStateToProps, actions)(DashBoard)
