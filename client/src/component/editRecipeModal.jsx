import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Header, Icon, Modal, Form, Input, TextArea, Dropdown, Label } from 'semantic-ui-react'
import { fetchTags } from '../actions'

class EditRecipeModal extends Component{
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    name: '',
    source: '',
    image: '',
    note: '',
    ingredients: [],
    instructions: [],
    video: '',
    tags: [],
    options: [],
  }

  renderOptionsFiltered = (recipe) => {
    const allOptions = this.props.tags.map(tag => tag.name)
    const allTags = recipe.tags.map(tag => tag.name)
    const filteredOptions = allOptions.filter(tag => !allTags.includes(tag))
    const options = filteredOptions.map(option => {
      const properOption = this.props.tags.find(tag => tag.name === option)
      return { key: properOption.id, text: properOption.name, value: properOption.name }
    })
    return options
  }

  componentDidMount = () => {
    const options = this.renderOptionsFiltered(this.props.recipe)
    this.setState({
      name: this.props.recipe.name,
      source: this.props.recipe.source,
      image: this.props.recipe.image,
      note: this.props.recipe.note,
      video: this.props.recipe.video,
      tags: this.props.recipe.tags,
      options: options,
      ingredients: this.props.recipe.ingredients,
      instructions: this.props.recipe.instructions,
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const options = this.renderOptionsFiltered(nextProps.recipe)
    this.setState({
      name: nextProps.recipe.name,
      source: this.props.recipe.source,
      image: nextProps.recipe.image,
      note: nextProps.recipe.note,
      video: nextProps.recipe.video,
      tags: nextProps.recipe.tags,
      options: options,
      ingredients: nextProps.recipe.ingredients,
      instructions: nextProps.recipe.instructions,
    })
  }

  handleOnChange = (event, { name, value }) => {
    this.setState({
      [name]: value,
    })
  }

  handleMultiInputChange = (event, data) => {
    const index = data.name
    const value = data.value
    const name = data.type ? 'ingredients' : 'instructions'
    const array = data.type ? [...this.state.ingredients] : [...this.state.instructions]
    if(name === 'instructions'){
      typeof(array[index]) === 'object' ? array[index]['step'] = value : array[index] = { step: value }
    } else {
      typeof(array[index]) === 'object' ? array[index]['name'] = value : array[index] = { name: value }
    }
    this.setState({
      [name]: array,
    })
  }

  renderIngredientInputs = () => {
    return this.state.ingredients.map((ingredient, index) => {
      return <Input key={index} name={index} value={ingredient.name} onChange={this.handleMultiInputChange} />
    })
  }

  renderInstructionInputs = () => {
    return this.state.instructions.map((instruction, index) => {
      return <TextArea key={index} name={index} value={instruction.step} onChange={this.handleMultiInputChange} />
    })
  }

  renderTags = () => {
    return this.state.tags.map(tag => <Label key={tag.id}><Icon name='tag' />{tag.name}<Icon name='delete' onClick={this.removeTag.bind(this, tag.name)}/></Label>)
  }

  removeTag = (tagName) => {
    const tag = this.props.tags.find(tag => tag.name === tagName)
    if(tag){
      const addTag = { text: tag.name, value: tag.name }
      this.setState({ options: this.state.options.concat(addTag), })
    }
    this.setState({
      tags: this.state.tags.filter(tag => tag.name !== tagName),
    })
  }

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
      tags: [{ name: value }, ...this.state.tags],
    })
  }

  addMoreFields = (event, { name }) => {
    event.preventDefault()
    const value = name === 'instructions' ? { order: this.state.instructions.length + 1 } : ''
    this.setState({
      [name]: this.state[name].concat(value)
    })
  }

  handleOnSubmitEdit = (event) => {
    let recipe = {
      ...this.state,
      ingredients: this.state.ingredients.filter(ingredient => ingredient.name.trim() !== ''),
      instructions: this.state.instructions.filter(instruction => instruction.step.trim() !== ''),
      id: this.props.recipe.id,
    }
    this.props.onSubmitEdit(recipe)
    this.context.router.history.push(`/recipes/${this.props.recipe.id}`)
  }

  renderEditForm = () => {
    return(
      <Form>
        <Form.Field>
          <Input type='text' placeholder='name' name='name' value={this.state.name}
            onChange={this.handleOnChange} required={true}
          />
        </Form.Field>
        <Form.Field>
          <Input type='text' placeholder='source link' name='source' value={this.state.source}
            onChange={this.handleOnChange} required={true}
          />
        </Form.Field>
        <Form.Field>
          <Input type='text' placeholder='image link' name='image' value={this.state.image}
            onChange={this.handleOnChange}
          />
        </Form.Field>
        <Form.Field>
          <TextArea style={{ minHeight: 100 }} placeholder='notes' name='note' value={this.state.note}
            onChange={this.handleOnChange}
          />
        </Form.Field>
        <Form.Field>
          <Button className='button_basic' primary name='ingredients' size='mini' onClick={this.addMoreFields}><Icon name='add' />Add Ingredient</Button>
          {this.renderIngredientInputs()}
        </Form.Field>
        <Form.Field>
          <Button className='button_basic' primary name='instructions' size='mini' onClick={this.addMoreFields}><Icon name='add' />Add Step</Button>
          {this.renderInstructionInputs()}
        </Form.Field>
        <Form.Field>
          <Input type='text' placeholder='video link' name='video' value={this.state.video}
            onChange={this.handleOnChange}
          />
        </Form.Field>
        <Form.Field>
          {this.renderTags()}
          <Dropdown placeholder='tags' options={this.state.options}
            multiple
            search
            selection
            allowAdditions
            onAddItem={this.handleAddition}
            onChange={this.handleTagChange}
          />
        </Form.Field>
      </Form>
    )
  }

  render(){
    return(
      <Modal trigger={<Button className='button_basic' primary floated='right'><Icon name='edit' />Edit</Button>} closeIcon='close'>
        <Header icon='archive' content='Edit Recipe' />
        <Modal.Content>
          {this.renderEditForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button primary className='button_basic' onClick={this.handleOnSubmitEdit}>
            <Icon name='checkmark' /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return { recipe: state.recipe, tags: state.tags }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTags,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipeModal)
