import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Loader, Button, Divider, Segment, Table, Image, Icon, Embed } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import * as actions from '../actions'
import EditRecipeModal from '../component/editRecipeModal'
import ShowInstructionsModal from '../component/cookingInstructions_modal'
import SendText from '../component/sendText_modal'

class RecipeDetail extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount = () => {
    this.props.fetchRecipe(this.props.match.params.recipeId)
  }

  onSubmitEdit = (recipe) => {
    this.props.updateRecipe(recipe)
    this.props.fetchRecipe(this.props.match.params.recipeId)
  }

  showNotes = () => {
    if(!this.props.recipe.note) return
    return <Segment color='teal'>{this.props.recipe.note}</Segment>
  }

  showVideo = () => {
    if(!this.props.recipe.video) return
    return <Segment color='teal'><Embed className='video_component' url={this.props.recipe.video} /></Segment>
  }

  deleteRecipe = (event) => {
    event.preventDefault()
    if (!this.props.deleteRecipe(this.props.recipe.id)) {
      this.context.router.history.push('/')
    }
  }

  loadRecipeDetails = () => {
    if(!this.props.recipe.instructions || !this.props.recipe.ingredients) return <Loader active />

    const instructions = this.props.recipe.instructions.map(instruction => {
      return(
      <Table.Row key={instruction.order}>
        <Table.Cell width={2}>Step {instruction.order}:</Table.Cell>
        <Table.Cell>{instruction.step}</Table.Cell>
      </Table.Row>
      )})
    const ingredients = this.props.recipe.ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)
    const showImage = this.props.recipe.image || 'https://www.askideas.com/media/41/I-Just-Wanted-To-Eat-but-You-Lit-My-Food-On-Fire-Funny-Food-Meme-Image.jpg'

    return (
      <div className='detailpage_container'>
        <EditRecipeModal onSubmitEdit={this.onSubmitEdit}/>
        <ShowInstructionsModal />
        <h1>{this.props.recipe.name.toUpperCase()}</h1>
        <Divider />
        <Image
          src={showImage}
          size='big'
          centered
        />
        <Divider hidden />
        {this.showNotes()}
        <Segment color='teal'>
          <SendText />
          <ul>{ingredients}</ul>
        </Segment>
        <Segment color='teal'>
          <Table basic='very'><Table.Body>{instructions}</Table.Body></Table>
        </Segment>
        {this.showVideo()}
        <Button onClick={this.deleteRecipe} primary floated='right' className='delete_button'><Icon name='delete'/>Delete</Button>
      </div>
    )
  }

  loadTags = () => {
    if(!this.props.recipe.tags) return
    return (
      <div className='tag_container'>
        {this.props.recipe.tags.map(tag => <Link key={tag.id} to={`/lists/${tag.id}`}><Button className='tag_button' primary ><Icon name='tag' />{tag.name}</Button></Link>)}
      </div>
    )
  }

  playAudio = () => {
    this.setState({ isPlaying: true })
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
  return { recipe: state.recipe }
}

export default connect(mapStateToProps, actions)(RecipeDetail)
