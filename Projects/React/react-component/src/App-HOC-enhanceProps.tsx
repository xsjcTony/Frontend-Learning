import { Component, createContext, PureComponent } from 'react'
import type { ComponentType } from 'react'


interface UserContext {
  name: string
  age: number
}

interface UserProps extends UserContext {
  country: string
}

const UserContext = createContext<UserContext>({
  name: 'Lily',
  age: 18
})

class Son1 extends PureComponent<UserProps> {
  public render() {
    return (
      <>
        <p>{ this.props.name }</p>
        <p>{ this.props.age }</p>
        <p>{ this.props.country }</p>
      </>
    )
  }
}

class Son2 extends PureComponent<UserProps> {
  public render() {
    return (
      <ul>
        <li>{ this.props.name }</li>
        <li>{ this.props.age }</li>
        <li>{ this.props.country }</li>
      </ul>
    )
  }
}

const enhanceProps = <T extends UserContext>(WrappedComponent: ComponentType<T>) => {
  return class extends PureComponent<Omit<T, keyof UserContext>> {
    public render() {
      return (
        <UserContext.Consumer>
          { value => <WrappedComponent { ...value } { ...this.props as T } /> }
        </UserContext.Consumer>
      )
    }
  }
}

const Father1 = enhanceProps(Son1)
const Father2 = enhanceProps(Son2)

class App extends Component {
  render() {
    return (
      <UserContext.Provider value={ { name: 'Aelita', age: 24 } }>
        <Father1 country="Australia" />
        <Father2 country="New Zealand" />
      </UserContext.Provider>
    )
  }
}

export default App
