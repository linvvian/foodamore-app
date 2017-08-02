import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Loader, Card, Header, Icon } from 'semantic-ui-react'
import SearchBar from '../component/searchbar'
import RecipeCard from '../component/recipeCard'
import * as actions from '../actions'

class RecipesContainer extends Component {
  componentWillUpdate = (nextProps) => {
    if(this.props.recipes.size !== nextProps.recipes.size){
      this.props.fetchUserRecipes(this.props.user.id)
      console.log('recipe container fetching user recipes')
    }
  }

  loading = () => {
    if (this.props.recipes){
      return this.props.recipes.map(recipe => <RecipeCard key={`${recipe.id}-${recipe.name}`} {...recipe} />)
    } else {
      return <Loader active />
    }
  }

  message = () => {
    if (this.props.recipes.length === 0)
      return <Header>Empty!! Discover or Add a recipe! <Icon name='pointing left'></Icon></Header>
    return <Card.Group>{this.loading()}</Card.Group>
  }

  render(){
    return(
      <div>
        <div className='searchbar_container'>
          <SearchBar />
        </div>
        <Container className='container' fluid>
          {this.message()}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  const recipes = state.searchTerm ? state.recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(state.searchTerm) || recipe.ingredients.filter(ingredient => ingredient.name.includes(state.searchTerm))[0]
  }) : state.recipes
  return { recipes: recipes, user: state.user }
}

export default connect(mapStateToProps, actions)(RecipesContainer)
