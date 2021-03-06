import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Accordion, Icon, Segment, Loader } from 'semantic-ui-react'
import * as actions from '../actions'
import NewListModal from '../component/newList_modal'

class ListContainer extends Component {
  submitNewList = (list) => {
    const newList = {
      list: list,
      user_id: this.props.user_id,
    }
    this.props.createList(newList)
  }

  renderLists = () => {
    if (this.props.lists){
      const lists = this.props.lists.map(list => {
        const recipes = list.recipes.map(recipe => <Link to={`/recipes/${recipe.id}`}><h3>{recipe.name}</h3></Link>)
        return(
          <Segment>
          <Accordion>
            <Accordion.Title>
              <h2 id='list_name'><Icon name='dropdown' />
              {list.name}</h2>
            </Accordion.Title>
            <Accordion.Content>
              {recipes}
            </Accordion.Content>
          </Accordion>
          </Segment>
        )
      })
      return lists
    } else {
      return <Loader />
    }
  }

  render(){
    return(
      <Container className='container' fluid>
        <NewListModal newList={this.submitNewList} />
        {this.renderLists()}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  let userLists = state.usersLists.map(list => { return { name: list.name, recipes: state.recipes.filter(recipe => list.recipes.includes(recipe.id)) }} )
  let newSet = new Set(state.lists.concat(userLists))
  let combined = [...newSet]
  return { user_id: state.user.id, lists: combined }
}

export default connect(mapStateToProps, actions)(ListContainer)
