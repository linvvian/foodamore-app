import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import { fetchRecipe } from '../actions'

class RecipeDetail extends Component {
  componentWillMount = () => {
    this.props.fetchRecipe(this.props.match.params.recipeId)
  }

  render(){
    return(
      <div>
        <Container>
          
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state.recipe }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipe: (id) => {
      dispatch(fetchRecipe(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail)
