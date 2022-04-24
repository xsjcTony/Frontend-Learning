import { Component } from 'react'
import { EventEmitter } from 'events'


// 全局事件管理器
const eventBus = new EventEmitter()

class App extends Component {
  public render() {
    return (
      <>
        <A />
        <B />
      </>
    )
  }
}

class A extends Component {
  public componentDidMount() {
    eventBus.addListener('say', this.aFn)
  }

  public componentWillUnmount() {
    eventBus.removeListener('say', this.aFn)
  }

  private aFn = (name: string, age: number) => {
    console.log(name, age)
  }

  public render() {
    return (
      <div>A</div>
    )
  }
}

class B extends Component {
  private bBtnClick = () => {
    eventBus.emit('say', 'Aelita', 24)
  }

  public render() {
    return (
      <>
        <div>B</div>
        <button onClick={ this.bBtnClick }>B button</button>
      </>
    )
  }
}

export default App
