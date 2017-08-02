import React, { Component } from 'react'
import axios from 'axios'
import { Input } from 'semantic-ui-react'

class RecipeScrape extends Component {
  state = { input: '', loading: false }

  handleSubmit = (event) => {
    if (!this.state.input) return
    event.preventDefault()
    this.setState({ loading: true })
    axios.post('http://localhost:3003/fetch', {
      ...this.state
    })
    .then(response => {
      setTimeout(() => {
        this.setState({ loading: false, input: '' })
      }, 1000)
      this.props.getFromLink(event, response.data[0], response.data[1], this.state.input)
    })
  }

  handleChange = (event, { value }) => {
    this.setState({ input: value })
  }

  render(){
    return(
      <Input
        loading={this.state.loading}
        action={{ labelPosition: 'right', icon: 'search', content: 'Get', onClick: this.handleSubmit, primary: true, className: 'button_basic' }}
        placeholder='get from source link'
        value={this.state.input}
        onChange={this.handleChange}
      />
    )
  }
}

export default RecipeScrape
