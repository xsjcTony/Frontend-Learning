import { Component, PureComponent } from 'react'


interface HomeState {
  age: number
}

interface AppState {
  name: string
}

class Home extends PureComponent<unknown, HomeState> {
  public constructor(props: unknown) {
    super(props)
  }

  public state: Readonly<HomeState> = {
    age: 24
  }

  public render() {
    console.log('About render()')
    return (
      <>
        <p>{ this.state.age }</p>
      </>
    )
  }
}

class App extends Component<unknown, AppState> {
  public constructor(props: unknown) {
    super(props)
  }

  public state: Readonly<AppState> = {
    name: 'Aelita'
  }

  private btnClick = () => {
    this.setState({
      name: 'Tequila'
    })
  }

  public render() {
    console.log('App render()')
    return (
      <>
        <p>{ this.state.name }</p>
        <button onClick={ this.btnClick }>App Button</button>
        <Home />
      </>
    )
  }
}

export default App
