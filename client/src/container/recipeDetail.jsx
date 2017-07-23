import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Container, Loader, Button, Divider, Segment, Table, Image, Icon } from 'semantic-ui-react'
import ReactPlayer from 'react-player'

import { fetchRecipe } from '../actions'
import EditRecipeModal from '../component/editRecipeModal'

class RecipeDetail extends Component {
  componentWillMount = () => {
    this.props.fetchRecipe(this.props.match.params.recipeId)
  }

  showNotes = () => {
    if(!this.props.note) return
    return <Segment color='teal'>{this.props.note}</Segment>
  }

  loadRecipeDetails = () => {
    if(!this.props.instructions || !this.props.ingredients) return <Loader active />

    const instructions = this.props.instructions.map(instruction => {
      return(
      <Table.Row>
        <Table.Cell width={2}>Step {instruction.order}:</Table.Cell>
        <Table.Cell>{instruction.step}</Table.Cell>
      </Table.Row>
      )})
    const ingredients = this.props.ingredients.map(ingredient => <li>{ingredient.name}</li>)

    return (
      <div className='detailpage_container'>
        <EditRecipeModal />
        <h1>{this.props.name.toUpperCase()}</h1>
        <Divider />
        <Image
          src='https://www.askideas.com/media/41/I-Just-Wanted-To-Eat-but-You-Lit-My-Food-On-Fire-Funny-Food-Meme-Image.jpg'
          size='big'
          centered
        />
        <Divider hidden />
        {this.showNotes()}
        <Segment color='teal'>
          <Button className='button_basic' primary floated='right'><Icon name='balance' />Convert</Button>
          <ul>{ingredients}</ul>
        </Segment>
        <Segment color='teal'>
          <Table basic='very'><Table.Body>{instructions}</Table.Body></Table>
        </Segment>
        <Segment color='teal'>
          <ReactPlayer className='video_component' url='https://youtu.be/9I49eKTcIJA' />
        </Segment>
      </div>
    )
  }

  loadTags = () => {
    if(!this.props.tags) return
    return (
      <div className='tag_container'>
        {this.props.tags.map(tag => <Button className='tag_button' primary><Icon name='tag' />{tag.name}</Button>)}
      </div>
    )
  }

  render(){
    return(
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              {this.loadTags()}
            </Grid.Column>
            <Grid.Column width={12}>
                {this.loadRecipeDetails()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state.recipe }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipe: (id) => {
      dispatch(fetchRecipe(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail)
