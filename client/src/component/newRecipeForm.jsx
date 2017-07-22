import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input, TextArea, Dropdown } from 'semantic-ui-react'

class NewRecipeForm extends Component {
  state = {
    name: '',
    image: '',
    note: '',
    ingredients: [],
    instructions: [],
    video: '',
    tags: [],
    options: [],
  }

  componentDidMount = () => {
    const tags = this.props.tags.map(tag => {
      return { key: tag.id, text: tag.name, value: tag.name }
    })
    this.setState({
      options: tags,
    })
  }

  handleOnChange = (event, { name, value }) => {
    this.setState({
      [name]: value,
    })
  }

  handleTextAreaInput = (event, { name, value }) => {
    event.preventDefault()
    const newValue = value.split('\n')
    this.setState({
      [name]: newValue,
    })
  }

  handleOnSubmitRecipe = (event) => {
    event.preventDefault()
    this.props.submitNewRecipe(this.state)
    this.setState({
      ...this.state,
      name: '',
      image: '',
      note: '',
      ingredients: [],
      instructions: [],
      video: '',
      tags: [],
    })
  }

  handleAddition = (e, { value }) => {
  this.setState({
    options: [{ text: value, value }, ...this.state.options],
  })
}

  handleTagChange = (e, { value }) => {
    this.setState({ tags: value })
  }

  render(){
    return(
      <div className='form_container'>
        <Form onSubmit={this.handleOnSubmitRecipe}>
          <Form.Field>
            <Input type='text' placeholder='name' name='name' value={this.state.name}
              onChange={this.handleOnChange} required={true}
            />
          </Form.Field>
          <Form.Field>
            <Input type='text' placeholder='image link' name='image' value={this.state.image}
              onChange={this.handleOnChange}
            />
          </Form.Field>
          <Form.Field>
            <TextArea autoHeight placeholder='notes' name='note' value={this.state.note}
              onChange={this.handleOnChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Ingredients (separate with enter)</label>
            <TextArea autoHeight placeholder='ingredients' name='ingredients'
              onChange={this.handleTextAreaInput} required={true}
            />
          </Form.Field>
          <Form.Field>
            <label>Instructions (separate steps with enter)</label>
            <TextArea autoHeight placeholder='instructions' name='instructions'
              onChange={this.handleTextAreaInput} required={true}
            />
          </Form.Field>
          <Form.Field>
            <Input type='text' placeholder='video link' name='video' value={this.state.video}
              onChange={this.handleOnChange}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown placeholder='tags' options={this.state.options}
              multiple
              search
              selection
              allowAdditions
              onAddItem={this.handleAddition}
              onChange={this.handleTagChange}
            />
          </Form.Field>
          <Button type='submit'>Save New Recipe</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { tags: state.tags }
}

export default connect(mapStateToProps)(NewRecipeForm)
