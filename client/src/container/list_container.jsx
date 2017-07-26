import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Accordion, Icon, Segment } from 'semantic-ui-react'
import * as actions from '../actions'
import NewListModal from '../component/newList_modal'

class ListContainer extends Component {
  submitNewList = (list) => {
    this.props.createList({...list, ...this.props.user_id})
  }

  renderLists = () => {
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

  return { user_id: state.user.id, lists: state.lists }
}

export default connect(mapStateToProps, actions)(ListContainer)
