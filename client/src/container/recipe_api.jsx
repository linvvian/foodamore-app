import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Input, Form, Button, Icon, Card, Image, Header, Container, Loader } from 'semantic-ui-react'
import * as actions from '../actions'

class DiscoverRecipeAPI extends Component {
  state = {
    query: '',
  }

  fetchRecipes = () => {
    console.log('submitting')
    this.props.fetchAPIRecipes(this.state.query)
  }

  changeQuery = (event, { value }) => {
    this.setState({ query: value })
  }

  loadCards = () => {
    if (this.props.apiRecipes){
      return this.props.apiRecipes.map(recipe => {
        return (
          <Link key={recipe.recipe_id} to={recipe.source_url} target='_blank'>
            <Card>
              <Image src={recipe.image_url} />
              <Card.Content>
                <Header size='large' textAlign='center'>{recipe.title}</Header>
              </Card.Content>
            </Card>
          </Link>
        )
      })
    } else {
      return <Loader active inverted/>
    }
  }

  componentWillUnmount = () => {
    this.props.clearSearchAPI()
  }

  render(){
    return(
      <div>
        <div className='api_search_container'>
          <Form onSubmit={this.fetchRecipes}>
            <Form.Field>
              <Input icon={<Icon name='search' inverted circular link />}
                id='api_search_input' placeholder='search recipe...' value={this.state.query} onChange={this.changeQuery}/>
            </Form.Field>
          </Form>
        </div>
        <Container className='container' fluid>
          <Card.Group>
            {this.loadCards()}
          </Card.Group>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { apiRecipes: state.apiRecipes }
}

export default connect(mapStateToProps, actions)(DiscoverRecipeAPI)
