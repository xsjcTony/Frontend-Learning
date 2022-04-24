import { Component } from 'react'
import styled from 'styled-components'


const StyledDiv = styled.div`
    p {
        font-size: 50px;
        color: #f00;
    }

    a {
        font-size: 25px;
        color: #0f0;
    }
`

class Home extends Component {
  public render() {
    return (
      <StyledDiv>
        <p>I'm Home's paragraph</p>
        <a href="#">I'm Home's hyperlink</a>
      </StyledDiv>
    )
  }
}

export default Home
