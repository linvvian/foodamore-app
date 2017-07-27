import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button, Form, Icon, Input, Checkbox } from 'semantic-ui-react'

class NewListModal extends Component {
  state = {
    name: '',
    recipesToAdd: [],
  }

  onListSubmit = (event, data) => {
    this.props.newList(this.state)
  }

  handleOnChange = (event, { name, value }) => {
    this.setState({
      [name]: value,
    })
  }

  checkedBox = (event, { label, value, checked }) => {
    const recipeToAdd = { name: label, id: value }
    checked ? this.setState({ recipesToAdd: this.state.recipesToAdd.concat(recipeToAdd) }) : this.setState({ recipesToAdd: this.state.recipesToAdd.filter(recipe => recipe.id !== recipeToAdd.id)})
  }

  render(){
    const recipes = this.props.recipes.map(recipe => <Checkbox label={recipe.name} value={recipe.id} onChange={this.checkedBox} className='checkbox_override'/>)
    return(
      <Modal trigger={<Button primary className='button_basic' id='add_list_button' icon='add' />} closeIcon='close'>
        <Header icon='edit' content='New List' />
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input name='name' placeholder='list name' value={this.state.name} onChange={this.handleOnChange} />
            </Form.Field>
            <Form.Field>
              {recipes}
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary className='button_basic' onClick={this.onListSubmit}>
            <Icon name='checkmark' /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return { recipes: state.recipes }
}

export default connect(mapStateToProps)(NewListModal)
