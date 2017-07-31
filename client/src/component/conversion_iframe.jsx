import React, { Component } from 'react'
import Iframe from 'react-iframe'

class ConvertWindow extends Component {

  render(){
    return(
      <Iframe url='http://www.food.com/library/units-converter'
        width="450px"
        height="450px"
        position="relative"
      />
    )
  }
}

export default ConvertWindow
