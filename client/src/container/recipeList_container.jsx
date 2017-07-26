import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Loader, Card } from 'semantic-ui-react'
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
      return this.props.recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)
    } else {
      return <Loader active />
    }
  }

  render(){
    return(
      <div>
        <div className='searchbar_container'>
          <SearchBar />
        </div>
        <Container className='container' fluid>
          <Card.Group>
            {this.loading()}
          </Card.Group>
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
