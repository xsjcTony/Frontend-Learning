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
- 从上至下传递

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
```



### EventBus

[events - npm](https://www.npmjs.com/package/events)

- 使用第三方库 `events` 
- 可以实现包括 `兄弟组件` 之间的任意跨组件通讯

安装

```shell
npm i events
npm i -D @types/events
```

基本使用

- 创建全局 `eventBus` (事件管理对象)

```tsx
import { EventEmitter } from 'events'

// 全局事件管理器
const eventBus = new EventEmitter()
```

- 在需要接收数据 `组件` 的 `生命周期` 中的 `componentDidMount` 中, 添加 `eventBus` 监听的事件

```tsx
class A extends Component {
  public componentDidMount() {
    eventBus.addListener('say', this.aFn)
  }

  private aFn = (name: string, age: number) => {
    console.log(name, age)
  }
  
  public render() {
    return (
      <button onClick={ this.bBtnClick }>B button</button>
    )
  }
}
```

- 在需要发送数据的 `组件` 中, 调用 `eventBus` 中对应的事件

```tsx
class B extends Component {
  private bBtnClick = () => {
    eventBus.emit('say', 'Aelita', 24)
  }
}
```

- <span style="color: #0ff">由于 `eventBus` 的性能问题, 无论是在 `React` 还是 `Vue` 中, 都要在组件销毁时取消监听对应的事件</span>
  - `React` 中对应的是 `componentWillUnmount` 生命周期

```tsx
public componentWillUnmount() {
  eventBus.removeListener('say', this.aFn)
}
```

原理图示

![event_bus.png](D:\xsjcTony\it666\Frontend-Learning\Notes\React\images\event_bus.png)

---

## State vs Props

- 都是用于存储数据的
  - `State` 用于存储自己的数据
  - `Props` 用于存储 `父组件` 传递过来的数据
- 可读写性
  - `State` 虽然可以修改, 但是理论上也是只读的, 并且除了第一次赋值时, 永远不要去直接修改
  - `Props` 是只读的, 无法修改

```tsx
import { Component } from 'react'

interface HomeProps {
  name: string
}

interface HomeState {
  age: number
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props)
  }

  public state: Readonly<HomeState> = {
    age: 24
  }

  private btnClick = () => {
    this.setState({
      age: 18
    })
  }

  public render() {
    return (
      <>
        <p>{this.props.name}</p>
        <p>{this.state.age}</p>
        <button onClick={ this.btnClick }>Button</button>
      </>
    )
  }
}

class App extends Component {
  public render() {
    return (
      <div>
        <Home name={ 'Aelita' } />
      </div>
    )
  }
}

export default App
```



### props.children

- 可以获取当前组件的所有 `子元素` / `子组件`
- 比如组件 `A` 的 `this.props.children` , 拿到的就是双标签 `<A></A>` 中的所有内容

---

## setState()

- 默认情况下是 `异步` 的
- 原因主要是为了优化性能, 将一段时间内修改的数据合并到一次 `UI更新` 中
- <span style="color: #ff0">在 `定时器` / `原生事件` 中, `setState()` 是 **`同步`** 的</span>

参数

- `setState()` 可以接收第二个参数, 是数据更新之后的 `回调函数` , 在其中可以拿到更新之后的数据

```tsx
interface HomeProps {
  name: string
}

interface HomeState {
  age: number
}

class Home extends Component<HomeProps, HomeState> {
  public state: Readonly<HomeState> = {
    age: 24
  }

  private btnClick = () => {
    this.setState({
      age: 18
    }, () => {
      console.log(this.state.age) // 18
    })
  }
}
```

本质

- 并不是直接覆盖 `this.state` 中的数据, 而是将新 `state` 中的数据覆盖到旧的中, 类似于

```tsx
const oldState = {
  name: 'Aelita',
  age: 24
}
const newData = {
  age: 18
}
const newState = Object.assign({}, oldState, newData)
console.log(newState) // { name: 'Aelita', age: 18 }
```

合并现象

- 默认情况下会收集一段时间内的数据改变, 然后统一的更新 `UI`
- 所以以下代码会将数据从 `0` 变成 `1` , 而不是 `3`

```tsx
class Home extends Component {
  public state: Readonly<{ count: number }> = {
    count: 0
  }

  private btnClick = () => {
    // 由于每次的 this.state.count 都是 0, 所以最终结果是1
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
  }

  public render() {
    return (
      <>
        <p>{ this.state.count }</p>
        <button onClick={ this.btnClick }>Button</button>
      </>
    )
  }
}
```

解决合并现象

- 在想要强制 `React` 更新 `UI` 的时候, 就可以直接给 `setState()` 传入一个函数, 参数为
  - `prevState` : 上一次更新完毕后的 `state`
  - `props` : 此次更新时将要被使用的 `props`
- 所以以下代码会将数据从 `0` 变成 `3`

```tsx
class Home extends Component {
  public state: Readonly<{ count: number }> = {
    count: 0
  }

  private btnClick = () => {
    this.setState((prevState, props) => ({ count: prevState.count + 1 }))
    this.setState((prevState, props) => ({ count: prevState.count + 1 }))
    this.setState((prevState, props) => ({ count: prevState.count + 1 }))
  }

  public render() {
    return (
      <>
        <p>{ this.state.count }</p>
        <button onClick={ this.btnClick }>Button</button>
      </>
    )
  }
}
```

---

## 生命周期

[React.Component – React](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)

[React lifecycle methods diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

- `组件` 从生到死的过程
- `生命周期方法` 是在特定事件点调用的方法
- `React组件` 主要有如下几个生命周期方法
  - `constructor` : 组件被创建的时候被调用
  - `render` : 组件被渲染 / 更新的时候被调用
  - `componentDidMount` : 组件被挂载, 渲染出来之后调用
  - `componentDidUpdate` : 组件被更新, 重新渲染完毕之后调用
  - `componentWillUnmount` : 组件被卸载之前调用
- 不常用的生命周期方法
  - `static getDerivedStateFromProps` : 在 `constructor` 之后, `render` 之前调用
  - `shouldComponentUpdate` : 在组件更新时, `render` 之前调用
  - `getSnapshotBeforeUpdate` : 在组件更新时, `render` 之后, `componentDidUpdate` 之前调用



### constructor

参数

- `props` : `父组件` 传递过来的数据

作用

- 通过 `props` 接收 `父组件` 传递过来的数据
- 通过 `this.state` 初始化内部的数据
  - <span style="color: #0ff">一般在 `constructor` 之外定义</span>
- 通过 `bind` 为方法绑定 `this`
  - <span style="color: #ff0">一般会将 `方法` 作为箭头函数书写</span>



### render

作用

- 返回组件的网页结构 (一般为 `JSX` )



### componentDidMount

作用

- 执行依赖于 `DOM` 的操作
- <span style="color: #0ff">**<推荐>** 发送网络请求</span>
- 添加一些订阅
  - 比如 `eventBus`
  - 会在 `componentWillUnmount` 中取消订阅



### componentDidUpdate

`shouldComponentUpdate` 生命周期方法的返回值若为 `false` , 则不会被调用

参数

- `prevProps` : 组件更新之前的 `props`
- `prevState` : 组件更新之前的 `state`
- `snapshot` : `getSnapshotBeforeUpdate` 生命周期方法的返回值, 若没有定义则为 `undefined`

作用

- 对更新之后的组件进行操作
- 比如数据发生变化之后重新发送网络请求



### componentWillUnmount

作用

- 进行一些必要的清理操作
  - 比如 `timer` , `eventBus` 等



### static getDerivedStateFromProps

- 是一个静态方法 ( `static` )

参数

- `props` : `父组件` 传递过来的数据
- `state` : 当前组件的数据

返回值

- `对象` : 用于更新 `state`
- `null` : 不更新任何内容

作用

- 只有在 `state` 的值在任何时候都取决于 `props` 才使用
- <span style="color: #f90">尽量不要使用</span>



### shouldComponentUpdate

参数

- `nextProps` : 更新之后的 `props`
- `nextState` : 更新之后的 `state`

返回值

- `true` : 继续更新组件
- `false` : 停止该组件的本轮更新 (无法停止 `子组件` 的更新)

作用

- 用于使用逻辑判断 `组件` 是否进行本轮更新 (继续执行 `render` 和 `componentDidUpdate` )
- 只作为 `性能优化` 使用



### getSnapshotBeforeUpdate

参数

- `prevProps` : 组件更新之前的 `props`
- `prevState` : 组件更新之前的 `state`

返回值

- 返回任意的值, 会作为参数传递给 `componenetDidUpdate`
- `null` : 不返回任何值

作用

- 在 `DOM` 发生改变之前捕获一些信息
- 可以用来对 `UI` 进行特殊处理, 比如捕获滚动位置



### 图示

![component_lifecycle.png](D:\xsjcTony\it666\Frontend-Learning\Notes\React\images\component_lifecycle.png)

---

## 渲染 / 更新流程



### 渲染流程

1. 执行 `render` 方法
2. 将 `JSX` 转换为 `createElement()`
3. 执行 `createElement()` 创建 `虚拟DOM树`
4. 根据 `虚拟DOM树` 渲染出 `真实DOM` 



### 更新流程

1. `props` / `state` 发生改变
2. `render` 方法重新执行
3. 将 `JSX` 转换为 `createElement()`
4. 执行 `createElement()` 创建 `虚拟DOM树`
5. 新旧 `虚拟DOM树` 通过 `diff算法` 进行比较
6. 每发现一个不同就生成一个 `mutation`
7. 根据 `mutation` 更新 `真实DOM`



### diff算法

- 只会进行同层比较
- 在比较同层的时候, 默认只会进行同位置的比较
- 如果比较的元素为相同类型, 那么就记录变化
- 如果比较的元素是不同类型, 那么会直接删除之前的, 并创建新的元素
- 如果上一层比较的是不同类型的元素, 那么下一层不会进行比较, 直接创建新的元素

图示

![diff_algorithm.png](D:\xsjcTony\it666\Frontend-Learning\Notes\React\images\diff_algorithm.png)



### 列表渲染优化

- 列表渲染中 `key` 的作用可以让 `diff算法` 在同层比较时不只是对比同位置, 还会对比同层其他位置, 可以解决性能问题
- `key` 必须是唯一的
- `key` 不到万不得已不要使用 `index` , 反而会拖累性能

图示

![list_key.png](D:\xsjcTony\it666\Frontend-Learning\Notes\React\images\list_key.png)

---

## 性能优化

[性能优化 – React](https://zh-hans.reactjs.org/docs/optimizing-performance.html)



### React.PureComponent

- 默认情况下, 当 `父组件` 更新时, `子组件` 也会重新渲染
- 可以使用一些逻辑来判断 `子组件` 是否需要更新
- 使用 `子组件` 的 `shouldComponentUpdate` 生命周期方法
  - 若需要更新, 则返回 `true`
  - 若不需要更新, 则返回 `false`
- 如果只是 `浅对比` `props` 和 `state` , 那么可以让组件继承 `React.PureComponent`
  - 如果是数据 `深层嵌套` 的, 那么可能会导致一些 `BUG` , 或者推荐使用 `immutable` 来表示数据
  - <span style="color: #ff0">所有 `PureComponent` 的所有 `子组件` 的 `props` 更新将被跳过, 因此建议所有 `PureComponent` 的 `子组件` 都是 `PureComponent`</span>

```tsx
import { Component, PureComponent } from 'react'


interface HomeState {
  age: number
}

interface AppState {
  name: string
}

class Home extends PureComponent<unknown, HomeState> {
  public constructor(props: unknown) {
    super(props)
  }

  public state: Readonly<HomeState> = {
    age: 24
  }

  public render() {
    console.log('Home render()')
    return (
      <>
        <p>{ this.state.age }</p>
      </>
    )
  }
}

class App extends Component<unknown, AppState> {
  public constructor(props: unknown) {
    super(props)
  }

  public state: Readonly<AppState> = {
    name: 'Aelita'
  }

  private btnClick = () => {
    this.setState({
      name: 'Tequila'
    })
  }

  public render() {
    console.log('App render()')
    return (
      <>
        <p>{ this.state.name }</p>
        <button onClick={ this.btnClick }>App Button</button>
        <Home />
      </>
    )
  }
}

export default App
```



### React.memo

- 由于 `函数式组件` 没有 `生命周期方法` , 那么可以使用 `React.memo` `高阶组件` 来 `浅对比` `props` 决定是否更新组件
- 默认使用 `浅对比` , 若需要自定义对比方式, 可以作为第二个参数传入, 对比方法接收两个参数
  - `prevProps` : 更新之前的 `props`
  - `nextProps` : 更新之后的 `props`

```tsx
import { Component, memo } from 'react'


interface AppState {
  name: string
}

const Home = memo(function(): JSX.Element {
  console.log('Home render()')
  return (
    <p>Home</p>
  )
})

class App extends Component<unknown, AppState> {
  public constructor(props: unknown) {
    super(props)
  }

  public state: Readonly<AppState> = {
    name: 'Aelita'
  }

  private btnClick = () => {
    this.setState({
      name: 'Tequila'
    })
  }

  public render() {
    console.log('App render()')
    return (
      <>
        <p>{ this.state.name }</p>
        <button onClick={ this.btnClick }>App Button</button>
        <Home />
      </>
    )
  }
}

export default App
```



### 注意点

- 在更改 `state` 或 `props` 的时候, 永远
  - 不要修改原有的对象
  - 要传入一个全新的对象
- 这是为了 `引用数据类型` 的 `浅对比` 不会因为引用了相同的地址而返回 `true` , 否则会导致 `React.PureComponent` / `React.memo` 中 `浅对比` 的 `BUG`
- 也是为了避免在 `生命周期方法` 中的 `prevState` / `prevProps` 被修改, 从而造成 `BUG`
- 可以多利用 `...` 扩展运算符对 `数组` / `对象` 进行 `浅拷贝` , 放在新的 `数组` / `对象` 中

---

## Refs

[Refs and the DOM – React](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html)

- 访问 `DOM` 节点
- 访问在 `render` 方法中创建的 `React元素`
- 作为 `ref` 的 `组件` 中的方法必须要是 `public` 才能被 `ref` 访问并调用
- 无法为 `函数式组件` 创建 `ref` , 只有 `class组件` 可以
- 无论什么组件中都可以使用 `DOM` 节点或 `class组件` 的 `ref`



### createRef

- 用于创建 `ref`
- 在 `元素` 上通过 `ref={ this.xxxRef }` (同名变量) 绑定 `ref`
- 通过 `xxxRef.current` 获取元素 / 组件实例

```tsx
import { Component, createRef } from 'react'
import type { ReactNode } from 'react'


class App extends Component {
  // 若需要被其他组件中将本组件作为 ref 调用该方法, 则必须为 public
  public btnClick = (): void => {
    console.dir(this.pRef.current)
  }

  private pRef = createRef<HTMLParagraphElement>()

  public render(): ReactNode {
    console.log('App render()')
    return (
      <>
        <p ref={ this.pRef }>I'm box</p>
        <button onClick={ this.btnClick }>App Button</button>
      </>
    )
  }
}

export default App
```



### 回调Refs

- 用于创建 `ref`
- 在 `元素` 上通过 `ref={ this.setXxxRef }` 的方式绑定设置 `ref` 的 `方法`
- 通过 `xxxRef` 直接获取元素 / 组件实例
- <span style="color: #f90">如果使用内联函数定义, 那么在更新过程中, 函数会被执行两次, 所以不建议这么操作 (虽然无伤大雅)</span>
- `回调ref` 可以做到任何 `createRef` 可以做到的事情, 大部分情况下使用 `createRef` 即可, 某些情况下需要使用 `回调ref` (比如动态内容)

```tsx
import { Component } from 'react'
import type { ReactNode } from 'react'


class App extends Component {
  public btnClick = (): void => {
    console.dir(this.pRef)
  }

  private setPRef = (p: HTMLParagraphElement | null): void => {
    this.pRef = p
  }

  private pRef: HTMLParagraphElement | null = null

  public render(): ReactNode {
    console.log('App render()')
    return (
      <>
        <p ref={ this.setPRef }>I'm box</p>
        <button onClick={ this.btnClick }>App Button</button>
      </>
    )
  }
}

export default App
```



### Refs转发

[Refs 转发 – React](https://zh-hans.reactjs.org/docs/forwarding-refs.html)

- 一种将 `ref` 自动通过 `组件` 传递到其 `子组件` 的技巧
- 可以获取到 `函数式组件` 当中的某个 `元素` (当然依然不能将 `函数是组件` 本身作为 `ref` )

React.forwardRef()

- 是一个 `高阶组件`
- 专门用于转发 `ref`

```tsx
import { Component, createRef, forwardRef } from 'react'
import type { ReactNode } from 'react'


const About = forwardRef<HTMLSpanElement, unknown>((props, ref) => (
  <div>
    <p >I'm p</p>
    <span ref={ ref }>I'm span</span>
  </div>
))

class App extends Component {
  private aboutSpanRef = createRef<HTMLSpanElement>()

  private btnClick = (): void => {
    console.log(this.aboutSpanRef)
  }

  public render(): ReactNode {
    console.log('App render()')
    return (
      <>
        <About ref={ this.aboutSpanRef } />
        <button onClick={ this.btnClick }>App Button</button>
      </>
    )
  }
}

export default App
```

---

## 受控组件

[受控组件 – React](https://zh-hans.reactjs.org/docs/forms.html#controlled-components)

- `值` 受到 `React` 控制的表单元素
- `state` 成为唯一数据源
- 可以使用 `[key]: value` 的技巧来处理多个 `受控组件`
  - 可以给元素添加 `name` 属性, 然后通过 `event.target.name` 获取来作为 `key`
- 默认的表单元素为 `非受控组件` , 即 `state` 不是唯一的数据源

```tsx
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
```

---

## 高阶组件 (HOC)

[高阶组件 – React](https://zh-hans.reactjs.org/docs/higher-order-components.html)

- 全称 `High Order Component`
- 一种复用组件逻辑的高级技巧
- 不是一个 `API` , 而是一种基于 `React` 的组合特性而形成的 `设计模式`
- 参数为 `组件` , 返回值为一个 `新组件` 的 `函数`



### 基本格式

```tsx
import { Component } from 'react'
import type { ComponentType } from 'react'


// 原始组件
class Home extends Component {
  render() {
    return (
      <div>Home</div>
    )
  }
}

// 由于是函数, 所以可以传递任意数量的参数, 高度自定义
// P stands for Props
function enhanceComponent<P>(WrappedComponent: ComponentType<P>) {
  return class extends Component {
    render() {
      return (
        <WrappedComponent { ...(this.props as P) } /> // 原始组件, 可以传递任意数据, 以及透传props
      )
    }
  }
}

// 通过函数生成的高阶组件
const EnhancedComponent = enhanceComponent(Home)

class App extends Component {
  render() {
    return (
      <EnhancedComponent /> // 使用高阶组件
    )
  }
}

export default App
```



### 代码复用 / 增强Props

- 可以减少冗余代码

- 如下例子中将一些可以复用的 `props` 抽象出来
  - 将从 `Consumer` 中提取数据的逻辑抽取了出来, 解决了 `Father` 组件代码冗余的问题
- 不影响本身传递的 `props` , 可以视为增强 `props`

```tsx
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
```



### 拦截生命周期

- 可以减少冗余代码
- 如下例子中将 `生命周期` 拦截了下来并做了一些操作
- 然后将操作完毕的数据通过 `props` 传递了下去, 在被包裹的组件中可以直接使用

```tsx
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
```



### 权限控制

- 一个简单的检查登录状态的示例

```tsx
import { Component, PureComponent } from 'react'
import type { ComponentType } from 'react'


interface LoginStatus {
  loggedIn: boolean
}

class Info extends PureComponent {
  public render() {
    return (
      <div>Info</div>
    )
  }
}

class Login extends PureComponent {
  public render() {
    return (
      <div>Login</div>
    )
  }
}

const checkLogin = (WrappedComponent: ComponentType) => {
  return class extends PureComponent<LoginStatus> {
    public render() {
      if (this.props.loggedIn) {
        return <WrappedComponent />
      } else {
        return <Login />
      }
    }
  }
}

const CheckLogin = checkLogin(Info)

class App extends Component {
  public render() {
    return (
      <CheckLogin loggedIn />
    )
  }
}

export default App
```

---

## Portals

[Portals – React](https://zh-hans.reactjs.org/docs/portals.html)

- 一种将 `子节点` 渲染到存在于 `父组件` 之外的 `DOM节点` 中的能力
- 接收两个参数
  - `child` : 任何可渲染的 `React子元素` , 比如 `this.props.children`
  - `container` : 一个 `DOM` 元素

`App.tsx`

```tsx
import { Component, PureComponent } from 'react'
import { createPortal } from 'react-dom'


const otherContainer = document.querySelector('#other')

class Modal extends PureComponent {
  public render() {
    return createPortal(
      this.props.children,
      otherContainer! // 除去 null 的情况
    )
  }
}

class App extends Component {
  public render() {
    return (
      <Modal>
        <div id="modal">Modal</div>
      </Modal>
    )
  }
}

export default App
```

`index.html`

```html
<body>
  <div id="app"></div>
  <div id="other"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

---

## Fragments

[Fragments – React](https://zh-hans.reactjs.org/docs/fragments.html)

- 可以让一个组件返回多个元素
- 以 `React.Fragment` 作为根元素, 不会被渲染出来
- 配合 `列表渲染` 使用时, 需要添加 `key` 属性 (比如配合 `<dt>` / `<dd>` 使用)
- 可以使用 `<></>` 双标签的 `短语法`
  - `短语法` 不支持 `key` 属性, 所以 `列表渲染` 中不可以使用

```tsx
import { Component, Fragment, PureComponent } from 'react'


interface HomeState {
  nameList: string[]
}

class Home extends PureComponent<{}, HomeState> {
  public state: HomeState = {
    nameList: ['a', 'b', 'c']
  }

  public render() {
    return (
      this.state.nameList.map(name => (
        <Fragment key={ name }>
          <p>{ name }</p>
          <p>{ name }</p>
          <p>{ name }</p>
        </Fragment>
      ))
    )
  }
}

class App extends Component {
  public render() {
    return (
      <>
        <Home />
      </>
    )
  }
}

export default App
```

---

## StrictMode

[严格模式 – React](https://zh-hans.reactjs.org/docs/strict-mode.html)

- 通过 `<React.StrictMode>` 开启严格模式
- 不会许安然处任何 `UI` 元素
- 仅在 `开发模式` 下有效
- 会检查一系列的坑

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'


const root = document.querySelector('#app')

if (!root) {
  throw new Error('Root element not found')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```













































