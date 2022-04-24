import { Component } from 'react'
import styled from 'styled-components'


interface AppState {
  width: number | string
  height: number | string
  opacity: number
}

const StyledDiv = styled.div<AppState>`
    width: ${ props => props.width };
    height: ${ props => props.height };
    background: skyblue;
    opacity: ${ props => props.opacity };
    transition: all 3s;
`

class App extends Component<{}, AppState> {
  public state: Readonly<AppState> = {
    width: 0,
    height: 0,
    opacity: 0
  }

  private btnClick = (): void => {
    this.setState({
      width: '100px',
      height: '100px',
      opacity: 1
    })
  }

  public render() {
    return (
      <>
        <StyledDiv { ...this.state } />
        <button onClick={ this.btnClick }>Show</button>
      </>
    )
  }
}

export default App
