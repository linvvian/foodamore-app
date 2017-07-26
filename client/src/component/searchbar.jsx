import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Input } from 'semantic-ui-react'

class SearchBar extends Component {
  state = {
    searchTerm: '',
  }

  handleSearchChange = (event, data) => {
    this.setState({
      searchTerm: data.value,
    })
    this.props.searchTerm(data.value.toLowerCase())
  }

  componentWillUnmount = () => {
    this.props.searchTerm('')
  }

  render(){
    return (
      <div className='serachbar_container'>
        <Input fluid icon='search' placeholder='Search by recipe or ingredients...' value={this.state.searchTerm} onChange={this.handleSearchChange}/>
      </div>
    )
  }
}

export default connect(null, actions)(SearchBar)
