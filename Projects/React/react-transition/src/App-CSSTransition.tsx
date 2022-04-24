import { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import './App.css'


interface AppState {
  isShow: boolean
}

class App extends Component<{}, AppState> {
  public state: Readonly<AppState> = {
    isShow: false
  }

  private show = (): void => {
    this.setState({
      isShow: true
    })
  }

  private hide = (): void => {
    this.setState({
      isShow: false
    })
  }

  private myFn = (node: HTMLElement, isAppearing: boolean): void => {
    console.log(node, isAppearing)
  }

  public render() {
    return (
      <>
        <CSSTransition in={ this.state.isShow }
                       classNames="box"
                       timeout={ 3000 }
                       unmountOnExit
                       onEnter={ this.myFn }
        >
          <div />
        </CSSTransition>
        <button onClick={ this.show }>Show</button>
        <button onClick={ this.hide }>Hide</button>
        <CSSTransition in
                       appear
                       classNames="box2"
                       timeout={ 3000 }
                       onEnter={ this.myFn }
        >
          <div />
        </CSSTransition>
      </>
    )
  }
}

export default App
