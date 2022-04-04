# React - 入门 (Introduction)



> [React – A JavaScript library for building user interfaces](https://reactjs.org/)
>
> [React 官方中文文档 – 用于构建用户界面的 JavaScript 库](https://zh-hans.reactjs.org/)
>
> [React TypeScript Cheatsheets | React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/)



## 基本概念

- `React` 是一个 `JavaScript` 的框架
- 使用 `Flow` 编写
- 支持 `TypeScript`

---

## 开发工具 Dev Tools

- [React Developer Tools - Chrome Web Store](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

---

## 核心思想

- 数据驱动界面更新

  - 声明式渲染
  - 只要数据发生了改变, 那么界面就会自动改变

- 组件化开发

  - 拼乐高
  - 将网页拆分成一个个独立的组件来编写, 然后再将编写好的组件拼接成一个完整的网页

  ![components.png](D:\xsjcTony\it666\Frontend-Learning\Notes\React\images\components.png)

---

## 虚拟DOM

- 使用 `JavaScript对象` 来表示页面上真实的 `DOM`

- 相对于浏览器渲染出来的 `真实DOM`

虚拟DOM

```js
const obj = {
  tagName: 'div',
  attributes: {
    id: 'name',
    title: 'name'
  }
}
```

真实DOM

```html
<div id="name" title="name"></div>
```

---

## 基本使用

```html
<body>
  
<!-- Container -->
<div id="container"></div>

<!-- React Library -->
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

<script>
  // 数据
  let message = 'Aelita'
  
  // 方法
  const myFn = () => {
    message = 'Lily'
    // 默认情况下不能自动更新数据, 需要重新创建虚拟DOM并手动渲染
    const div = React.createElement('div', null, message)
    const button = React.createElement('button', { onClick: myFn }, 'Button')
    const root = React.createElement('div', null, div, button)
    ReactDOM.render(root, document.querySelector('#container'), () => void console.log('Rendered'))
  }
  
  // 创建虚拟DOM
  /**
   * React.createElement() 接收三个参数
   * 1. 标签名称
   * 2. 属性
   * 3. 包含的内容 (可以是多个)
   */
  const div = React.createElement('div', null, message)
  const button = React.createElement('button', { onClick: myFn }, 'Button') // 属性名称必须是驼峰命名 (camelCase)
  const root = React.createElement('div', null, div, button) // 根元素
  
  // 将虚拟DOM渲染为真实DOM
  // 若render()方法被调用多次, 那么后渲染的会覆盖先渲染的. 所以若想渲染多个元素需要将所有想渲染的元素放到一个根元素中
  /**
   * ReactDOM.render() 接收三个参数
   * 1. 被渲染的虚拟DOM
   * 2. 要渲染到哪个元素中
   * 3. 渲染或更新完成之后的回调函数
   * (React 17的写法, 18中应使用 ReactDOM.createRoot(container).render())
   */
  ReactDOM.render(root, document.querySelector('#container'), () => void console.log('Rendered'))
</script>
  
</body>
```

文件解析

- react.js

  - 包含了 `React` 和 `React Native` 所共同拥有的核心代码

  - 主要用于生成 `虚拟DOM`

  - 用于编写界面

- react-dom.js

  - 包含了针对不同平台渲染不同内容的核心代码

  - 主要用于将 `虚拟DOM` 转换为 `真实DOM`

  - 用于渲染界面

---

## JSX

[JSX 简介 – React](https://zh-hans.reactjs.org/docs/introducing-jsx.html)

定义

- 专门用于编写 `React` 中的页面结构体
- `JavaScript` 和 `XML` 的结合 (JS + X = JSX)
- `JavaScript` 的语法扩展

优势

- 在 `React` 中编写页面结构更加简单灵活
- 类型安全, 在编译过程中就能发现错误
- 执行更快, 在编译为 `JavaScript` 代码后进行了优化
- 能够防止 `XSS` 注入攻击

注意点

- `render()` 方法中只能有一个 `根元素`

重写 `基本使用` 中的例子

```html
<body>
<!-- Container -->
<div id="container"></div>

<!-- React Library -->
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

<!-- Babel -->
<script src="https://unpkg.com/@babel/standalone/babel.js" crossorigin></script>

<!-- type="text/babel" 代表使用babel编译 -->
<!-- 仅用于示例, 而不是项目中 -->
<script type="text/babel">
  // 数据
  let message = 'Aelita'

  // 方法
  const myFn = () => {
    message = 'Lily'
    // 默认情况下不能自动更新数据, 需要重新创建虚拟DOM并手动渲染
    myRender()
  }

  // 封装渲染操作, 使用JSX
  const myRender = () => {
    const root = (
      <div>
        <div>{ message }</div>
        <button onClick={ myFn }>Button</button>
      </div>
    )

    ReactDOM.render(root, document.querySelector('#container'), () => void console.log('Rendered'))
  }

  // 渲染
  myRender()
</script>
</body>
```

---

## 函数组件

创建方式

- 通过 `ES5-` 的构造函数来定义
  - 属于 `无状态` 组件
- 通过 `ES6+` 的 `class` 来定义
  - 属于 `有状态` 组件

示例

- `构造函数` : 无状态组件

```js
let message = 'Aelita'

function myFn() {
  message = 'Lily'
  ReactDOM.render(<Home/>, document.querySelector('#container'))
}

function Home() {
  return (
    <div>
      <div>{ message }</div>
      <button onClick={ myFn }>Button</button>
    </div>
  )
}

ReactDOM.render(<Home/>, document.querySelector('#container'))
```

- `class` : 有状态组件

```js
class Home extends React.Component { // 继承React.Component即表示是一个组件
  constructor(props) {
    super(props)

    this.state = {
      message: 'Aelita'
    }
  }

  // 如果是从JSX中直接调用方法, 则需要使用箭头函数, 否则this会绑定为undefined
  // 若不是箭头函数, 则需要在JSX中调用时使用this.myFn.bind(this)
  myFn() {
    // 永远不要直接修改this.state, 而是使用setState()方法
    this.setState({
      message: 'Lily'
    })
  }

  render() {
    return (
      <div>
        <div>{ this.state.message }</div>
        <button onClick={ this.myFn.bind(this) }>Button</button>
      </div>
    )
  }
}

ReactDOM.render(<Home/>, document.querySelector('#container'))
```

---

## 组件状态

定义

- 组件分为 `有状态组件` 和 `无状态组件`
- `状态` 指的实际上就是组件中的 `数据`

- 有状态组件

  - 使用 `class` 定义

  - 有自己的数据

  - 为 `逻辑组件`

- 无状态组件

  - 使用 `构造函数` 定义

  - 没有自己的数据

  - 为 `展示组件`

定义组件状态

- 继承 `React.Component` 的组件, 都会从父类继承一个 `state` 属性
- 这个属性专门用于保存当前组件的数据
- 在 `constructor` 中, 通过 `this.state` 给其赋值
- <span style="color: #f90">不要在 `constructor` 之外重新赋值 `this.state` , 而是使用 `this.setState()`</span>

























































