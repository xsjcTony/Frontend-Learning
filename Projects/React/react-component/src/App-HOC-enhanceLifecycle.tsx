import { Component, PureComponent } from 'react'
import type { ComponentType } from 'react'
import { EventEmitter } from 'events'


const eventBus = new EventEmitter()

interface UserList {
  list: string[]
}

class Son1 extends PureComponent<UserList> {
  public render() {
    return (
      <>
        { this.props.list.map(name => <p key={ name }>{ name }</p>) }
      </>
    )
  }
}

class Son2 extends PureComponent<UserList> {
  public render() {
    return (
      <ul>
        { this.props.list.map(name => <li key={ name }>{ name }</li>) }
      </ul>
    )
  }
}

const enhanceLifecycle = <T extends UserList>(WrappedComponent: ComponentType<T>) => {
  return class extends PureComponent<Omit<T, keyof UserList>, UserList> {
    public state: Readonly<UserList> = {
      list: []
    }

    public componentDidMount() {
      eventBus.addListener('update', this.update)
    }

    public componentWillUnmount() {
      eventBus.removeListener('update', this.update)
    }

    private update = (list: string[]) => {
      this.setState({
        list
      })
    }

    public render() {
      return (
        <WrappedComponent list={ this.state.list } { ...this.props as any } /> // 虽然是any, 但是依然会被检查类型
      )
    }
  }
}

const Father1 = enhanceLifecycle(Son1)
const Father2 = enhanceLifecycle(Son2)

class App extends Component {
  private btnClick = () => {
    eventBus.emit('update', ['a', 'b', 'c'])
  }

  public render() {
    return (
      <>
        <Father1 />
        <Father2 />
        <button onClick={ this.btnClick }>App Button</button>
      </>
    )
  }
}

export default App
