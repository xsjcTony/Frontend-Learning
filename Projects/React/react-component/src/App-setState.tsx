import { Component } from 'react'


interface HomeProps {
  name: string
}

interface HomeState {
  count: number
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props)
  }

  public state: Readonly<HomeState> = {
    count: 0
  }

  private btnClick = () => {
    this.setState((prevState, props) => ({ count: prevState.count + 1 }))
    this.setState((prevState, props) => ({ count: prevState.count + 1 }))
    this.setState((prevState, props) => ({ count: prevState.count + 1 }))
  }

  public render() {
    return (
      <>
        <p>{ this.props.name }</p>
        <p>{ this.state.count }</p>
        <button onClick={ this.btnClick }>Button</button>
      </>
    )
  }
}

class App extends Component {
  public render() {
    return (
      <div>
        <Home name={ 'Aelita' } />
      </div>
    )
  }
}

export default App
