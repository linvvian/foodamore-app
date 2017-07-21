import React, { Component } from 'react'
import { Form, Button, Input, TextArea } from 'semantic-ui-react'

class NewRecipeForm extends Component {
  state = {
    name: '',
    image: '',
    note: '',
    ingredients: [],
    instructions: [],
    video: '',
  }

  handleOnChange = (event, data) => {
    const { name, value } = data
    this.setState({
      [name]: value,
    })
  }

  render(){
    return(
      <div className='form_container'>
        <Form>
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
          <Button type='submit'>Save New Recipe</Button>
        </Form>
      </div>
    )
  }
}

export default NewRecipeForm
