# React Hook



> [Hook 简介 – React](https://zh-hans.reactjs.org/docs/hooks-intro.html)



## 基本概念

- `v16.8` 新增的特性
- 可以让 `函数式组件` 拥有 `类组件` 特性

优势

- 无需安装额外的第三方库
- 可以让代码的可读性和可维护性变高

注意点

- 只能在 `函数式组件` / `自定义Hook` 中使用
- 只能在最外层调用, 不可以在 `循环` / `条件判断` 或 `子函数` 中调用

---

## useState

[使用 State Hook – React](https://zh-hans.reactjs.org/docs/hooks-state.html)

- 可以让 `函数式组件` 保存自己的 `state`

基本使用

- 导入

```tsx
import { useState } from 'react'
```

- 每当需要保存一个 `state` , 就调用一次 `useState()`
- 接收一个参数, 为 `初始值`
- 返回一个 `数组` , 可以通过 `数组结构` 的方式获取
  - 第一个元素: `state` 本身
  - 第二个元素: 修改该 `state` 的 `方法`
- <span style="color: #0ff;">\<TypeScript></span> 类型会根据 `初始值` 自动推断, 也可以显示指定
  - 有需要时可以使用 `typeof state` (比如 `state` 作为参数时)

```tsx
const [count, setCount] = useState<number>(0)
```

- 使用 `state` 时直接使用即可, 无需 `this`
- 修改 `state` 时调用接收到的修改方法, 传入新的值作为参数即可, 无需 `this`
  - 也可以接收一个 `函数` , 接收 `prevState` 为参数, 机制和 `setState` 相同

```tsx
<div>
  <p>{count}</p>
  <button onClick={() => void setCount(count + 1)}>+1</button>
  <button onClick={() => void setCount(prevCount => prevCount - 1)}>-1</button>
</div>
```

- 可以使用 `...` 扩展运算符来灵活的修改 `对象state` 的一部分

完整示例

```tsx
import { useState } from 'react'


const App = (): JSX.Element => {
  const [age, setAge] = useState<number>(0)
  const [name, setName] = useState<string>('Aelita')
  const [student, setStudent] = useState({ // 自动推断类型为 { lastName: string, age: number }
    lastName: 'Schaeffer',
    age: 24
  })

  return (
    <div>
      <p>{age}</p>
      <button onClick={() => void setAge(age + 1)}>+1</button>
      <button onClick={() => void setAge(prevAge => prevAge - 1)}>-1</button>
      <p>{name}</p>
      <button onClick={() => void setName('Tequila')}>change to "Tequila"</button>
      <button onClick={() => void setName('Aelita')}>change to "Aelita"</button>
      <p>{student.lastName}</p>
      <p>{student.age}</p>
      <button onClick={() => void setStudent({ ...student, age: 77 })}>change AGE to "77"</button>
    </div>
  )
}

export default App
```

---

## useEffect

[使用 Effect Hook – React](https://zh-hans.reactjs.org/docs/hooks-effect.html)

- 用于在 `组件` 中执行 `副作用` 操作, 比如
  - 设置订阅
  - 手动更改 `真实DOM`
- 可以视为 `ComponentDidMount` , `ComponentDidUpdate` 和 `ComponentWillUnmount` 的组合
- 默认情况下会在 `DOM` 每次渲染之后都执行一次 (包括 `清除` 操作)
  - 可以使用第二个 `参数` 控制

基本使用

- 导入

```tsx
import { useEffect } from 'react'
```

- 接收两个参数
  - 第一个参数: `副作用` 函数体
    - 返回值为清除该 `副作用` 的 `函数`
    - 会在和 `ComponentWillUnmount` 相同的时机执行
  - 第二个参数: 一个 `数组` , 包含了一些依赖, 只有其中的值更新了才会重新执行这个 `useEffect`
    - <span style="color: #f90">必须要包含所有可能会因为外部变化的依赖值, 否则会导致使用旧数据的 `BUG`</span>
    - 可以传入一个空数组 `[]` 让该 `useEffect` 只执行一次

完整示例

```tsx
import { useEffect, useState } from 'react'


const App = (): JSX.Element => {
  const [isHomeShow, setIsHomeShow] = useState<boolean>(true)

  return (
    <>
      {isHomeShow && <Home />}
      <hr />
      <button onClick={() => void setIsHomeShow(!isHomeShow)}>Show / hide Home</button>
    </>
  )
}

const Home = (): JSX.Element => {
  const [name, setName] = useState<string>('Aelita')
  const [age, setAge] = useState<number>(18)

  useEffect(() => {
    // componentDidMount + componentDidUpdate
    console.log('modify DOM')
  })

  useEffect(() => {
    console.log('subscribe')

    // componentWillUnmount
    return () => {
      console.log('unsubscribe')
    }
  })

  useEffect(() => {
    console.log(`Only trigger when age changes ${age}`)
  }, [age])

  return (
    <div>
      <p>{name}</p>
      <button onClick={() => void setName('Tequila')}>change name to "Tequila"</button>
      <p>{age}</p>
      <button onClick={() => void setAge(age + 1)}>+1</button>
      <button onClick={() => void setAge(age - 1)}>-1</button>
    </div>
  )
}

export default App
```

---















































































