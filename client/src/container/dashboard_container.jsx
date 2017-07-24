import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import SideBar from '../component/dashboard_sidebar'
import RecipesContainer from './recipeList_container'
import NewRecipeForm from '../component/newRecipe_form'
import * as actions from '../actions'

class DashBoard extends Component {
  state = {
    activeItem: 'all recipes'
  }

  componentDidMount = () => {
    this.props.setUser(this.props.user_id)
    this.props.fetchTags()
    this.props.fetchUser(this.props.user_id)
    console.log('dashboard will mount', this.props)
  }

  activeItem = (name) => {
    this.setState({ activeItem: name })
  }

  handleRecipeSubmit = (recipe) => {
    const obj = {
      recipe: recipe,
      user_id: this.props.user.id,
    }
    this.props.createRecipe(obj)
  }

  loadItem = () => {
    switch (this.state.activeItem) {
      case 'all recipes':
        return <RecipesContainer />
      case 'new recipe':
        return <NewRecipeForm submitNewRecipe={this.handleRecipeSubmit}/>
      default:
    }
  }

  render(){
    return(
      <div className='dashboard_component'>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={2}>
              <SideBar activeItem={this.activeItem} />
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
  return { user_id: state.auth.id, user: state.user, lists: state.user.lists, recipes: state.user.recipes }
}


export default connect(mapStateToProps, actions)(DashBoard)
