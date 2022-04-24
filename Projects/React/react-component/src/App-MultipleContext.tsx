import { Component, createContext } from 'react'


interface InfoContext {
  name: string
  age: number
}

interface MyState {
  info: InfoContext
  gender: string
}

// 创建一个Context对象
const InfoContext = createContext<InfoContext>({ name: 'Tequila', age: 18 })
const GenderContext = createContext<string>('unknown')

class App extends Component<{}, MyState> {
  state: Readonly<MyState> = {
    info: { name: 'Aelita', age: 24 },
    gender: 'male'
  }

  render() {
    return (
      <InfoContext.Provider value={ this.state.info }>
        <GenderContext.Provider value={ this.state.gender }>
          <Father />
        </GenderContext.Provider>
      </InfoContext.Provider>
    )
  }
}

class Father extends Component {
  render() {
    return (
      <div>
        <p>I'm Father</p>
        <Son />
      </div>
    )
  }
}

class Son extends Component {
  render() {
    return (
      <InfoContext.Consumer>
        { info => (
          <GenderContext.Consumer>
            { gender => (
              <div>
                <p>{ info.name }</p> { /* Aelita */ }
                <p>{ info.age }</p> { /* 24 */ }
                <p>{ gender }</p> { /* male */ }
              </div>
            )}
          </GenderContext.Consumer>
        )}
      </InfoContext.Consumer>
    )
  }
}

export default App
