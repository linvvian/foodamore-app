import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

class NoMatch extends Component {
  render(){
    return(
      <div id='page404'>
        <h1>Oh no! There's nothing here...</h1>
        <img src='https://www.pethub.com/sites/default/files//first-world-dog-problems-meme-2.jpg' id='error404' />
        <h1>The dog ate the page</h1>
      </div>
    )
  }
}

export default NoMatch
