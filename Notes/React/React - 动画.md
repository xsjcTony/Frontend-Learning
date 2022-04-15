# React - 动画 (Transition)



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

- `unmountOnExit` : `exit` 执行完毕之后是否删除元素 / 组件, 默认为 `false`
  - <span style="color: #0ff">由 `Transition` 组件继承而来</span>
- `appear` : 是否需要进行初始化动画, 默认为 `false`
  - <span style="color: #0ff">由 `Transition` 组件继承而来</span>

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

  public render() {
    return (
      <>
        <CSSTransition in={ this.state.isShow }
                       classNames="box"
                       timeout={ 3000 }
        >
          <div />
        </CSSTransition>
        <button onClick={ this.show }>Show</button>
        <button onClick={ this.hide }>Hide</button>
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
```



















































