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



































































