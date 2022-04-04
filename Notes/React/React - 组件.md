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







































