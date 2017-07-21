import React from 'react'
import { Card, Image, Header } from 'semantic-ui-react'

const RecipeCard = ({ name }) => {
  return(
    <div>
      <Card>
        <Image src='https://www.askideas.com/media/41/I-Just-Wanted-To-Eat-but-You-Lit-My-Food-On-Fire-Funny-Food-Meme-Image.jpg' className='recipecard_image'/>
        <Card.Content>
          <Header size='large' textAlign='center'>{name}</Header>
        </Card.Content>
      </Card>
    </div>
  )
}

export default RecipeCard
