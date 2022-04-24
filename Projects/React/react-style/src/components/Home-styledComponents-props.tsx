import { Component } from 'react'
import styled from 'styled-components'


interface Props {
  color: string
}

const StyledDiv = styled.div`
    p {
        font-size: 50px;
        color: ${ props => props.color };
    }

    a {
        font-size: 25px;
        color: #0f0;
    }
`

class Home extends Component<{}, Props> {
  public state: Readonly<Props> = {
    color: '#f00'
  }

  private btnClick = (): void => {
    this.setState({
      color: '#0f0'
    })
  }

  public render() {
    return (
      <StyledDiv color={ this.state.color }>
        <p>I'm Home's paragraph</p>
        <a href="#">I'm Home's hyperlink</a>
        <button onClick={ this.btnClick }>Button</button>
      </StyledDiv>
    )
  }
}

export default Home
