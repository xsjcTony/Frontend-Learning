import { Component } from 'react'
import styled from 'styled-components'


const StyledDiv = styled.div`
    p {
        font-size: ${ props => props.theme.size };
        color: ${ props => props.theme.color };
    }
`

class About extends Component {
  public render() {
    return (
      <StyledDiv>
        <p>I'm About's paragraph</p>
      </StyledDiv>
    )
  }
}

export default About
