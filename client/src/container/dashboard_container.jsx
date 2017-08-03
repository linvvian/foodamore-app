import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import SideBar from '../component/dashboard_sidebar'
import RecipesContainer from './recipeList_container'
import NewRecipeForm from '../component/newRecipe_form'
import ListContainer from './list_container'
import DiscoverRecipeAPI from './recipe_api'
import * as actions from '../actions'
import { sortCallback } from '../helpers'

class DashBoard extends Component {
  state = {
    activeItem: this.props.activeItem || 'your recipes'
  }

  componentDidMount = () => {
    this.props.fetchTags()
    this.props.fetchUserRecipes(this.props.user_id)
    this.props.fetchUserLists(this.props.user_id)
    console.log('dashboard will mount', this.props)
  }

  componentWillUpdate = (nextProps) => {
    if(this.props.lists.length !== nextProps.lists.length && nextProps.lists.length !== 0){
      console.log('dashboard updating', this.props.lists.length, nextProps.lists.length)
      this.props.setLists(nextProps.lists)
    }
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
      case 'your recipes':
        return <RecipesContainer />
      case 'new recipe':
        return <NewRecipeForm submitNewRecipe={this.handleRecipeSubmit}/>
      case 'lists':
        return <ListContainer />
      case 'discover':
        return <DiscoverRecipeAPI />
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

const mapStateToProps = (state) => {
  let lists = state.tags.map(tag => {
    let recipes = []
    state.recipes.forEach(recipe => recipe.tags.map(t => t.name).includes(tag.name) && recipes.push(recipe) )
    recipes = recipes.filter((thing, index, self) => self.findIndex((t) => {return t.id === thing.id && t.name === thing.name }) === index)
    return { name: tag.name, recipes: recipes }
  })
  lists = lists.filter(list => list.recipes[0] !== undefined).sort(sortCallback)

  return { user_id: state.auth.id, user: state.user, recipes: state.recipes, lists: lists }
}


export default connect(mapStateToProps, actions)(DashBoard)
