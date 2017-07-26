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
        const recipes = list.recipes.map(recipe => <Link to={`/recipes/${recipe.id}`}><p>{recipe.name}</p></Link>)
        return(
          <Accordion>
            <Accordion.Title>
              <Icon name='dropdown' />
              {list.name}
            </Accordion.Title>
            <Accordion.Content>
              {recipes}
            </Accordion.Content>
          </Accordion>
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
        <Segment>
          {this.renderLists()}
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  let combined = state.usersLists.map(list => { return { name: list.name, recipes: state.recipes.filter(recipe => list.recipes.includes(recipe.id)) }} )
  return { user_id: state.user.id, lists: state.lists.concat(combined) }
}

export default connect(mapStateToProps, actions)(ListContainer)
