import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import SideBar from '../component/dashboard_sidebar'
import RecipesContainer from './recipeList_container'
import NewRecipeForm from '../component/newRecipe_form'
import ListContainer from './list_container'
import * as actions from '../actions'

class DashBoard extends Component {
  state = {
    activeItem: 'all recipes'
  }

  componentDidMount = () => {
    this.props.setUser(this.props.user_id)
    this.props.fetchTags()
    this.props.fetchUserRecipes(this.props.user_id)
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
      case 'lists':
        return <ListContainer />
      default:
    }
  }

  render(){
    return(
      <div className='dashboard_component'>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={3}>
              <SideBar activeItem={this.activeItem} />
            </Grid.Column>
            <Grid.Column width={12}>
              {this.loadItem()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const sortCallback = (a,b) => {
  var nameA = a.name.toUpperCase()
  var nameB = b.name.toUpperCase()
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }
  return 0
}

const mapStateToProps = (state) => {
  let lists = state.tags.map(tag => {return { name: tag.name, recipes: state.recipes.filter(recipe => recipe.tags.map(t => t.name).includes(tag.name)) }})
  lists = lists.filter(list => list.recipes[0] !== undefined).sort(sortCallback)

  return { user_id: state.auth.id, user: state.user, recipes: state.recipes, lists: lists }
}


export default connect(mapStateToProps, actions)(DashBoard)
