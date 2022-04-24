import { Component } from 'react'
import styled from 'styled-components'


const baseStyledDiv = styled.div`
    font-size: 100px;
    background: #00f;
`

const StyledDiv1 = styled(baseStyledDiv)`
    color: #f00;
`
const StyledDiv2 = styled(baseStyledDiv)`
    color: #0f0;
`

class App extends Component {
  public render() {
    return (
      <>
        <StyledDiv1>Div 1</StyledDiv1>
        <StyledDiv2>Div 2</StyledDiv2>
      </>
    )
  }
}

export default App
