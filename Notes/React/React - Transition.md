# React - Transition



> [React Transition Group](https://reactcommunity.org/react-transition-group/)



## 原生CSS

```tsx
import { Component } from 'react'
import styled from 'styled-components'


interface AppState {
  width: number | string
  height: number | string
  opacity: number
}

const StyledDiv = styled.div<AppState>`
    width: ${ props => props.width };
    height: ${ props => props.height };
    background: skyblue;
    opacity: ${ props => props.opacity };
    transition: all 3s;
`

class App extends Component<{}, AppState> {
  public state: Readonly<AppState> = {
    width: 0,
    height: 0,
    opacity: 0
  }

  private btnClick = (): void => {
    this.setState({
      width: '100px',
      height: '100px',
      opacity: 1
    })
  }

  public render() {
    return (
      <>
        <StyledDiv { ...this.state } />
        <button onClick={ this.btnClick }>Show</button>
      </>
    )
  }
}

export default App
```

---

## React Transition Group

- 一个社区提供的快速实现过渡动画的库
- 提供了 `4` 个 `容器组件` , 只需要将需要进行动画的 `组件` 放到其中就可以了
  - `Transition`
    - 与平台无关的组件
    - 不使用 `CSS`
  - <推荐> `CSSTransition`
    - 使用 `CSS` 的 `transition` 属性
  - `SwitchTransition`
    - 两个组件显示和隐藏切换时使用
  - `TransitionGroup`
    - 将多个动画组件包裹在其中
    - 一般用于列表中元素的动画

安装

```shell
npm i react-transition-group
npm i -D @types/react-transition-group
```



### CSSTransition

[React Transition Group - CSSTransition](https://reactcommunity.org/react-transition-group/transition)

必要 `props`

- `in` : 设置触发 `enter` 还是 `exit`
  - `true` 代表触发 `enter`
  - `false` 代表触发 `exit`
  - 初始值设置为第一次触发的相反状态
  - <span style="color: #0ff">由 `Transition` 组件继承而来, 所以文档在 `Transition` 中</span>
- `classNames` : 动画类名前缀
- `timeout` : 超时时间, 设置为大于等于 `transition` 时长的数字, 单位为 `ms`

其他 `props`

- <span style="color: #0ff">以下皆由 `Transition` 组件继承而来</span>

- `unmountOnExit` : `exit` 执行完毕之后是否删除元素 / 组件, 默认为 `false`
- `appear` : 是否需要进行初始化动画, 默认为 `false`
- `onEnter` / `onEntering` / `onEntered` : 在 `enter` 动画的三个阶段分别会执行的回调函数, 接收 `2` 个参数
  - `node` : 当前正在执行动画的 `HTMLElement` 元素
  - `isAppearing` : 是否在执行初始化动画, 是为 `true` , 不是为 `false`
- `onExit` / `onExiting` / `onExited` : 在 `exit` 动画的三个阶段分别会执行的回调函数, 接收 `1` 个参数
  - `node` : 当前正在执行动画的 `HTMLElement` 元素

类名

- `classNames-enter` : `enter` 动画执行之前
- `classNames-enter-active` : `enter` 动画执行过程中
  - `transition` 属性只能在 `active` 中指定
- `classNames-enter-done` : `enter` 动画执行完毕
- `classNames-exit` / `classNames-exit-active` / `classNames-exit-done` 同理
- `classNames-appear` / `classNames-appear-active` / `classNames-appear-done` : 初始化动画

基础使用代码示例

- `App.tsx`

```tsx
import { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import './App.css'


interface AppState {
  isShow: boolean
}

class App extends Component<{}, AppState> {
  public state: Readonly<AppState> = {
    isShow: false
  }

  private show = (): void => {
    this.setState({
      isShow: true
    })
  }

  private hide = (): void => {
    this.setState({
      isShow: false
    })
  }

  private myFn = (node: HTMLElement, isAppearing: boolean): void => {
    console.log(node, isAppearing)
  }

  public render() {
    return (
      <>
        <CSSTransition in={ this.state.isShow }
                       classNames="box"
                       timeout={ 3000 }
                       unmountOnExit
                       onEnter={ this.myFn }
        >
          <div />
        </CSSTransition>
        <button onClick={ this.show }>Show</button>
        <button onClick={ this.hide }>Hide</button>
        <CSSTransition in
                       appear
                       classNames="box2"
                       timeout={ 3000 }
                       onEnter={ this.myFn }
        >
          <div />
        </CSSTransition>
      </>
    )
  }
}

export default App
```

- `App.css`

```css
.box-enter {
    width: 0;
    height: 0;
    opacity: 0;
    background: skyblue;
}

.box-enter-active {
    width: 100px;
    height: 100px;
    opacity: 1;
    transition: all 2s;
}

.box-enter-done {
    width: 100px;
    height: 100px;
    opacity: 1;
    background: skyblue;
}

.box-exit {
    width: 100px;
    height: 100px;
    opacity: 1;
    background: #f00;
}

.box-exit-active {
    width: 0;
    height: 0;
    opacity: 0;
    background: #f00;
    transition: all 2s;
}

.box-exit-done {
    width: 0;
    height: 0;
    opacity: 0;
    background: #f00;
}


.box2-appear {
    width: 0;
    height: 0;
    opacity: 0;
    background: skyblue;
}

.box2-appear-active {
    width: 100px;
    height: 100px;
    opacity: 1;
    transition: all 2s;
}

.box2-appear-done {
    width: 100px;
    height: 100px;
    background: skyblue;
}
```



### SwitchTransition

[React Transition Group - SwitchTransition](https://reactcommunity.org/react-transition-group/switch-transition)

- 必须配合 `CSSTransition` / `Transition` 作为 **直接的** `子组件` 使用

props

- `mode` : 动画模式, 可选为 `out-in` / `in-out` , 默认为 `out-in`

注意点

- 作为 `子组件` 的 `CSSTransition` / `Transition` 需要使用 `key` 代替 `in` , 类型为 `string | number`

基础使用代码示例

- `App.tsx`

```tsx
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
```

- `App.css`

```css
.btn-enter {
    opacity: 0;
    transform: translateX(-100%);
}

.btn-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 2s;
}

.btn-exit {
    opacity: 1;
    transform: translateX(0);
}

.btn-exit-active {
    opacity: 0;
    transform: translateX(100%);
    transition: all 2s;
}

button {
    padding: 10px 20px;
    margin-left: 50%;
}
```



### TransitionGroup

[React Transition Group - TransitionGroup](https://reactcommunity.org/react-transition-group/transition-group)

- 当有一组 `组件` 需要执行动画的时候, 就需要将他们放到 `TransitionGroup` 中来完成动画
- 必须配合 `CSSTransition` / `Transition` 作为 **直接的** `子组件` 使用

注意点

- 作为 `子组件` 的 `CSSTransition` / `Transition` 需要使用 `key` 代替 `in` , 类型为 `string | number`
- `key` 绝对绝对不能重复

基础使用代码示例

- `App.tsx`

```tsx
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
```

- `App.css`

```css
.item-enter {
    opacity: 0;
    transform: translateX(100%);
}

.item-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 2s;
}

.item-exit {
    opacity: 1;
    transform: translateX(0);
}

.item-exit-active {
    opacity: 0;
    transform: translateX(100%);
    transition: all 2s;
}
```



















































