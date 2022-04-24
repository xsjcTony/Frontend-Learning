import { Component } from 'react'


interface AppState {
  color: string
}

class App extends Component<{}, AppState> {
  public state: Readonly<AppState> = {
    color: '#f00'
  }

  private btnClick = (): void => {
    this.setState({
      color: '#00f'
    })
  }

  public render() {
    return (
      <>
        <p style={ { fontSize: 50, color: this.state.color } }>I'm paragraph 1</p>
        <p style={ { fontSize: 50, color: '#0f0' } }>I'm paragraph 2</p>
        <button onClick={ this.btnClick }>Button</button>
      </>
    )
  }
}

export default App
