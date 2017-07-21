import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Loader } from 'semantic-ui-react'

import RecipeCard from '../component/recipeCard'

class RecipesContainer extends Component {
  loading = () => {
    if (this.props.recipes){
      return this.props.recipes.map(recipe => <RecipeCard {...recipe} />)
    } else {
      return <Loader active />
    }
  }

  render(){
    return(
      <Container className='recipes_container' fluid>
        {this.loading()}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { recipes: state.recipes }
}

export default connect(mapStateToProps)(RecipesContainer)
