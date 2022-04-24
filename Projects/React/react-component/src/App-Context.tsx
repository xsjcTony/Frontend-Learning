import { Component, createContext } from 'react'


interface MyContext {
  name: string
  age: number
}

// 创建一个Context对象
const MyContext = createContext<MyContext>({ name: 'Tequila', age: 18 })

class App extends Component {
  render() {
    return (
      <MyContext.Provider value={ { name: 'Aelita', age: 24 } }>
        <Father />
      </MyContext.Provider>
    )
  }
}

class Father extends Component {
  render() {
    return (
      <div>
        <p>I'm Father</p>
        <Son1 />
        <Son2 />
      </div>
    )
  }
}

class Son1 extends Component {
  render() {
    return (
      <MyContext.Consumer>
        {
          value => (
            <div>
              <p>{ value.name }</p> { /* Aelita */ }
              <p>{ value.age }</p> { /* 24 */ }
            </div>
          )
        }
      </MyContext.Consumer>
    )
  }
}

class Son2 extends Component {
  static contextType = MyContext

  render() {
    return (
      <div>
        <p>{ this.context.name }</p> { /* Aelita */ }
        <p>{ this.context.age }</p> { /* 24 */ }
      </div>
    )
  }
}

export default App
