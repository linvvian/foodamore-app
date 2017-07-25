import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Loader, Button, Divider, Segment, Table, Image, Icon } from 'semantic-ui-react'
import ReactPlayer from 'react-player'
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

  componentWillUpdate = (nextProps) => {
    if(this.props !== nextProps){
      this.props.fetchRecipe(this.props.match.params.recipeId)
    }
  }

  onSubmitEdit = (recipe) => {
    this.props.updateRecipe(recipe)
  }

  showNotes = () => {
    if(!this.props.recipe.note) return
    return <Segment color='teal'>{this.props.recipe.note}</Segment>
  }

  showVideo = () => {
    if(!this.props.recipe.video) return
    return <Segment color='teal'><ReactPlayer className='video_component' url={this.props.recipe.video} /></Segment>
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
      <Table.Row>
        <Table.Cell width={2}>Step {instruction.order}:</Table.Cell>
        <Table.Cell>{instruction.step}</Table.Cell>
      </Table.Row>
      )})
    const ingredients = this.props.recipe.ingredients.map(ingredient => <li>{ingredient.name}</li>)
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
        {this.props.recipe.tags.map(tag => <Button className='tag_button' primary><Icon name='tag' />{tag.name}</Button>)}
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
  return { recipe: state.recipe }
}

export default connect(mapStateToProps, actions)(RecipeDetail)
