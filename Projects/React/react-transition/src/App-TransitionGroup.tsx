import { Component } from 'react'
import './App.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'


interface AppState {
  nameList: {
    id: number
    name: string
  }[]
}

class App extends Component<{}, AppState> {
  public state: Readonly<AppState> = {
    nameList: [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' }
    ],
  }

  private removeName = (index: number): void => {
    this.setState({
      nameList: this.state.nameList.filter((_, i) => i !== index)
    })
  }

  private addName = (): void => {
    this.setState({
      nameList: [...this.state.nameList, {
        id: Math.random(),
        name: 'New Name'
      }]
    })
  }

  public render() {
    return (
      <>
        <ul>
          <TransitionGroup>
            { this.state.nameList.map(({ id, name }, index) => (
              <CSSTransition timeout={ 3000 }
                             key={ id }
                             classNames="item"
              >
                <li>
                  <button onClick={ () => void this.removeName(index) }>×</button>
                  { name }
                </li>
              </CSSTransition>
            )) }
          </TransitionGroup>
        </ul>
        <button onClick={ this.addName }>Add name</button>
      </>
    )
  }
}

export default App
