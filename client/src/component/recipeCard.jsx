import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Header, Modal, Button, Icon, Grid } from 'semantic-ui-react'

const RecipeCard = ({ id, name, note, ingredients, instructions, image, video }) => {
  const showIngredients = ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)
  const showInstructions = instructions.map(instruction => <li key={instruction.id}>{instruction.step}</li>)
  const noImageLink = image || 'https://www.askideas.com/media/41/I-Just-Wanted-To-Eat-but-You-Lit-My-Food-On-Fire-Funny-Food-Meme-Image.jpg'
  const showImage = image || 'http://funnystack.com/wp-content/uploads/2015/01/Funny-Dog-35.jpg'

  return(
    <Modal trigger={
      <Card as='button'>
        <Image src={noImageLink} className='recipecard_image'/>
        <Card.Content>
          <Header size='large' textAlign='center'>{name}</Header>
        </Card.Content>
      </Card>
    } closeIcon='close' className='recipe_detail_modal'>
      <Modal.Header>
        <Modal.Actions>
          <Link to={`/recipes/${id}`}><Button className='button_basic' primary floated='right'>
            More <Icon name='right chevron' />
          </Button></Link>
        </Modal.Actions>
        {name.toUpperCase()}
      </Modal.Header>
      <Modal.Content image scrolling>
        <Grid>
          <Grid.Column width={6}>
            <Image
              size='medium'
              src={showImage}
              wrapped
              floated='left'
              className='showImage'
            />
          </Grid.Column>
          <Grid.Column width={9}>
            <Modal.Description>
              <p>{note}</p>
              <Header>Ingredients</Header>
              <ul>{showIngredients}</ul>
              <Header>Instructions</Header>
              <ol className='instructions_list'>{showInstructions}</ol>
            </Modal.Description>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default RecipeCard
