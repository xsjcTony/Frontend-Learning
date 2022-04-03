# React - JSX



> [JSX 简介 – React](https://zh-hans.reactjs.org/docs/introducing-jsx.html)



## 基本概念

- 只要碰到了 `<>` , 就会被当做 `元素` 处理
  - 小写被视为原生 `DOM` 元素
  - 大写被视为 `组件`
- 只要碰到了 `{}` , 就会被当做 `JavaScript` / `TypeScript` 代码处理
- `render()` 方法中的 `JSX` 只能有一个 `根元素`

---

## 注释

- 由于碰到 `<>` 就会被当做 `元素` 处理, 所以不能使用 `<!-- xxx -->` 格式的 `HTML` 注释
- 由于碰到 `{}` 会被当做 `JavaScript` 代码处理, 所以可以在 `{}` 中使用 `JavaScript` 的注释
  - 若 `{}` 在一行, 则只能使用 `多行注释` , 否则 `}` 会被视为注释的内容
  - 若 `{}` 不在一行, 则 `单行注释` 和 `多行注释` 都可以使用, 但 `单行注释` 不能和 `}` 在同一行

```jsx
render() {
  <div>
  	{ /* 只能使用多行注释 */ }
    { // 可以使用单行注释和多行注释
      // 可以使用单行注释和多行注释
    }
  </div>
}
```

---

## 绑定属性

- 对于普通属性而言, 过去怎么绑定, `JSX` 中就怎么绑定, 也 **不需要** 转换为 `camelCase`
- 对于特殊属性, 需要使用 `camelCase` , 其中有几个特例
  - 对于 `类名` 来说, 需要使用 `className` , 因为 `class` 是 `JavaScript` 关键字
  - 对于 `样式` 来说, 需要使用 `JavaScript对象` 来表示
    - `key` 必须使用 `camelCase`
    - 建议使用 `string` , 因为 `number` 对于每个属性的默认单位不一样
      - 比如 `fontSize` 的默认单位是 `px` , 而 `lineHeight` 的默认单位就是 `比例` , 若需要指定 `px` 必须使用 `10px` 的字符串

```jsx
render() {
  return (
    <div>
      { /* 普通属性 */ }
      <p id="box">{ this.state.message }</p>
      <p aria-label={ this.state.message }>{ this.state.message }</p>
      { /* 类名, 由于class是JavaScript关键字, 所以需要使用className */ }
      <p className="active">{ this.state.message }</p>
      { /* 样式, 必须使用JavaScript对象, key必须使用camelCase */ }
      <p style={ { color: 'red', fontSize: '100px', lineHeight: 2 } }>{ this.state.message }</p>
    </div>
  )
}
```

---

## 子元素

[深入 JSX – React](https://zh-hans.reactjs.org/docs/jsx-in-depth.html#children-in-jsx)

- 任何合法的 `JavaScript` 表达式都可以嵌入到 `{}` 中
- 如下内容是合法的 `子元素` 但是不会显示出来. 如果想显示, 需要先转换为 `字符串` ( `[]` 无效)
  - `[]`
  - `true`
  - `false`
  - `null`
  - `undefined`
- <span style="color: #ff0">`对象` **不是** 一个合法的 `子元素`</span>
- 在使用 `&&` 时, 必须保证第一个值是真正的 `false`, 才会不会渲染 `&&` 之前的内容, 而 `falsy` 值会被渲染

```jsx
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <div>
        { /* 以下内容不会渲染 */ }
        <p>{ [] }</p>
        <p>{ true }</p>
        <p>{ false }</p>
        <p>{ null }</p>
        <p>{ undefined }</p>

        { /* 在使用 && 时, 必须保证第一个值是 false, 才会不会渲染&&之前的内容, 而falsy值会被渲染, 如下面一行会渲染0而不是预期的什么都没有 */ }
        { this.state.count && <p>Rendered</p> }
      </div>
    )
  }
}

ReactDOM.render(<Home/>, document.querySelector('#container'))
```

---

## 列表渲染

[列表 &amp; Key – React](https://zh-hans.reactjs.org/docs/lists-and-keys.html)

- 可以使用 `Array.prototype.map()` 方法将列表中的每一项渲染成一个 `<li>` (也可以是其他元素)
- 必须要为每一项指定一个 `key` , 作为 **唯一** 的 `标识` , 用于 `添加` / `删除` / `重新排序` 等
- `key` 必须是唯一的, 且不到万不得已不要使用 `index` 作为 `key` , 这样往往会有使性能变得更差, 并且无法正常重新排序
- 若没有显示指定, 则默认使用 `index` 作为 `key`
- 和 `Vue` 中 `v-for` 的 `key` 类似

渲染一个 `数组` 的示例

```jsx
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      numbers: [2, 4, 6, 8, 10]
    }
  }

  render() {
    return (
      <div>
        <ul>
          { this.state.numbers.map((number) => {
            return <li key={ number }>{ number }</li>
          }) }
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<Home/>, document.querySelector('#container'))
```

---

## 编码规范

- 使用 `()` 将 `JSX` 代码包裹起来

```jsx
const div = (<div>I'm a div</div>)

render() {
  return (
  	<div>I'm a div</div>
  )
}
```

- 在一组 `JSX` 只能有一个 `根元素`
- 单标签必须加上 `/>` 闭合符号

```jsx
render() {
  return (
  	<img src="" alt=""/>
  )
}
```

- `组件` 既可以使用双标签也可以使用单标签, 但单标签必须使用 `/>` 闭合
- 如果 `组件` 标签中没有内容, 那么使用 `单标签`

---

## 绑定事件

[事件处理 – React](https://zh-hans.reactjs.org/docs/handling-events.html)



### this

- 事件监听方法中的 `this` , 在 `JSX` 中绑定时为 `undefined` . (解决方案推荐 `第一种` )

  - <span style="color: #0ff">**<推荐>** 解决方案一: 将 `方法` 改成 `箭头函数`</span>
    - 若要传递参数, 需要使用 `解决方案二` 中的 `bind`

  ```jsx
  btnClick = () => {
    this.setState({
      message: 'Lily'
    })
  }
  
  
  render() {
    return (
      <div>
        <div>{ this.state.message }</div>
        <button onClick={ this.btnClick }>Button</button>
      </div>
    )
  }
  ```

  - 解决方案二: 绑定时加上 `.bind(this)`

  ```jsx
  btnClick() {
    this.setState({
      message: 'Lily'
    })
  }
  
  render() {
    return (
      <div>
        <div>{ this.state.message }</div>
        <button onClick={ this.btnClick.bind(this) }>Button</button>
      </div>
    )
  }
  ```

  - 解决方案三: 在 `constructor` 中修改 `this`

  ```jsx
  constructor(props) {
    super(props)
    this.state = {
      message: 'Aelita'
    }
  
    this.myClick = this.btnClick.bind(this)
  }
  
  btnClick() {
    this.setState({
      message: 'Lily'
    })
  }
  
  render() {
    return (
      <div>
        <div>{ this.state.message }</div>
        <button onClick={ this.myClick }>Button</button>
      </div>
    )
  }
  ```

  - 解决方案四: 直接在 `JSX` 中书写箭头函数, 执行 `方法`
    - 可以自行传递参数

  ```jsx
  btnClick() {
    this.setState({
      message: 'Lily'
    })
  }
  
  render() {
    return (
      <div>
        <div>{ this.state.message }</div>
        <button onClick={ () => { this.btnClick() } }>Button</button>
      </div>
    )
  }
  ```



### 事件对象

[合成事件 – React](https://zh-hans.reactjs.org/docs/events.html)

- `事件对象` 为 `SyntheticEvent` , 是一个合成的事件对象, 无需考虑夸浏览器兼容问题
- 可以通过 `e.nativeEvent` 拿到 `原生` 的事件对象. 虽然一般情况用不到, 但是以防万一
- 会在所有自定义参数之后传入
- 若使用 `箭头函数` 绑定事件, 则需要显式的传入, 比如 `onClick={ (e) => { this.handleClick(arg1, arg2, e) } }`

```jsx
btnClick = (a, b, e) => {
  console.log(a, b, e, e.nativeEvent)

  this.setState({
    message: 'Lily'
  })
}

render() {
  return (
    <div>
      <div>{ this.state.message }</div>
      <button onClick={ this.btnClick.bind(this, 'aaa', 'bbb') }>Button</button>
      <button onClick={ (e) => { this.btnClick('aaa', 'bbb', e) } }>Button</button>
    </div>
  )
}
```





























































