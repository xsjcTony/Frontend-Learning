import { Component } from 'react'
import type { ReactNode, ChangeEvent } from 'react'


interface AppState {
  name: string
  email: string
  phone: string
}

class App extends Component<unknown, AppState> {
  public state: Readonly<AppState> = {
    name: 'Aelita',
    email: 'xsjcTony@126.com',
    phone: '13888888888'
  }

  private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value
    } as { [P in keyof AppState]: AppState[P] }) // 为了防止TypeScript报错, 需要使用这种方式来为计算属性指定类型
  }

  public render(): ReactNode {
    return (
      <form>
        <input type="text"
               name="name"
               value={ this.state.name }
               onChange={ this.handleChange }
        />
        <input type="text"
               name="email"
               value={ this.state.email }
               onChange={ this.handleChange }
        />
        <input type="text"
               name="phone"
               value={ this.state.phone }
               onChange={ this.handleChange }
        />
      </form>
    )
  }
}

export default App
