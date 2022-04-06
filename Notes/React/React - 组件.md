# React - 组件 (Component)



## 创建项目

- 使用 `vite` 创建

```shell
npm init vite@latest
```

---

## 父子组件通讯

- `父组件` 可以给 `子组件` 传递一些 `数据` / `方法`



### 函数式组件

- `父组件` 中使用自定义 `属性` 传递数据
- `子组件` 中在 `构造函数` 的 `参数` 中接收数据
- `子组件` 中可以使用 `Component.defaultProps` 设定默认的数据, 在 `父组件` 中没有传递时会使用, 用于数据不能为 `null` 的情况
  - <span style="color: #0ff">**<推荐>** 可以使用 `解构赋值` + `默认参数` 代替</span>
  - [Typing defaultProps | React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/default_props)


`App.tsx`

```tsx
import { Component } from 'react'
import Header from './components/Header'


class App extends Component {
  render() {
    return (
      <Header name={ 'Aelita' } age={ 24 } />
    )
  }
}

export default App
```

`Header.tsx`

```tsx
import './Header.css'


function Header(props: { name: string, age: number }) {
  console.log(props) // { name: 'Aelita', age: 24 }

  return (
    <div className="header">Header</div>
  )
}

// 默认数据, 在父组件没有传递时使用
Header.defaultProps = {
  name: 'Lily',
  age: 18
}

export default Header
```



### 类组件

- `父组件` 中使用自定义 `属性` 传递数据
- `子组件` 中在 `constructor` 的 `参数` 中接收数据
- `子组件` 中可以使用 `static defaultProps` 设定默认的数据, 在 `父组件` 中没有传递时会使用, 用于数据不能为 `null` 的情况
  - <span style="color: #0ff">**<推荐>** 可以使用 `解构赋值` + `默认参数` 代替</span>
  - [Typing defaultProps | React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/default_props)

`App.tsx`

```tsx
import { Component } from 'react'
import Main from './components/Main'


class App extends Component {
  render() {
    return (
      <Main name={ 'Aelita' } age={ 24 } />
    )
  }
}

export default App
```

`Main.tsx`

```tsx
import './Main.css'
import { Component } from 'react'


interface myProps {
  name: string
  age: number
}

class Main extends Component<myProps> {
  constructor(props: myProps) {
    super(props)

    console.log(this.props) // { name: 'Aelita', age: 24 }
  }

  // 默认数据
  static defaultProps = {
    name: 'Lily',
    age: 18
  }

  public render() {
    return (
      <div className="main">Main</div>
    )
  }
}

export default Main
```

---

## 子父组件通讯

- `子组件` 可以给 `父组件` 传递一些 `数据` / `方法`
- `子组件` 通过接收 `父组件` 传递过来的 `方法` , 在调用时以 `参数` 的形式即可向 `父组件` 传递 `数据` / `方法`

![dataflow_child_to_father.png](D:\xsjcTony\it666\Frontend-Learning\Notes\React\images\dataflow_child_to_father.png)

传递数据示例

- `App.tsx` (父组件)

```tsx
import { Component } from 'react'
import Footer from './components/Footer'


class App extends Component {
  // 用于接收子组件传递过来的数据的方法
  myFn = (name: string, age: number) => {
    console.log(name, age)
  }

  render() {
    return (
      <>
        <Footer fatherFn={ this.myFn } />
      </>
    )
  }
}

export default App

```

- `Footer.tsx` (子组件)

```tsx
import './Footer.css'
import { Component } from 'react'


interface myProps {
  fatherFn(name: string, age: number): void
}

class Footer extends Component<myProps> {
  constructor(props: myProps) {
    super(props)
  }

  // 通过调用父组件的方法，来通过参数传递数据
  btnClick = () => {
    this.props.fatherFn('Aelita', 24)
  }

  render() {
    return (
      <>
        <div className="footer">Footer</div>
        <button onClick={ this.btnClick }>Footer button</button>
      </>
    )
  }
}

export default Footer
```

---

## 跨组件通讯

- 跨组件方式有两种方式
  - 一层一层传递 (和 `父子组件通讯` 方法一致)
  - 使用 `Context`
  - 使用 `Redux` (相当于 `Vuex` )
  - 使用 `Hooks`



### Context

- 一种无需为每层组件手动添加 `props` , 就能在 `组件数` 之间进行数据传递的方法

创建 `Context`

- `defaultValue` 会在没有 `Provider` 时被使用

```tsx
interface MyContext {
  name: string
  age: number
}

// 创建一个Context对象
const MyContext = createContext<MyContext>({ name: 'Tequila', age: 18 })
```

Provider

- 生产者容器组件
- 专门负责生产数据
- 需要提供一个 `value` 属性

```tsx
class App extends Component {
  render() {
    return (
      <MyContext.Provider value={ { name: 'Aelita', age: 24 } }>
        <Father />
      </MyContext.Provider>
    )
  }
}
```

Consumer

- 消费者容器组件
- 专门用于消费 `Provider` 产生的数据
- 需要将一个 `函数` 作为 `子元素`
- 函数提供一个 `value` 参数, 即为 `Provider` 提供的 `value` , 返回值为需要渲染的内容

```tsx
// 跳过 Father 组件直接传递给 Son
class Son extends Component {
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
```

Class.contextType

- 另一种在组件中获取 `context` 的方式
- 给 `组件` 添加 `contextType` 属性, 赋值为需要使用的 `context`
- 通过 `this.context` 访问数据
- `函数式组件` 使用 `Component.contextType`
- `类组件` 使用 `static contextType`

```tsx
class Son extends Component {
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
```

多个 `Context`

- `Context` 可以有多个, 每一个 `Consumer` 需要对应一个单独的 `Context`

```tsx
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
  state: MyState = {
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
```

---







































