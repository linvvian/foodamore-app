import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Header, Modal, Button, Icon } from 'semantic-ui-react'

const RecipeCard = ({ id, name, note, ingredients, instructions }) => {
  const showIngredients = ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)
  const showInstructions = ingredients.map(instruction => <li key={instruction.id}>{instruction.name}</li>)

  return(
    <Modal trigger={
      <Card as='button'>
        <Image src='https://www.askideas.com/media/41/I-Just-Wanted-To-Eat-but-You-Lit-My-Food-On-Fire-Funny-Food-Meme-Image.jpg' className='recipecard_image'/>
        <Card.Content>
          <Header size='large' textAlign='center'>{name}</Header>
        </Card.Content>
      </Card>
    } closeIcon='close'>
      <Modal.Header>
        <Modal.Actions>
          <Link to={`/recipes/${id}`}><Button className='button_basic' primary floated='right'>
            More <Icon name='right chevron' />
          </Button></Link>
        </Modal.Actions>
        {name.toUpperCase()}
      </Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size='medium'
          src='https://www.askideas.com/media/41/I-Just-Wanted-To-Eat-but-You-Lit-My-Food-On-Fire-Funny-Food-Meme-Image.jpg'
          wrapped
          floated='left'
        />
        <Modal.Description>
          <p>{note}</p>
          <Header>Ingredients</Header>
          <ul>{showIngredients}</ul>
          <Header>Instructions</Header>
          <ol className='instructions_list'>{showInstructions}</ol>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default RecipeCard
