# React - 入门 (Introduction)



> [React – A JavaScript library for building user interfaces](https://reactjs.org/)
>
> [React 官方中文文档 – 用于构建用户界面的 JavaScript 库](https://zh-hans.reactjs.org/)



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
  const message = 'Aelita'
  // 创建虚拟DOM
  /**
   * 接收三个参数
   * 1. 标签名称
   * 2. 属性
   * 3. 包含的内容 (可以是多个)
   */
  const div = React.createElement('div', null, message)
  // 将虚拟DOM渲染为真实DOM
  /**
   * 接收三个参数
   * 1. 被渲染的虚拟DOM
   * 2. 要渲染到哪个元素中
   * 3. 渲染或更新完成之后的回调函数
   * (React 17的写法, 18中应使用createRoot())
   */
  ReactDOM.render(div, document.querySelector('#container'), () => void console.log('Rendered'))
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





























































