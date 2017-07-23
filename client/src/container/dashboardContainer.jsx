import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import SideBar from '../component/dashboardSidebar'
import RecipesContainer from './recipeListContainer'
import NewRecipeForm from '../component/newRecipeForm'
import * as actions from '../actions'

class DashBoard extends Component {
  state = {
    activeItem: 'all recipes'
  }

  componentDidMount(){
    this.props.fetchTags()
    this.props.fetchUser(this.props.user.id)
  }

  activeItem = (name) => {
    this.setState({ activeItem: name })
  }

  handleRecipeSubmit = (recipe) => {
    const obj = {
      recipe: recipe,
      user_id: this.props.user.id,
    }
    fetch('http://localhost:3000/api/v1/recipes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(obj)
    }).then(res => res.json())
    .catch(error => console.log(error.message))
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
        <h2>Welcome {this.props.user.name}</h2>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={3}>
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
  return { user: state.user, lists: state.lists, recipes: state.recipes }
}


export default connect(mapStateToProps, actions)(DashBoard)
