import { Component } from 'react'
import './App.css'
import { CSSTransition, SwitchTransition } from 'react-transition-group'


interface AppState {
  isOn: boolean
}

class App extends Component<{}, AppState> {
  public state: Readonly<AppState> = {
    isOn: true
  }

  private btnClick = (): void => {
    this.setState({
      isOn: !this.state.isOn
    })
  }

  public render() {
    return (
      <>
        <SwitchTransition mode="in-out">
          <CSSTransition timeout={ 3000 }
                         classNames="btn"
                         key={ this.state.isOn ? 'on' : 'off' }
          >
            <button onClick={ this.btnClick }>{ this.state.isOn ? 'on' : 'off' }</button>
          </CSSTransition>
        </SwitchTransition>
      </>
    )
  }
}

export default App
