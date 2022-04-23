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



















































































