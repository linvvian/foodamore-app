import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Loader, Card } from 'semantic-ui-react'

import RecipeCard from '../component/recipeCard'
import * as actions from '../actions'

class RecipesContainer extends Component {
  componentWillMount = () => {
    this.props.fetchUserRecipes(this.props.user.id)
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
      <Container className='recipes_container' fluid>
        <Card.Group>
          {this.loading()}
        </Card.Group>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { recipes: state.recipes, user: state.user }
}

export default connect(mapStateToProps, actions)(RecipesContainer)
