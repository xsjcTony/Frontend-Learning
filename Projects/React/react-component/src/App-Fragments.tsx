import { Component, Fragment, PureComponent } from 'react'


interface HomeState {
  nameList: string[]
}

class Home extends PureComponent<{}, HomeState> {
  public state: HomeState = {
    nameList: ['a', 'b', 'c']
  }

  public render() {
    return (
      this.state.nameList.map(name => (
        <Fragment key={ name }>
          <p>{ name }</p>
          <p>{ name }</p>
          <p>{ name }</p>
        </Fragment>
      ))
    )
  }
}

class App extends Component {
  public render() {
    return (
      <>
        <Home />
      </>
    )
  }
}

export default App
